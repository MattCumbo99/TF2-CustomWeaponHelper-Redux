use futures::TryStreamExt;
use mongodb::{bson::doc, Client, Collection};
use rocket::{http::Status, serde::json::Json, State};

use crate::data::model::Weapon;

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

#[get("/weapons/user/<class>")]
pub async fn get_weapons_by_class(
    connection: &State<Client>,
    class: String,
) -> Result<Json<Vec<Weapon>>, Status> {
    let weapons: Collection<Weapon> = connection
        .database("TF2-Custom-Weapon-Helper")
        .collection("Weapons");
    let filter = doc! {
        "user": class,
    };
    let find = weapons.find(filter, None).await;
    match find {
        Ok(cursor) => match cursor.try_collect::<Vec<Weapon>>().await {
            Ok(list) => Ok(Json(list)),
            Err(error) => {
                debug!("Error: {}", error);
                Err(Status::InternalServerError)
            }
        },
        Err(error) => {
            debug!("Error: {}", error);
            Err(Status::ServiceUnavailable)
        }
    }
}

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
