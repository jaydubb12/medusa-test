/**
 * create a middleware that runs on all admin-authenticated routes and
 * checks the logged-in user’s permissions before giving them access to an endpoint.
 */
import {UserService} from "@medusajs/medusa"
import {NextFunction, Request, Response} from "express"

export default async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.user || !req.user.userId) {
        next()
        return
    }
    // retrieve currently logged-in user
    const userService = req.scope.resolve(
        "userService"
    ) as UserService
    const loggedInUser = await userService.retrieve(
        req.user.userId,
        {
            select: ["id"],
            relations: ["teamRole", "teamRole.permissions"],
        })

    // todo remediate issue where teamRole is not found
    // @ts-ignore
    if (!loggedInUser.teamRole) {
        // considered as super user
        next()
        return
    }
    // todo remediate issue where teamRole is not found
    // @ts-ignore
    const isAllowed = loggedInUser.teamRole?.permissions.some(
        (permission) => {
            const metadataKey = Object.keys(permission.metadata).find(
                (key) => key === req.path
            )
            if (!metadataKey) {
                return false
            }

            // boolean value
            return permission.metadata[metadataKey]
        }
    )

    if (isAllowed) {
        next()
        return
    }

    // deny access
    res.sendStatus(401)
}
