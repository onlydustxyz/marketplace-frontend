use std::sync::Arc;

use domain::Payment;
use event_listeners::{
	domain::{PaymentProjector, PaymentRequestProjector},
	infrastructure::database::{PaymentRepository, PaymentRequestRepository},
};
use infrastructure::database;

use super::{Refreshable, Refresher};

pub fn create(database: Arc<database::Client>) -> impl Refreshable {
	let payment_projector = PaymentProjector::new(PaymentRepository::new(database.clone()));
	let payment_request_projector =
		PaymentRequestProjector::new(PaymentRequestRepository::new(database.clone()));

	Refresher::<Payment>::new(
		database,
		vec![
			Arc::new(payment_projector),
			Arc::new(payment_request_projector),
		],
	)
}
