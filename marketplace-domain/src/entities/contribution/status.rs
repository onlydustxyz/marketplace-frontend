use std::str::FromStr;
use thiserror::Error;

#[derive(Debug, PartialEq, Eq, Clone, Default)]
pub enum Status {
	#[default]
	Open = 0,
	Assigned = 1,
	Completed = 2,
	Abandoned = 3,
}

impl std::fmt::Display for Status {
	fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
		match self {
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

	#[test]
	fn contribution_status_from_string() {
		assert_eq!(Status::Open, "OPEN".parse().unwrap());
		assert_eq!(Status::Assigned, "ASSIGNED".parse().unwrap());
		assert_eq!(Status::Completed, "COMPLETED".parse().unwrap());
		assert_eq!(Status::Abandoned, "ABANDONED".parse().unwrap());

		assert!("NON_EXISTENT".parse::<Status>().is_err());
	}

	#[test]
	fn contribution_status_to_string() {
		assert_eq!("OPEN", Status::Open.to_string());
		assert_eq!("ASSIGNED", Status::Assigned.to_string());
		assert_eq!("COMPLETED", Status::Completed.to_string());
		assert_eq!("ABANDONED", Status::Abandoned.to_string());
	}

	#[test]
	fn contribution_status_serde() {
		for status in [
			Status::Open,
			Status::Assigned,
			Status::Completed,
			Status::Abandoned,
		] {
			assert_eq!(status, status.to_string().parse().unwrap());
		}
	}
}
