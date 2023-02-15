use anyhow::anyhow;
use domain::DomainError;

/// A simple String wrapper type.
/// Guarantees that the trimmed String contained inside is not of length 0.
#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord)]
#[repr(transparent)]
pub struct NonEmptyTrimmedString(String);

impl NonEmptyTrimmedString {
	/// Attempts to create a new NonEmptyString.
	/// If the given `string` is empty, `Err` is returned, containing the original `String`, `Ok`
	/// otherwise.
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
	pub fn get(&self) -> &str {
		&self.0
	}

	/// Consume the `NonEmptyString` to get the internal `String` out.
	pub fn into_inner(self) -> String {
		self.0
	}
}

impl TryFrom<String> for NonEmptyTrimmedString {
	type Error = DomainError;

	fn try_from(value: String) -> Result<Self, Self::Error> {
		Self::new(value).map_err(DomainError::InvalidInputs)
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
			NonEmptyTrimmedString::new("string".to_owned()).unwrap().into_inner(),
			"string".to_owned()
		);
	}

	#[test]
	fn what_goes_in_comes_out_trimmed() {
		assert_eq!(
			NonEmptyTrimmedString::new(" string ".to_owned()).unwrap().into_inner(),
			"string".to_owned()
		);
	}
}
