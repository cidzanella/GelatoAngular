import { RawMaterial } from "./rawmaterial";

export interface BaseRecipeItem {
    id: number;
    baseTypeId: number;
    rawMaterialId: number;
    rawMaterial: RawMaterial;
    gramsPerKg: number;
}
