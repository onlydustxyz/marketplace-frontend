pub enum Error {
    ParseStatusError(String),
    ProjectListingError(String),
}

impl ToString for Error {
    fn to_string(&self) -> String {
        match self {
            Error::ParseStatusError(e) => e.to_owned(),
            Error::ProjectListingError(e) => e.to_owned(),
        }
    }
}
