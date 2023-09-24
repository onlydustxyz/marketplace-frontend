use diesel::{Connection, ExpressionMethods};
use infrastructure::database::{self, schema::wallets, ImmutableModel, Model, Result};

use super::{BankAccount, UserPayoutInfo, Wallet};

pub trait Repository: Send + Sync {
	fn upsert(
		&self,
		user_info: UserPayoutInfo,
		bank_account: Option<BankAccount>,
		wallets: Vec<Wallet>,
	) -> Result<()>;
}

impl Repository for database::Client {
	fn upsert(
		&self,
		user_info: UserPayoutInfo,
		bank_account: Option<BankAccount>,
		wallets: Vec<Wallet>,
	) -> Result<()> {
		let mut connection = self.connection()?;

		connection.transaction(|connection| -> Result<()> {
			user_info.clone().upsert(connection)?;

			BankAccount::delete(connection, user_info.user_id)?;
			if let Some(bank_account) = bank_account {
				bank_account.insert(connection)?;
			}

			Wallet::delete_all(connection, wallets::user_id.eq(user_info.user_id))?;
			Wallet::insert_all(connection, wallets)?;

			Ok(())
		})?;

		Ok(())
	}
}
