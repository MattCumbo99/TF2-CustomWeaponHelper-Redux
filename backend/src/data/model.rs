#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Weapon {
    name: String,
    index: i32,
    weapon_class: String,
    user: String,
    slot: i32,
}
