use super::ActionQueue;
use deathnote_contributions_feeder::domain::Action;

#[test]
fn pop_less_than_len() {
	let mut queue = ActionQueue::new();

	for _ in 0..100 {
		queue.push(Action::AssignContributor {
			contributor_id: Default::default(),
			contribution_id: Default::default(),
		})
	}

	let first_100_popped = queue.pop_n(10);

	assert_eq!(first_100_popped.len(), 10);
	assert_eq!(queue.0.len(), 90);
}

#[test]
fn pop_more_than_len() {
	let mut queue = ActionQueue::new();

	for _ in 0..100 {
		queue.push(Action::AssignContributor {
			contributor_id: Default::default(),
			contribution_id: Default::default(),
		})
	}

	let popped = queue.pop_n(101);

	assert_eq!(popped.len(), 100);
	assert_eq!(queue.0.len(), 0);
}

#[test]
fn pop_fifo() {
	let mut queue = ActionQueue::new();

	queue.push(Action::AssignContributor {
		contributor_id: Default::default(),
		contribution_id: Default::default(),
	});
	queue.push(Action::AssignContributor {
		contribution_id: Default::default(),
		contributor_id: Default::default(),
	});
	queue.push(Action::ValidateContribution {
		contribution_id: Default::default(),
	});
	queue.push(Action::UnassignContributor {
		contribution_id: Default::default(),
	});

	let popped = queue.pop_n(2);

	// Check popped order
	assert_eq!(
		popped[0],
		Action::AssignContributor {
			contributor_id: Default::default(),
			contribution_id: Default::default(),
		}
	);
	assert_eq!(
		popped[1],
		Action::AssignContributor {
			contribution_id: Default::default(),
			contributor_id: Default::default(),
		}
	);

	// Check remaining elements order
	assert_eq!(
		queue.0[0],
		Action::UnassignContributor {
			contribution_id: Default::default(),
		}
	);
	assert_eq!(
		queue.0[1],
		Action::ValidateContribution {
			contribution_id: Default::default(),
		}
	);
}
