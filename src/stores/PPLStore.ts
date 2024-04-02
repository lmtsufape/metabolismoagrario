import { create } from "zustand"

export interface PPL_Constants {
  HARVEST_INDEX: string;
  AERIAL_RESIDUE_INDEX: string;
  PRODUCT_RESIDUE_INDEX: string;
  PRODUCT_DRY_MATTER_FACTOR: string;
  RESIDUE_DRY_MATTER_FACTOR: string;
  BELOWGROUND_INDEX: string;
  WEED_AERIAL_FACTOR: string;
  WEED_BELOWGROUND_INDEX: string;
}

type StateProps = {
  constants: PPL_Constants
  setConstants(constants: PPL_Constants): void
}

export const usePPLStore = create<StateProps>((set) => ({
  constants: {
    HARVEST_INDEX: "0",
    AERIAL_RESIDUE_INDEX: "0",
    PRODUCT_RESIDUE_INDEX: "0",
    PRODUCT_DRY_MATTER_FACTOR: "0",
    RESIDUE_DRY_MATTER_FACTOR: "0",
    BELOWGROUND_INDEX: "0",
    WEED_AERIAL_FACTOR: "0",
    WEED_BELOWGROUND_INDEX: "0",
  },
  setConstants: (constants: PPL_Constants) => set({ constants }),
}));
