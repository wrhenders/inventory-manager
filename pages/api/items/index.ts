import { itemsRepo } from "../../../components/repo";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getItems();
    case "POST":
      return createItem();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getItems() {
    const items = itemsRepo.getAll();
    return res.status(200).json(items);
  }

  function createItem() {
    try {
      itemsRepo.create(req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}
