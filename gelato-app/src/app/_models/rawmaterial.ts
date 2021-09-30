import { RawMaterialSupplier } from "./rawmaterialsupplier";
import { RawMaterialType } from "./rawmaterialtype";

export interface RawMaterial {
   id: number,
   name: string,
   supplierId: number,
   supplier: RawMaterialSupplier,
   typeId: number,
   type: RawMaterialType,
   active: boolean,
}