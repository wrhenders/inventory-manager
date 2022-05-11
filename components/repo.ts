const fs = require("fs");
let items = require("../db.json");
import { Item } from "../interfaces/Item";

export const itemsRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll() {
  return items;
}

function getById(id: string) {
  return items.find((x) => x.id.toString() === id.toString());
}

function create(reqBody) {
  const newItem: Item = JSON.parse(reqBody);

  // validate not addition
  // if (items.find(item => item.name === newItem.name && item.location===newItem.location)){
  //     const idToUpdate = items.find(item => item.name === newItem.name && item.location===newItem.location).id
  //     update(id, (newItem))
  // }

  // generate new user id
  newItem.id = Math.random().toString(36).substring(2, 7);

  // add and save user
  items.push(newItem);
  saveData();
}

function update(id, { name, author, description, quantity, location }) {
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
  fs.writeFileSync("db.json", JSON.stringify(items));
}
