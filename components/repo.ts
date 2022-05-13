const fs = require("fs");
let { items, cities } = require("../db.json");
import { Item } from "../interfaces/Item";

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

function invalidInputs(name, author, description, quantity, location) {
  return (
    name.length > 99 ||
    author.length > 99 ||
    description.length > 500 ||
    quantity > 10000 ||
    !cities.some((city) => city.name == location)
  );
}

function create(reqBody) {
  const { name, author, description, quantity, location } = JSON.parse(reqBody);

  // Validate inputs
  if (invalidInputs(name, author, description, quantity, location)) {
    throw new Error("Invalid Inputs");
  }
  const newItem: Item = { name, author, description, quantity, location };

  // Check not addition
  const replicatedItem: Item = items.find(
    (item) => item.name === newItem.name && item.location === newItem.location
  );
  if (replicatedItem) {
    const updatedItem = {
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

function update(id: string, reqBody) {
  const { name, author, description, quantity, location } = JSON.parse(reqBody);

  // Validate inputs
  if (invalidInputs(name, author, description, quantity, location)) {
    throw new Error("Invalid Inputs");
  }
  const params = { name, author, description, quantity, location };
  const item = items.find((x) => x.id.toString() === id.toString());

  // update and save
  Object.assign(item, params);
  saveData();
}

function _delete(id) {
  // filter out deleted user and save
  items = items.filter((x) => x.id.toString() !== id.toString());
  saveData();
}

function saveData() {
  fs.writeFileSync("db.json", JSON.stringify({ items, cities }, null, 2));
}
