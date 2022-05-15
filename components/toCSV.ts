import { Item } from "../interfaces";

export const toCSV = (data: Item[]) => {
  const csvString = [
    ["Title", "Author", "Description", "Quantity", "Location"],
    ...data.map((item) => [
      item.name.replace(/,/g, ","),
      item.author.replace(/,/g, ","),
      item.description.replace(/,/g, ","),
      item.quantity,
      item.location.replace(/,/g, ","),
    ]),
  ]
    .map((el) => el.join(","))
    .join("\n");

  return "data:text/csv;charset=utf-8," + csvString;
};
