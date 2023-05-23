use chrono::NaiveDateTime;

use derive_getters::Getters;
use derive_new::new;

use domain::{BudgetId, GithubUserId, PaymentId, UserId};

use infrastructure::database::schema::payment_requests;

/// Represents a payment request made from a budget to a user.
#[allow(clippy::too_many_arguments)]
#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, new, Getters)]
#[changeset_options(treat_none_as_null = "true")]
pub struct PaymentRequest {
    /// The unique identifier for this payment request.
    id: PaymentId,
    /// The identifier for the budget from which the payment will be made.
    budget_id: BudgetId,
    /// The user ID of the person who made the request.
    requestor_id: UserId,
    /// The GitHub user ID of the recipient of the payment.
    recipient_id: GithubUserId,
    /// The amount of the payment requested, in US dollars.
    amount_in_usd: i64,
    /// The date and time at which the payment request was made.
    requested_at: NaiveDateTime,
    /// The date and time at which the invoice was received, if any.
    pub invoice_received_at: Option<NaiveDateTime>,
    /// The number of hours worked, if applicable.
    hours_worked: i32,
}

impl domain::Entity for PaymentRequest {
    type Id = PaymentId;
}