import { Router } from "express";
import configLoader from "@medusajs/medusa/dist/loaders/config";
import createProductRouter from "./routes/create-product"
import cors from "cors";
import bodyParser from "body-parser";
import { authenticate, ConfigModule } from "@medusajs/medusa";
import { getConfigFile } from "medusa-core-utils";
import { attachStoreRoutes } from "./routes/store";
import { attachAdminRoutes } from "./routes/admin";

export default (rootDirectory: string): Router | Router[] => {
  // Read currently-loaded medusa config
  const { configModule } = getConfigFile<ConfigModule>(
    rootDirectory,
    "medusa-config"
  );
  const { projectConfig } = configModule;

  const config = configLoader(rootDirectory)


  // Set up our CORS options objects, based on config
  const storeCorsOptions = {
    origin: projectConfig.store_cors.split(","),
    credentials: true,
  };

  const adminCorsOptions = {
    origin: projectConfig.admin_cors.split(","),
    credentials: true,
  };

  // todo can this be deduplicated with code block at 28?
  // This exports an array of endpoints, one of them being the product endpoint that you applied the middleware on in the second step.
  // https://docs.medusajs.com/development/endpoints/example-logged-in-user
  const adminCors = {
    origin: config.projectConfig.admin_cors.split(","),
    credentials: true,
  }

  // Set up express router
  const router = Router();


  // Set up root routes for store and admin endpoints, with appropriate CORS settings
  router.use("/store", cors(storeCorsOptions), bodyParser.json());
  router.use("/admin", cors(adminCorsOptions), bodyParser.json());

  // Add authentication to all admin routes *except* auth and account invite ones
  router.use(
    /\/admin\/((?!auth)(?!invites)(?!users\/reset-password)(?!users\/password-token).*)/,
    authenticate()
  );

  // Set up routers for store and admin endpoints
  const storeRouter = Router();
  const adminRouter = Router();

  const productRouters = [
    createProductRouter(adminCors),
  ]



  // Attach these routers to the root routes
  router.use("/store", storeRouter);
  router.use("/admin", adminRouter);

  // Attach custom routes to these routers
  attachStoreRoutes(storeRouter);
  attachAdminRoutes(adminRouter);

  return [
      router,
      ...productRouters
  ];
};
