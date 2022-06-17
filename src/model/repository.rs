pub struct Repository {
    pub owner: String,
    pub name: String,
}

pub struct Filter {
    pub owner: Option<String>,
    pub name: Option<String>,
}
