// strategy - use middlewares and endpoints to register the logged-in user
// in the dependency container of your commerce application
// reference doc - https://docs.medusajs.com/development/endpoints/example-logged-in-user
import { User, UserService } from "@medusajs/medusa"

export async function registerLoggedInUser(req, res, next) {
    let loggedInUser: User | null = null

    if (req.user && req.user.userId) {
        const userService =
            req.scope.resolve("userService") as UserService
        loggedInUser = await userService.retrieve(req.user.userId)
    }

    req.scope.register({
        loggedInUser: {
            resolve: () => loggedInUser,
        },
    })

    next()
}
