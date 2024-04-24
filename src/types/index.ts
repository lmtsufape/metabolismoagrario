export type Crop = {
  id: string
  name: string
  scientificName: string
  // createdAt: string
  // updatedAt: string
}
export type CropWithConstant = Crop & {
  constants: CropConstant[]
}

export type PPL_Constants = {
  HARVEST_INDEX: number;
  AERIAL_RESIDUE_INDEX: number;
  PRODUCT_RESIDUE_INDEX: number;
  PRODUCT_DRY_MATTER_FACTOR: number;
  RESIDUE_DRY_MATTER_FACTOR: number;
  BELOWGROUND_INDEX: number;
  WEED_AERIAL_FACTOR: number;
  WEED_BELOWGROUND_INDEX: number;
}

export type CropConstant = {
  id: string
  value: number
  reference: string
  comment: string
  type: keyof PPL_Constants
  // createdAt: string
  // updatedAt: string
}
