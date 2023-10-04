import { Lifetime } from "awilix"
import {
    ProductService as MedusaProductService,
    User,
} from "@medusajs/medusa"

// extend core product service
class ProductService extends MedusaProductService {
    // The default life time for a core service is SINGLETON
    static LIFE_TIME = Lifetime.SCOPED

    protected readonly loggedInUser_: User | null

    constructor(container, options) {
        // todo resolve typescript check for spread operator
        // @ts-ignore
        super(...arguments)

        this.loggedInUser_ = container.loggedInUser
    }
}

export default ProductService
