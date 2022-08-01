#[derive(Debug)]
pub enum Error {
	Connection(String),
	Migration(String),
}

impl ToString for Error {
	fn to_string(&self) -> String {
		match self {
			Error::Connection(e) => e.to_owned(),
			Error::Migration(e) => e.to_owned(),
		}
	}
}

pub type Result<T> = std::result::Result<T, Error>;
