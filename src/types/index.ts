import { CultivarConstant } from "./CultivarConstants"

export type Crop = {
  id: string
  name: string
  scientificName: string
  // createdAt: string
  // updatedAt: string
}
export type Cultivar = {
  id: string
  name: string
  cropId: string
  cropName?: string
}
export type CultivarWithConstants = Cultivar & {
  constants: CultivarConstant[]
}

