/// Represents an event that can occur in the budget domain.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	/// Created event.
	Created { 
		/// Budget identifier.
		id: BudgetId, 
		/// Currency used by the budget.
		currency: Currency 
	},
	/// Allocated event.
	Allocated { 
		/// Budget identifier.
		id: BudgetId, 
		/// Decimal that represents the amount allocated.
		amount: Decimal 
	},
	/// Payment event.
	Payment { 
		/// Budget identifier.
		id: BudgetId, 
		/// Payment event details.
		event: PaymentEvent 
	},
}

impl AggregateEvent<Budget> for Event {
	/// Implements `AggregateEvent` trait for `Budget`.
	fn aggregate_id(&self) -> &BudgetId {
		match self {
			Self::Created { id, .. } | Self::Allocated { id, .. } | Self::Payment { id, .. } => id,
		}
	}
}

impl Display for Event {
	/// Implements `fmt` method for `Display` trait.
	///
	/// # Arguments
	///
	/// * `f` - A mutable reference to a formatter.
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(
			f,
			"{}",
			serde_json::to_string(&self).map_err(|_| std::fmt::Error)?
		)
	}
}