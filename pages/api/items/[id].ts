import { itemsRepo } from "../../../components/repo";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getById();
    case "PUT":
      return updateItem();
    case "DELETE":
      return deleteItem();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getById() {
    const item = itemsRepo.getById(req.query.id);
    return res.status(200).json(item);
  }

  function updateItem() {
    try {
      itemsRepo.update(req.query.id, req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  function deleteItem() {
    itemsRepo.delete(req.query.id);
    return res.status(200).json({});
  }
}
