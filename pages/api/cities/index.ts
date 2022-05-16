import { itemsRepo } from "../../../components/repo";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getCities();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getCities() {
    const cities = await itemsRepo.getAllCities();
    return res.status(200).json(cities);
  }
}
