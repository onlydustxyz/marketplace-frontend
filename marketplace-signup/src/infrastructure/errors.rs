use crate::domain::errors::AuthenticationError;

impl From<reqwest::Error> for AuthenticationError {
    fn from(e: reqwest::Error) -> Self {
        if e.is_decode() {
            return AuthenticationError::Serde(Box::new(e));
        }
        AuthenticationError::Http(Box::new(e))
    }
}
