import { itemsRepo } from "../../../components/repo";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getItems();
    case "POST":
      return createItem();
    default:
      console.log("hello");
    // return res.status(405).end(`Method ${req.method} Not Allowed`);
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
