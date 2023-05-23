/// `NonEmptyTrimmedString` is a simple String wrapper type that guarantees that the contained trimmed String is not of
/// length 0. 
#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord)]
#[repr(transparent)]
pub struct NonEmptyTrimmedString(String);

impl NonEmptyTrimmedString {
    /// Attempts to create a new NonEmptyString. If the given `string` is empty,
    /// `Err` is returned, containing the original `String`, `Ok` otherwise.
    ///
    /// # Arguments
    ///
    /// * `string` - A `String` that is to be trimmed and checked for non-emptiness.
    ///
    /// # Errors
    ///
    /// Returns an `Err` containing an `anyhow::Error` if the provided `string`
    /// is empty.
    ///
    /// # Returns
    ///
    /// * `Ok(NonEmptyTrimmedString)` - A new `NonEmptyTrimmedString` instance.
    /// * `Err(DomainError)` - A `DomainError::InvalidInputs` variant, containing an error message indicating the
    /// expected non-emptiness of the string.
    pub fn new(string: String) -> anyhow::Result<NonEmptyTrimmedString> {
        let string = String::from(string.trim());
        if string.is_empty() {
            Err(anyhow!(
                "Expected a string containing at least one non-whitespace character"
            ))
        } else {
            Ok(NonEmptyTrimmedString(string))
        }
    }

    /// Returns a reference to the contained value.
    ///
    /// # Returns
    ///
    /// * `&str` - A reference to the `String` contained within the `NonEmptyTrimmedString` instance.
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl TryFrom<String> for NonEmptyTrimmedString {
    type Error = DomainError;

    /// Tries to convert a `String` into a `NonEmptyTrimmedString` instance.
    ///
    /// # Arguments
    ///
    /// * `value` - A `String` to be converted into a `NonEmptyTrimmedString` instance.
    ///
    /// # Errors
    ///
    /// Returns a `DomainError::InvalidInputs` variant as an `Err` if the provided `value`
    /// is empty.
    ///
    /// # Returns
    ///
    /// * `Ok(NonEmptyTrimmedString)` - A new `NonEmptyTrimmedString` instance.
    /// * `Err(DomainError)` - A `DomainError::InvalidInputs` variant, containing an error message indicating
    /// the expected non-emptiness of the string.
    fn try_from(value: String) -> Result<Self, Self::Error> {
        Self::new(value).map_err(DomainError::InvalidInputs)
    }
}

impl From<NonEmptyTrimmedString> for String {
    /// Converts a `NonEmptyTrimmedString` instance into a `String`.
    ///
    /// # Arguments
    ///
    /// * `value` - A `NonEmptyTrimmedString` instance to be converted.
    ///
    /// # Returns
    ///
    /// * `String` - The `String` contained within the provided `NonEmptyTrimmedString` `value`.
    fn from(value: NonEmptyTrimmedString) -> Self {
        value.0
    }
}

/// `OptionalNonEmptyTrimmedString` is an optional `NonEmptyTrimmedString` wrapper type.
pub struct OptionalNonEmptyTrimmedString(Option<NonEmptyTrimmedString>);

impl TryFrom<Option<String>> for OptionalNonEmptyTrimmedString {
    type Error = DomainError;

    /// Tries to convert an optional `String` into an optional `NonEmptyTrimmedString`
    /// instance.
    ///
    /// # Arguments
    ///
    /// * `value` - An optional `String` to be converted into an optional
    /// `NonEmptyTrimmedString` instance.
    ///
    /// # Errors
    ///
    /// Returns a `DomainError::InvalidInputs` variant as an `Err` if the provided `value`
    /// is empty.
    ///
    /// # Returns
    ///
    /// * `Ok(OptionalNonEmptyTrimmedString(Some(NonEmptyTrimmedString)))` - A new
    /// `OptionalNonEmptyTrimmedString` instance containing a `NonEmptyTrimmedString`
    /// instance.
    /// * `Ok(OptionalNonEmptyTrimmedString(None))` - A new `OptionalNonEmptyTrimmedString`
    /// instance containing `None`.
    /// * `Err(DomainError)` - A `DomainError::InvalidInputs` variant, containing a 
    ///n error message indicating the expected non-emptiness of the string.
    fn try_from(value: Option<String>) -> Result<Self, Self::Error> {
        Ok(match value {
            Some(value) => Self(Some(value.try_into()?)),
            None => Self(None),
        })
    }
}

impl From<OptionalNonEmptyTrimmedString> for Option<NonEmptyTrimmedString> {
    /// Converts an `OptionalNonEmptyTrimmedString` instance into an optional `NonEmptyTrimmedString`.
    ///
    /// # Arguments
    ///
    /// * `value` - An `OptionalNonEmptyTrimmedString` instance to be converted.
    ///
    /// # Returns
    ///
    /// * `Option<NonEmptyTrimmedString>` - The `NonEmptyTrimmedString` contained within the provided
    /// `OptionalNonEmptyTrimmedString` `value`, or `None` if no `NonEmptyTrimmedString` is contained.
    fn from(value: OptionalNonEmptyTrimmedString) -> Self {
        value.0
    }
}

#[cfg(test)]
mod tests {
    use assert_matches::assert_matches;

    use super::*;

    #[test]
    fn empty_string_returns_err() {
        assert_matches!(
            NonEmptyTrimmedString::new("".to_owned()),
            Err(anyhow::Error { .. })
        );
    }

    #[test]
    fn string_with_whitespaces_only_returns_err() {
        assert_matches!(
            NonEmptyTrimmedString::new("   ".to_owned()),
            Err(anyhow::Error { .. })
        );
    }

    #[test]
    fn non_empty_string_returns_ok() {
        assert!(NonEmptyTrimmedString::new("string".to_owned()).is_ok())
    }

    #[test]
    fn what_goes_in_comes_out() {
        assert_eq!(
            NonEmptyTrimmedString::new("string".to_owned()).unwrap().as_str(),
            "string"
        );
    }

    #[test]
    fn what_goes_in_comes_out_trimmed() {
        assert_eq!(
            NonEmptyTrimmedString::new(" string ".to_owned()).unwrap().as_str(),
            "string"
        );
    }
}