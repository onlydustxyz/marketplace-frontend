use rstest::fixture;
use serde_json::json;

use super::users;
use crate::models::{indexed, repos::RepoCommit};

#[fixture]
pub fn x1257() -> RepoCommit {
	serde_json::from_value(json!({
		"sha": "0addbe7d8cdbe1356fc8fb58e4b896616e7d7592",
		"node_id": "C_kwDOHbl-LNoAKDBhZGRiZTdkOGNkYmUxMzU2ZmM4ZmI1OGU0Yjg5NjYxNmU3ZDc1OTI",
		"commit": {
		  "author": {
			"name": "Anthony Buisset",
			"email": "abuisset@gmail.com",
			"date": "2023-09-21T12:42:31Z"
		  },
		  "committer": {
			"name": "Anthony Buisset",
			"email": "abuisset@gmail.com",
			"date": "2023-09-21T12:42:31Z"
		  },
		  "message": "fix migration",
		  "tree": {
			"sha": "098fc17fb337033dd3e32ced627869ae1131fbe6",
			"url": "https://api.github.com/repos/onlydustxyz/marketplace-frontend/git/trees/098fc17fb337033dd3e32ced627869ae1131fbe6"
		  },
		  "url": "https://api.github.com/repos/onlydustxyz/marketplace-frontend/git/commits/0addbe7d8cdbe1356fc8fb58e4b896616e7d7592",
		  "comment_count": 0,
		  "verification": {
			"verified": false,
			"reason": "unsigned",
			"signature": null,
			"payload": null
		  }
		},
		"url": "https://api.github.com/repos/onlydustxyz/marketplace-frontend/commits/0addbe7d8cdbe1356fc8fb58e4b896616e7d7592",
		"html_url": "https://github.com/onlydustxyz/marketplace-frontend/commit/0addbe7d8cdbe1356fc8fb58e4b896616e7d7592",
		"comments_url": "https://api.github.com/repos/onlydustxyz/marketplace-frontend/commits/0addbe7d8cdbe1356fc8fb58e4b896616e7d7592/comments",
		"author": {
		  "login": "AnthonyBuisset",
		  "id": 43467246,
		  "node_id": "MDQ6VXNlcjQzNDY3MjQ2",
		  "avatar_url": "https://avatars.githubusercontent.com/u/43467246?v=4",
		  "gravatar_id": "",
		  "url": "https://api.github.com/users/AnthonyBuisset",
		  "html_url": "https://github.com/AnthonyBuisset",
		  "followers_url": "https://api.github.com/users/AnthonyBuisset/followers",
		  "following_url": "https://api.github.com/users/AnthonyBuisset/following{/other_user}",
		  "gists_url": "https://api.github.com/users/AnthonyBuisset/gists{/gist_id}",
		  "starred_url": "https://api.github.com/users/AnthonyBuisset/starred{/owner}{/repo}",
		  "subscriptions_url": "https://api.github.com/users/AnthonyBuisset/subscriptions",
		  "organizations_url": "https://api.github.com/users/AnthonyBuisset/orgs",
		  "repos_url": "https://api.github.com/users/AnthonyBuisset/repos",
		  "events_url": "https://api.github.com/users/AnthonyBuisset/events{/privacy}",
		  "received_events_url": "https://api.github.com/users/AnthonyBuisset/received_events",
		  "type": "User",
		  "site_admin": false
		},
		"committer": {
		  "login": "AnthonyBuisset",
		  "id": 43467246,
		  "node_id": "MDQ6VXNlcjQzNDY3MjQ2",
		  "avatar_url": "https://avatars.githubusercontent.com/u/43467246?v=4",
		  "gravatar_id": "",
		  "url": "https://api.github.com/users/AnthonyBuisset",
		  "html_url": "https://github.com/AnthonyBuisset",
		  "followers_url": "https://api.github.com/users/AnthonyBuisset/followers",
		  "following_url": "https://api.github.com/users/AnthonyBuisset/following{/other_user}",
		  "gists_url": "https://api.github.com/users/AnthonyBuisset/gists{/gist_id}",
		  "starred_url": "https://api.github.com/users/AnthonyBuisset/starred{/owner}{/repo}",
		  "subscriptions_url": "https://api.github.com/users/AnthonyBuisset/subscriptions",
		  "organizations_url": "https://api.github.com/users/AnthonyBuisset/orgs",
		  "repos_url": "https://api.github.com/users/AnthonyBuisset/repos",
		  "events_url": "https://api.github.com/users/AnthonyBuisset/events{/privacy}",
		  "received_events_url": "https://api.github.com/users/AnthonyBuisset/received_events",
		  "type": "User",
		  "site_admin": false
		},
		"parents": [
		  {
			"sha": "80b7c84441b4c2206b4a93f8be7c688204892ece",
			"url": "https://api.github.com/repos/onlydustxyz/marketplace-frontend/commits/80b7c84441b4c2206b4a93f8be7c688204892ece",
			"html_url": "https://github.com/onlydustxyz/marketplace-frontend/commit/80b7c84441b4c2206b4a93f8be7c688204892ece"
		  }
		]
	  })).unwrap()
}

#[fixture]
pub fn indexed_1257() -> indexed::Commit {
	indexed::Commit {
		inner: x1257(),
		author: users::indexed_anthony(),
	}
}
