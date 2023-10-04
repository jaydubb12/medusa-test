// reference doc - https://docs.medusajs.com/development/entities/extend-entity
export default async function () {
    const imports = (await import(
        "@medusajs/medusa/dist/api/routes/store/products/index"
        )) as any
    imports.allowedStoreProductsFields = [
        //The fields or attributes of a product that are allowed to be retrieved and
        //returned in the product's store endpoints.
        ...imports.allowedStoreProductsFields,
        "customAttribute",
    ]
    imports.defaultStoreProductsFields = [
        // The fields or attributes of a product that are retrieved and
        // returned by default in the product's store endpoints
        ...imports.defaultStoreProductsFields,
        "customAttribute",
    ]
    imports.allowedStoreProductsRelations = [
        //  The relations of a product that are allowed to be retrieved
        //  and returned in the product's store endpoints.
        ...imports.allowedStoreProductsRelations,
        "customAttribute",
    ]
    imports.defaultStoreProductsRelations = [
        // The relations of a product that are retrieved and
        // returned by default in the product's store endpoints.
        ...imports.defaultStoreProductsRelations,
        "customAttribute",
    ]
}
