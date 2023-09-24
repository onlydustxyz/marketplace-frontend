use std::path::PathBuf;

use rocket::http::Status;

#[options("/<_path..>")]
pub fn options_preflight_handler(_path: PathBuf) -> Status {
	Status::Ok
}
