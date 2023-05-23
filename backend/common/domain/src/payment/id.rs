use derive_more::{Display, From, FromStr, Into};
use juniper::GraphQLScalarValue;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

/// A wrapper around `Uuid` that provides a set of additional utilities and implements
/// various traits needed for interoperability with different libraries.
///
/// Example:
/// ```
/// use my_crate::Id;
///
/// let id = Id::new();
/// println!("Generated ID: {}", id.pretty());
/// ```
#[derive(
    Debug,
    Default,
    Copy,
    Clone,
    PartialEq,
    Eq,
    Hash,
    Serialize,
    Deserialize,
    Display,
    From,
    Into,
    AsExpression,
    FromToSql,
    FromSqlRow,
    FromStr,
    GraphQLScalarValue,
)]
#[sql_type = "diesel::sql_types::Uuid"]
pub struct Id(Uuid);

impl Id {
    /// Generates a new random `Id`.
    ///
    /// # Examples
    ///
    /// ```
    /// use my_crate::Id;
    ///
    /// let id = Id::new();
    /// assert!(id.to_string().len() > 0);
    /// ```
    pub fn new() -> Self {
        Self(Uuid::new_v4())
    }

    /// Returns a shorter representation of the `Id`.
    ///
    /// # Examples
    ///
    /// ```
    /// use my_crate::Id;
    ///
    /// let id = Id::new();
    /// println!("Generated ID: {}", id.pretty());
    /// ```
    pub fn pretty(&self) -> String {
        self.to_string().as_str()[..6].to_uppercase()
    }
}