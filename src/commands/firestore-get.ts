import * as Command from "../command";
import * as clc from "cli-color";
import * as fsi from "../firestore/get";
import * as logger from "../logger";
import * as requirePermissions from "../requirePermissions";
import * as utils from "../utils";

module.exports = new Command("firestore:get [path]")
  .description("Get a document from Cloud Firestore.")
  .before(requirePermissions, ["datastore.entities.list", "datastore.entities.get"])
  .action(async (path: string, options: any) => {
    // Guarantee path
    if (!path) {
      return utils.reject("Must specify a path.", { exit: 1 });
    }

    const getApi = new fsi.FirestoreGet(options.project, path, options);
    return getApi.execute();
  });
