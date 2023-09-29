use async_trait::async_trait;

#[async_trait]
pub trait GithubApiPort:
	super::issue::Port + super::pull_request::Port + super::repo::Port + super::user::Port + Send + Sync
{
}
