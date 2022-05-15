import { Item, City } from "../interfaces/";
import fs from "fs";

let items: Item[];
let cities: City[];

let dbSource = "LOCAL";

if (dbSource == "REPLIT") {
  const db = require("../db.json");
  items = db.items;
  cities = db.cities;
} else {
  const db = require("../db.json");
  items = db.items;
  cities = db.cities;
}

export const itemsRepo = {
  getAll,
  getAllCities,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll() {
  return items;
}

function getAllCities() {
  return cities;
}

function getById(id: string) {
  return items.find((x) => x.id.toString() === id.toString());
}

function validInputs(
  name: string,
  author: string,
  description: string,
  quantity: number,
  location: string
) {
  return (
    (typeof name == "string" && name.length < 99) ||
    (typeof author == "string" && author.length < 99) ||
    (typeof description == "string" && description.length < 500) ||
    (typeof quantity == "number" && quantity < 10000) ||
    (typeof cities == "object" && cities.some((city) => city.name == location))
  );
}

function create(reqBody: string) {
  const { name, author, description, quantity, location } = JSON.parse(reqBody);
  console.log(typeof reqBody, name);

  // Validate inputs
  if (!validInputs(name, author, description, quantity, location)) {
    throw new Error("Invalid Inputs");
  }
  const newItem: Item = { name, author, description, quantity, location };

  // Check not addition
  const replicatedItem: Item = items.find(
    (item) => item.name === newItem.name && item.location === newItem.location
  );
  if (replicatedItem) {
    const updatedItem: Item = {
      name,
      author,
      description,
      quantity: quantity + replicatedItem.quantity,
      location,
    };
    update(replicatedItem.id, JSON.stringify(updatedItem));
    return;
  }

  // generate new user id
  newItem.id = Math.random().toString(36).substring(2, 7);
  // add and save user
  items.push(newItem);
  saveData();
}

function update(id: string, reqBody: string) {
  const { name, author, description, quantity, location } = JSON.parse(reqBody);

  // Validate inputs
  if (!validInputs(name, author, description, quantity, location)) {
    throw new Error("Invalid Inputs");
  }
  const params = { name, author, description, quantity, location };
  const item = items.find((x) => x.id.toString() === id.toString());

  // update and save
  Object.assign(item, params);
  saveData();
}

function _delete(id: string) {
  // filter out deleted user and save
  items = items.filter((x) => x.id.toString() !== id.toString());
  saveData();
}

function saveData() {
  fs.writeFileSync("db.json", JSON.stringify({ items, cities }, null, 2));
}
