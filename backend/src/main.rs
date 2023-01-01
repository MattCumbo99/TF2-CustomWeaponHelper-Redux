#![feature(proc_macro_hygiene, decl_macro)]

use data::database;

pub mod api;
pub mod data;

#[macro_use]
extern crate rocket;

#[rocket::main]
async fn main() {
    let connection = match database::connect().await {
        Ok(connection) => connection,
        Err(error) => panic!("Error connecting to database:\n{}", error),
    };
    let _ = rocket::build()
        .mount("/", routes![])
        .mount(
            "/api",
            routes![api::weapons::get_weapon, api::weapons::get_weapons_by_class],
        )
        .manage(connection)
        .launch()
        .await;
}
