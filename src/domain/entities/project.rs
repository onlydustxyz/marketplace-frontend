pub type Id = String;

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct Project {
    pub id: Id,
    pub owner: String,
    pub name: String,
}
