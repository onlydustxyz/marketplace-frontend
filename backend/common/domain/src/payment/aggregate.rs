/// Module for managing payments
use chrono::{Duration, Utc};
use derive_getters::Getters;
use olog::info;
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use serde_with::{serde_as, DurationSeconds};
use thiserror::Error;

use super::Reason;
use crate::{
    Aggregate, Amount, Entity, EventSourcable, GithubUserId, PaymentEvent, PaymentId,
    PaymentReceipt, PaymentReceiptId, PaymentWorkItem, UserId,
};

/// Enum representing the current status of a payment
#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Status {
    #[default]
    Active,
    Cancelled,
}

#[serde_as]
/// Struct representing a payment
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Getters)]
pub struct Payment {
    id: PaymentId,
    requested_usd_amount: Decimal,
    paid_usd_amount: Decimal,
    status: Status,
    recipient_id: GithubUserId,
    requestor_id: UserId,
    work_items: Vec<PaymentWorkItem>,
    #[serde_as(as = "DurationSeconds<i64>")]
    duration_worked: Duration,
}

impl Default for Payment {
    /// Creates a default Payment struct
    fn default() -> Self {
        Self {
            duration_worked: Duration::seconds(0),
            id: Default::default(),
            requested_usd_amount: Default::default(),
            paid_usd_amount: Default::default(),
            status: Default::default(),
            recipient_id: Default::default(),
            requestor_id: Default::default(),
            work_items: Default::default(),
        }
    }
}

impl Entity for Payment {
    type Id = PaymentId;
}

impl Aggregate for Payment {
    type Event = PaymentEvent;
}

impl EventSourcable for Payment {
    /// Applies an event to the Payment and returns the updated Payment
    fn apply_event(self, event: &Self::Event) -> Self {
        match event {
            PaymentEvent::Requested {
                id,
                amount,
                recipient_id,
                reason,
                requestor_id,
                duration_worked,
                ..
            } => Self {
                id: *id,
                requested_usd_amount: *amount.amount(), // TODO: handle currencies
                recipient_id: *recipient_id,
                work_items: reason.work_items().clone(),
                requestor_id: *requestor_id,
                duration_worked: *duration_worked,
                ..self
            },
            PaymentEvent::Cancelled { id: _ } => Self {
                status: Status::Cancelled,
                ..self
            },
            PaymentEvent::Processed { amount, .. } => Self {
                paid_usd_amount: self.paid_usd_amount + amount.amount(), // TODO: handle currencies
                ..self
            },
            // No need to update the Payment for these events
            PaymentEvent::InvoiceReceived { .. } | PaymentEvent::InvoiceRejected { .. } => self,
        }
    }
}

/// Enum representing an error when performing Payment operations
#[derive(Debug, Error)]
pub enum Error {
    #[error("Receipt amount exceeds requested amount")]
    Overspent,
    #[error("Payment is not cancellable")]
    NotCancellable,
    #[error("Payment has been cancelled")]
    Cancelled,
}

impl Payment {
    /// Creates and returns a request event for a Payment
    ///
    /// # Arguments
    ///
    /// * `id` - The PaymentId
    /// * `requestor_id` - The UserId of the requestor
    /// * `recipient_id` - The GithubUserId of the recipient
    /// * `amount` - The requested Amount
    /// * `duration_worked` - The Duration worked to earn the payment
    /// * `reason` - The Reason for the payment
    #[cfg_attr(feature = "cargo-clippy", allow(clippy::too_many_arguments))]
    pub fn request(
        id: PaymentId,
        requestor_id: UserId,
        recipient_id: GithubUserId,
        amount: Amount,
        duration_worked: Duration,
        reason: Reason,
    ) -> Vec<<Self as Aggregate>::Event> {
        vec![PaymentEvent::Requested {
            id,
            requestor_id,
            recipient_id,
            amount,
            duration_worked,
            reason,
            requested_at: Utc::now().naive_utc(),
        }]
    }

    /// Adds a receipt to the Payment and returns the Payment events created
    ///
    /// # Arguments
    ///
    /// * `receipt_id` - The PaymentReceiptId of the receipt
    /// * `amount` - The Amount of the receipt
    /// * `receipt` - The PaymentReceipt itself
    pub fn add_receipt(
        &self,
        receipt_id: PaymentReceiptId,
        amount: Amount,
        receipt: PaymentReceipt,
    ) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
        self.only_active()?;

