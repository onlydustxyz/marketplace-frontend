mod round_robin;
pub use round_robin::Client as RoundRobinClient;

mod single;
pub use single::Client as SingleClient;

use super::{AddHeaders, Config, OctocrabProxy};
