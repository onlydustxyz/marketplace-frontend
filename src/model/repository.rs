#[derive(Debug, PartialEq, Clone)]
pub struct Repository {
    pub owner: String,
    pub name: String,
}

#[derive(Debug, PartialEq, Clone)]
pub struct Filter {
    pub owner: Option<String>,
    pub name: Option<String>,
}
