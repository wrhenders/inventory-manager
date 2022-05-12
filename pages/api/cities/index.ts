import { itemsRepo } from "../../../components/repo";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getCities();
    // case "POST":
    //   return createItem();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getCities() {
    const cities = itemsRepo.getAllCities();
    return res.status(200).json(cities);
  }

  //   function createItem() {
  //     try {
  //       itemsRepo.create(req.body);
  //       return res.status(200).json({});
  //     } catch (error) {
  //       return res.status(400).json({ message: error });
  //     }
  //   }
}
