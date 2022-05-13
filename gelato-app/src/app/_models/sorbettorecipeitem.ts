import { RawMaterial } from "./rawmaterial";

export interface SorbettoRecipeItem {
    id: number,
    sorbettoTypeId: number,
    rawMaterialId: number,
    rawMaterial: RawMaterial,
    gramsPerKg: number
}
