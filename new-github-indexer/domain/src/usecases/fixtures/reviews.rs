use rstest::fixture;
use serde_json::json;

use super::users;
use crate::models::{indexed, pulls::Review};

#[fixture]
pub fn approved_from_pierre() -> Review {
	serde_json::from_value(json!({
		"id": 1637731191,
		"node_id": "PRR_kwDOHbl-LM5hnct3",
		"user": {
			"login": "PierreOucif",
			"id": 16590657,
			"node_id": "MDQ6VXNlcjE2NTkwNjU3",
			"avatar_url": "https://avatars.githubusercontent.com/u/16590657?u=1a94dc2d2be3e5c199916efa42ae79e8893f817d&v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/PierreOucif",
			"html_url": "https://github.com/PierreOucif",
			"followers_url": "https://api.github.com/users/PierreOucif/followers",
			"following_url": "https://api.github.com/users/PierreOucif/following{/other_user}",
			"gists_url": "https://api.github.com/users/PierreOucif/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/PierreOucif/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/PierreOucif/subscriptions",
			"organizations_url": "https://api.github.com/users/PierreOucif/orgs",
			"repos_url": "https://api.github.com/users/PierreOucif/repos",
			"events_url": "https://api.github.com/users/PierreOucif/events{/privacy}",
			"received_events_url": "https://api.github.com/users/PierreOucif/received_events",
			"type": "User",
			"site_admin": false
		},
		"body": "",
		"state": "APPROVED",
		"html_url": "https://github.com/onlydustxyz/marketplace-frontend/pull/1257#pullrequestreview-1637731191",
		"pull_request_url": "https://api.github.com/repos/onlydustxyz/marketplace-frontend/pulls/1257",
		"author_association": "CONTRIBUTOR",
		"_links": {
			"html": {
				"href": "https://github.com/onlydustxyz/marketplace-frontend/pull/1257#pullrequestreview-1637731191"
			},
			"pull_request": {
				"href": "https://api.github.com/repos/onlydustxyz/marketplace-frontend/pulls/1257"
			}
		},
		"submitted_at": "2023-09-21T12:44:43Z",
		"commit_id": "0addbe7d8cdbe1356fc8fb58e4b896616e7d7592"
	})).unwrap()
}

#[fixture]
pub fn indexed_approved_from_pierre() -> indexed::Review {
	indexed::Review {
		inner: approved_from_pierre(),
		author: users::indexed_pierre(),
	}
}
