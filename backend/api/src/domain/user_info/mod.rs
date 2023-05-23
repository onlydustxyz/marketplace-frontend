/// This module contains the implementation of the `UserInfo` entity.
/// 
/// It includes the implementations for the following structs:
/// * `ContactInformation`
/// * `CompanyIdentity`
/// * `Identity`
/// * `PersonIdentity`
/// * `PayoutSettings`
/// * `BankAddress`
/// * `Location`
/// 
/// # Example
/// 
/// ```
/// use ::infrastructure::database::schema::*;
/// use derive_getters::{Dissolve, Getters};
/// use derive_more::Constructor;
/// use diesel::{pg::Pg, Queryable};
/// use domain::UserId;
/// use serde::{Deserialize, Serialize};
/// 
/// mod email;
/// 
/// mod contact_information;
/// pub use contact_information::ContactInformation;
/// 
/// mod identity;
/// pub use identity::{CompanyIdentity, Identity, PersonIdentity};
/// 
/// mod payout_settings;
/// pub use payout_settings::{BankAddress, PayoutSettings};
/// 
/// mod location;
/// pub use location::Location;
/// 
/// #[derive(
///     Debug,
///     Clone,
///     Constructor,
///     Getters,
///     Dissolve,
///     Insertable,
///     Identifiable,
///     Serialize,
///     Deserialize,
///     AsChangeset,
/// )]
/// #[table_name = "user_info"]
/// #[primary_key(user_id)]
/// #[changeset_options(treat_none_as_null = "true")]
/// pub struct UserInfo {
///     /// The user's unique identifier.
///     #[diesel(deserialize_as = "uuid::Uuid")]
///     user_id: UserId,
///     /// The identity information of the user.
///     identity: Option<Identity>,
///     /// The location information of the user.
///     location: Option<Location>,
///     /// The payout settings of the user.
///     payout_settings: Option<PayoutSettings>,
///     /// The contact information of the user.
///     contact_information: Option<ContactInformation>,
/// }
/// 
/// impl domain::Entity for UserInfo {
///     type Id = UserId;
/// }
/// 
/// impl<ST> Queryable<ST, Pg> for UserInfo
/// where
///     (
///         UserId,
///         Option<Identity>,
///         Option<Location>,
///         Option<PayoutSettings>,
///         Option<ContactInformation>,
///         bool,
///     ): Queryable<ST, Pg>,
/// {
///     type Row = <(
///         UserId,
///         Option<Identity>,
///         Option<Location>,
///         Option<PayoutSettings>,
///         Option<ContactInformation>,
///         bool,
///     ) as Queryable<ST, Pg>>::Row;
/// 
///     fn build(row: Self::Row) -> Self {
///         let (user_id, identity, location, payout_settings, contact_information, _) =
///             Queryable::build(row);
///         Self {
///             user_id,
///             identity,
///             location,
///             payout_settings,
///             contact_information,
///         }
///     }
/// }
/// ```