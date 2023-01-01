#[derive(serde::Deserialize, serde::Serialize)]
pub struct Weapon {
    name: String,
    id: i32,
    weapon_class: String,
    user: String,
    slot: i32,
}
