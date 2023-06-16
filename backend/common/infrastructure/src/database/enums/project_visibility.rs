use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize, DbEnum)]
#[ExistingTypePath = "crate::database::schema::sql_types::ProjectVisibility"]
pub enum ProjectVisibility {
	Public,
	Private,
}

impl From<domain::ProjectVisibility> for ProjectVisibility {
	fn from(visibility: domain::ProjectVisibility) -> Self {
		match visibility {
			domain::ProjectVisibility::Private => Self::Private,
			domain::ProjectVisibility::Public => Self::Public,
		}
	}
}
