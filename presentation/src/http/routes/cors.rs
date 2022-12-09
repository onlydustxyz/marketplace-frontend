use rocket::http::Status;
use std::path::PathBuf;

#[options("/<_path..>")]
pub fn options_preflight_handler(_path: PathBuf) -> Status {
	Status::Ok
}
