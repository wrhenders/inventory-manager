import { localItemsRepo } from "../components/localRepo";
// import { replItemsRepo } from "../components/replRepo";

let dbSource = process.env.DB;

export const itemsRepo =
  dbSource == "LOCAL"
    ? {
        getAll: localItemsRepo.getAll,
        getAllCities: localItemsRepo.getAllCities,
        getById: localItemsRepo.getById,
        create: localItemsRepo.create,
        update: localItemsRepo.update,
        delete: localItemsRepo.delete,
      }
    : {
        // getAll: replItemsRepo.replGetAll,
        // getAllCities: replItemsRepo.replGetAllCities,
        // getById: replItemsRepo.replGetById,
        // create: replItemsRepo.replCreate,
        // update: replItemsRepo.replUpdate,
        // delete: replItemsRepo.replDelete,
      };
