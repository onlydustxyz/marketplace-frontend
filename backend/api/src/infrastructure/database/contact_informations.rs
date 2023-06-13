use std::sync::Arc;

use derive_more::Constructor;
use diesel::{Connection, ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::UserId;
use infrastructure::database::{
	contact_information::ContactInformation, schema::contact_informations::dsl, Client,
	DatabaseError,
};

#[derive(Constructor, Clone)]
pub struct Repository(Arc<Client>);

impl Repository {
	pub fn replace_all_for_user(
		&self,
		user_id: &UserId,
		contact_informations: Vec<ContactInformation>,
	) -> Result<(), DatabaseError> {
		let mut connection = self.0.connection()?;

		connection.transaction(|connection| {
			diesel::delete(dsl::contact_informations.filter(dsl::user_id.eq(user_id)))
				.execute(&mut *connection)?;

			diesel::insert_into(dsl::contact_informations)
				.values(contact_informations)
				.execute(&mut *connection)?;

			Ok(())
		})
	}
}
