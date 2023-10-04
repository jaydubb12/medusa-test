// reference doc - https://docs.medusajs.com/development/endpoints/example-logged-in-user
// In the example above, the middleware is applied on the /admin/products core endpoint.
// However, you can apply it on any other endpoint.
// The authenticate middleware imported from @medusajs/medusa is used to ensure that the user is logged in first.

import cors from "cors"
import { Router } from "express"
import {registerLoggedInUser} from "../middlewares/logged-in-users";
import authenticate
    from "@medusajs/medusa/dist/api/middlewares/authenticate"

const router = Router()

export default function (adminCorsOptions) {
    // This router will be applied before the core routes.
    // Therefore, the middleware will be executed
    // before the create product handler is hit
    router.use(
        "/admin/products",
        cors(adminCorsOptions),
        // The authenticate middleware imported from @medusajs/medusa
        // is used to ensure that the user is logged in first.
        authenticate(),
        registerLoggedInUser
    )
    return router
}
