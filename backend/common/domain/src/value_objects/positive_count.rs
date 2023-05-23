/// This module provides a `Count` type, which wraps a `NonZeroUsize` value, and its deserializer.
#[use core::fmt]
#[use std::num::NonZeroUsize]
#[use derive_more::From]
#[use serde::{de::Visitor, Deserialize, Deserializer}]
pub mod count {
    use super::*;

    /// A wrapper type around `NonZeroUsize` that represents a count of something.
    #[derive(Clone, Copy, Debug, From)]
    pub struct Count(NonZeroUsize);

    impl Count {
        /// Returns the value of the `Count` as `usize`.
        pub fn get(self) -> usize {
            self.0.get()
        }
    }

    impl<'de> Deserialize<'de> for Count {
        /// Deserializes `Count` from a positive integer or string.
        fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
        where
            D: Deserializer<'de>,
        {
            /// A deserializer visitor for `Count`.
            struct MyVisitor;

            impl<'de> Visitor<'de> for MyVisitor {
                type Value = Count;

                fn expecting(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
                    fmt.write_str("positive integer or string")
                }

                /// Visits a u64 value and converts it to `Count`.
                fn visit_u64<E>(self, val: u64) -> Result<Self::Value, E>
                where
                    E: serde::de::Error,
                {
                    NonZeroUsize::new(val as usize)
                        .map(Into::into)
                        .ok_or_else(|| E::custom("invalid integer value"))
                }

                /// Visits a string value and converts it to `Count`.
                fn visit_str<E>(self, val: &str) -> Result<Self::Value, E>
                where
                    E: serde::de::Error,
                {
                    val.parse::<u64>()
                        .map_err(|_| E::custom("failed to parse integer"))
                        .and_then(|val| self.visit_u64(val))
                }
            }

            deserializer.deserialize_any(MyVisitor)
        }
    }

    #[cfg(test)]
    mod tests {
        use rstest::rstest;

        use super::*;

        #[derive(Debug, Deserialize)]
        struct Test {
            count: Count,
        }

        #[rstest]
        fn deserialize_from_number() {
            let s: Test = serde_json::from_str(r#"{"count": 3}"#).unwrap();
            assert_eq!(s.count.get(), 3);
        }

        #[rstest]
        fn deserialize_from_string() {
            let s: Test = serde_json::from_str(r#"{"count": "3"}"#).unwrap();
            assert_eq!(s.count.get(), 3);
        }

        #[rstest]
        #[case("0", "invalid integer value")]
        #[case("-2", "failed to parse integer")]
        #[case("abc", "failed to parse integer")]
        fn fail_deserialize_when_invalid(#[case] value: &str, #[case] error: &str) {
            let res: Result<Test, _> =
                serde_json::from_str(format!("{{\"count\": \"{value}\"}}").as_str());
            assert!(res.is_err());
            assert!(res.unwrap_err().to_string().starts_with(error));
        }
    }
}