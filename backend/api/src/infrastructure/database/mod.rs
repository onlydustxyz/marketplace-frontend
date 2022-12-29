mod project_details;
pub use project_details::Repository as ProjectDetailsRepository;

mod user_info;
#[cfg_attr(test, mockall_double::double)]
pub use user_info::Repository as UserInfoRepository;
