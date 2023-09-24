use serde::{Deserialize, Serialize};

use super::Person;
use crate::models;

#[derive(Default, Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Company {
	owner: Option<Person>,
	name: Option<String>,
	identification_number: Option<String>,
}

impl From<Company> for models::Identity {
	fn from(company: Company) -> Self {
		Self::Company(models::CompanyIdentity {
			owner: company.owner.map(Into::into),
			name: company.name,
			identification_number: company.identification_number,
		})
	}
}
