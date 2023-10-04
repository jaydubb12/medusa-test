// index.d.ts
// Added as part of Marketplace enablement 10/4/2023

import { Column, Entity } from "typeorm"
import {
    // alias the core entity to not cause a naming conflict
    Product as MedusaProduct,
} from "@medusajs/medusa"

@Entity()
export class Product extends MedusaProduct {
    @Column()
    customAttribute: string
}
