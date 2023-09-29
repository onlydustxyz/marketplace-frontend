use diesel::{Connection, ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::UserId;
use infrastructure::{
	contextualized_error::IntoContextualizedError, database::schema::contact_informations::dsl,
	dbclient, dbclient::Result,
};

use super::ContactInformation;

pub trait Repository: dbclient::Repository<ContactInformation> {
	fn replace_all_for_user(
		&self,
		user_id: &UserId,
		contact_informations: Vec<ContactInformation>,
	) -> Result<()>;
}

impl Repository for dbclient::Client {
	fn replace_all_for_user(
		&self,
		user_id: &UserId,
		contact_informations: Vec<ContactInformation>,
	) -> Result<()> {
		let mut connection = self.connection()?;

		connection
			.transaction(|connection| {
				diesel::delete(dsl::contact_informations.filter(dsl::user_id.eq(user_id)))
					.execute(&mut *connection)?;

				diesel::insert_into(dsl::contact_informations)
					.values(contact_informations)
					.execute(&mut *connection)?;

				Ok(())
			})
			.err_with_context(format!(
				"delete+insert contact_informations where user_id={user_id}"
			))?;

		Ok(())
	}
}
