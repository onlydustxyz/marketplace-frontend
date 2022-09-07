
use super::super::*;
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
