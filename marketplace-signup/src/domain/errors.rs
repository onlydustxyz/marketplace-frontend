use thiserror::Error;

#[derive(Debug, Error)]
pub enum RegistrationError {
    #[error("Registry error")]
    Registry(#[source] RegistryError),
    #[error("Authentication error")]
    Authentication(#[source] AuthenticationError),
    #[error("Identification error")]
    Identification(#[source] IdentificationError),
    #[error("Signature error")]
    Signature(#[source] SignatureError),
}

#[derive(Debug, Error)]
pub enum AuthenticationError {
    #[error("HTTP request error")]
    Http(#[source] Box<dyn std::error::Error>),
    #[error("(de)serialization error")]
    Serde(#[source] Box<dyn std::error::Error>),
}

#[derive(Debug, Error)]
pub enum IdentificationError {
    #[error("HTTP request error")]
    Http(#[source] Box<dyn std::error::Error>),
    #[error("(de)serialization error")]
    Serde(#[source] Box<dyn std::error::Error>),
}

#[derive(Debug, Error)]
pub enum SignatureError {
    #[error("Invalid signature")]
    InvalidSignature(#[source] Box<dyn std::error::Error>),
}

#[derive(Debug, Error)]
pub enum RegistryError {
    #[error("Nonce error")]
    Nonce(#[source] Box<dyn std::error::Error>),
    #[error("Transaction failed")]
    Transaction(#[source] Box<dyn std::error::Error>),
}
