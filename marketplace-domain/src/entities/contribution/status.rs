use std::str::FromStr;
use thiserror::Error;

#[derive(Debug, PartialEq, Eq, Clone, Default)]
pub enum Status {
	#[default]
	None = 0,
	Open = 1,
	Assigned = 2,
	Completed = 3,
	Abandoned = 4,
}

impl std::fmt::Display for Status {
	fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
		match self {
			Status::None => write!(f, "NONE"),
			Status::Open => write!(f, "OPEN"),
			Status::Assigned => write!(f, "ASSIGNED"),
			Status::Completed => write!(f, "COMPLETED"),
			Status::Abandoned => write!(f, "ABANDONED"),
		}
	}
}

#[derive(Debug, Error)]
#[error("Failed to parse `{0}` as Status")]
pub struct StatusParsingError(String);

impl FromStr for Status {
	type Err = StatusParsingError;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		match s {
			"NONE" => Ok(Status::None),
			"OPEN" => Ok(Status::Open),
			"ASSIGNED" => Ok(Status::Assigned),
			"COMPLETED" => Ok(Status::Completed),
			"ABANDONED" => Ok(Status::Abandoned),
			_ => Err(StatusParsingError(s.to_string())),
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use rstest::*;

	#[rstest]
	#[case(Status::None, "NONE")]
	#[case(Status::Open, "OPEN")]
	#[case(Status::Assigned, "ASSIGNED")]
	#[case(Status::Completed, "COMPLETED")]
	#[case(Status::Abandoned, "ABANDONED")]
	fn contribution_status_serde(#[case] status: Status, #[case] status_str: &str) {
		assert_eq!(status, status_str.parse().unwrap());
		assert_eq!(status_str, status.to_string());
		assert_eq!(status, status.to_string().parse().unwrap());
	}

	#[rstest]
	#[case("NON_EXISTENT")]
	#[case("")]
	fn parsing_error(#[case] status_str: &str) {
		assert!(status_str.parse::<Status>().is_err());
	}
}
