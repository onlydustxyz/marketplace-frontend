use domain::ProjectId;

#[allow(unused)]
pub fn project_id() -> ProjectId {
	uuid::Uuid::parse_str("8c02d2c1-1b0f-43e8-9da2-caae46688d93").unwrap().into()
}
