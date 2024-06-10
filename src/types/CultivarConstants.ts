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
export enum Climates {
  TropicalRainforest = "TropicalRainforest", // Equatorial
  Tropical = "Tropical", // Tropical
  Subtropical = "Subtropical", // Subtropical
  Desert = "Desert", // Deserto
  Temperate = "Temperate", // Temperado
  Mediterranean = "Mediterranean", // Mediterrâneo
  SemiArid = "SemiArid", // Semiárido
  Subpolar = "Subpolar", // Frio
  MountainCold = "MountainCold", // Frio da montanha
  Polar = "Polar", // Polar
}

export type CultivarConstant = {
  id: string
  value: number
  reference: string
  comment: string
  type: keyof PPL_Constants
  // createdAt: string
  // updatedAt: string
}



