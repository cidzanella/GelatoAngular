import { RawMaterial } from "./rawmaterial";
import { BaseType } from "./basetype";

export interface GelatoRecipe {
    id: number,
    name: string,
    description: string,
    active: boolean,
    baseTypeId: number,
    baseType: BaseType,
    baseInGrams: number,
    pastaAId: number,
    pastaA: RawMaterial,
    pastaAInGrams: number,
    pastaBId: number,
    pastaB: RawMaterial,
    pastaBInGrams: number,
    variegatoAId: number,
    variegatoA: RawMaterial,
    variegatoAInGrams: number,
    variegatoBId: number,
    variegatoB: RawMaterial,
    variegatoBInGrams: number,
    extractionLayers: number,
    minimumStockLevel: number,
    gelatoCost: number,
    gelatoCostDate: Date
}
