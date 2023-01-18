use futures::TryStreamExt;
use mongodb::{bson::doc, Client, Collection};
use rocket::{http::Status, serde::json::Json, State};

use crate::data::model::Weapon;

/// Returns the weapon with that index value
///
/// # Arguments
///
/// * 'connection' - The Client State that contains the database connection
/// * 'index' - The index of the weapon you want to get
///
/// # Examples
///
/// base_route/weapon/5
/// base_route/weapon/255
///
#[get("/weapon/<id>")]
pub async fn get_weapon(connection: &State<Client>, id: i32) -> Result<Json<Weapon>, Status> {
    let weapons: Collection<Weapon> = connection
        .database("TF2-Custom-Weapon-Helper")
        .collection("Weapons");
    let filter = doc! {
        "index": id,
    };
    let find = weapons.find_one(filter, None).await;
    match find {
        Ok(Some(result)) => Ok(Json(result)),
        Ok(None) => Err(Status::NoContent),
        Err(error) => {
            debug!("Error: {}", error);
            Err(Status::ServiceUnavailable)
        }
    }
}

/// Returns a list of weapons that match both the class and slot given
///
/// # Arguments
/// 
/// * 'connection' - The Client State that contains the database connection
/// * 'slot' - A number that represents the equipable slot
/// * 'class' - A string that represents the desired user
/// 
/// # Examples
/// 
/// base_route/weapons?slot=1&class=medic
/// base_route/weapons?slot=5
/// base_route/weapons?class=demoman
/// 
#[get("/weapons?<slot>&<class>")]
pub async fn get_weapons_by_class_and_slot(
    connection: &State<Client>,
    slot: Option<i32>,
    class: Option<String>,
) -> Result<Json<Vec<Weapon>>, Status> {
    let weapons: Collection<Weapon> = connection
        .database("TF2-Custom-Weapon-Helper")
        .collection("Weapons");
    let filter = match (slot, class) {
        (None, None) => {
            doc! {}
        },
        (None, Some(class)) => {
            doc! {
                "user": class,
            }
        },
        (Some(slot), None) => {
            doc! {
                "slot": slot,
            }
        },
        (Some(slot), Some(class)) => {
            doc! {
                "slot": slot,
                "user": class,
            }
        },
    };
    match weapons.find(filter, None).await {
        Ok(cursor) => match cursor.try_collect::<Vec<Weapon>>().await {
            Ok(list) => Ok(Json(list)),
            _ => Err(Status::InternalServerError),
        },
        _ => Err(Status::ServiceUnavailable),
    }
}
