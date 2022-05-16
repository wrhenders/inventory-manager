import { Item, City } from "../interfaces/";
const Database = require("@replit/database");
const itemDb = new Database();
const cityDb = new Database();

const initialDb = require("../db.json");

cityDb.set("cities", initialDb.cities);

const itemArr = initialDb.items;
itemArr.map((item) => {
  itemDb.set(item.id, {
    name: item.name,
    author: item.author,
    description: item.description,
    quantity: item.quantity,
    location: item.location,
  });
});

const replGetAllCities = async () => {
  const data: City[] = await cityDb.get("cities");
  return data;
};

const replGetAll = async () => {
  const data = await itemDb.list();
  const keyArr: string[] = data.filter((id) => id !== "cities");
  const itemList: Item[] = [];
  for (let key of keyArr) {
    const item = await itemDb.get(key);
    itemList.push({ ...item, id: key });
  }
  return itemList;
};

const replGetById = async (id) => {
  const data = await itemDb.get(id);
  return { ...data, id };
};

const validInputs = async (
  name: string,
  author: string,
  description: string,
  quantity: number,
  location: string
) => {
  const cities = await replGetAllCities();
  return (
    typeof name == "string" &&
    name.length < 99 &&
    typeof author == "string" &&
    author.length < 99 &&
    typeof description == "string" &&
    description.length < 500 &&
    typeof quantity == "number" &&
    quantity < 10000 &&
    typeof cities == "object" &&
    cities.some((city) => city.name == location)
  );
};

const replCreate = async (reqBody) => {
  const { name, author, description, quantity, location } = JSON.parse(reqBody);

  // Validate inputs
  if (!validInputs(name, author, description, quantity, location)) {
    throw new Error("Invalid Inputs");
  }
  const newItem: Item = { name, author, description, quantity, location };

  // Check not addition
  const items = await replGetAll();
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
    replUpdate(replicatedItem.id, JSON.stringify(updatedItem));
    return;
  }

  // generate new user id
  const id = Math.random().toString(36).substring(2, 7);
  // add and save user
  itemDb.set(id, newItem);
};

function replUpdate(id: string, reqBody: string) {
  const { name, author, description, quantity, location } = JSON.parse(reqBody);

  // Validate inputs
  if (!validInputs(name, author, description, quantity, location)) {
    throw new Error("Invalid Inputs");
  }
  const params = { name, author, description, quantity, location };
  itemDb.set(id, params);
}

function _delete(id: string) {
  itemDb.delete(id);
}

export const replItemsRepo = {
  replGetAll,
  replGetAllCities,
  replGetById,
  replCreate,
  replUpdate,
  replDelete: _delete,
};
