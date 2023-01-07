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
/// base_route/weapon?index=5
/// base_route/weapon?index=255
///
#[get("/weapon?<index>")]
pub async fn get_weapon(connection: &State<Client>, index: i32) -> Result<Json<Weapon>, Status> {
    let weapons: Collection<Weapon> = connection
        .database("TF2-Custom-Weapon-Helper")
        .collection("Weapons");
    let filter = doc! {
        "index": index,
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

/// Returns a list of weapons that match the given class
///
/// # Arguments
///
/// * 'connection' - The Client State that contains the database connection
/// * 'class' - The class that can equip this weapon
///
/// # Examples
///
/// base_route/weapons/user/medic
/// base_route/weapons/user/heavy
///
#[get("/weapons/user/<class>")]
pub async fn get_weapons_by_class(
    connection: &State<Client>,
    class: String,
) -> Result<Json<Vec<Weapon>>, Status> {
    // get weapon collection from TF2-Custom-Weapon-Helper Database
    let weapons: Collection<Weapon> = connection
        .database("TF2-Custom-Weapon-Helper")
        .collection("Weapons");
    // create document to use as a filter
    let filter = doc! {
        "user": class,
    };
    // filter out the documents that do not match $class
    let find = weapons.find(filter, None).await;
    // match on the result of the find operation
    match find {
        // find succeeded
        Ok(cursor) => match cursor.try_collect::<Vec<Weapon>>().await {
            // turning result into a list succeeded
            Ok(list) => Ok(Json(list)),
            // turning result into a list failed
            Err(error) => {
                debug!("Error: {}", error);
                Err(Status::InternalServerError)
            }
        },
        // find failed
        Err(error) => {
            debug!("Error: {}", error);
            Err(Status::ServiceUnavailable)
        }
    }
}

/// Returns a list of weapons that can be assigned to that slot
///
/// # Arguments
/// 
/// * 'connection' - The Client State that contains the database connection
/// * 'slot' - A number that represents the equipable slot. 1 being primary
/// 
/// # Examples
/// 
/// base_route/weapons/slot/1
/// base_route/weapons/slot/5
/// 
#[get("/weapons/slot/<slot>")]
pub async fn get_weapons_by_slot(
    connection: &State<Client>,
    slot: i32,
) -> Result<Json<Vec<Weapon>>, Status> {
    let weapons: Collection<Weapon> = connection
        .database("TF2-Custom-Weapon-Helper")
        .collection("Weapons");
    let filter = doc! {
        "slot": slot,
    };
    let find = weapons.find(filter, None).await;
    match find {
        Ok(cursor) => match cursor.try_collect::<Vec<Weapon>>().await {
            Ok(list) => Ok(Json(list)),
            _ => Err(Status::InternalServerError),
        },
        _ => Err(Status::ServiceUnavailable),
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
/// base_route/weapons?slot=5&class=engineer
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
    let filter = doc! {
        "slot": slot,
        "user": class,
    };
    let find = weapons.find(filter, None).await;
    match find {
        Ok(cursor) => match cursor.try_collect::<Vec<Weapon>>().await {
            Ok(list) => Ok(Json(list)),
            _ => Err(Status::InternalServerError),
        },
        _ => Err(Status::ServiceUnavailable),
    }
}
