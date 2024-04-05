import { PPL_Constants } from "@/models/PPL";
import { create } from "zustand"

type StateProps = {
  constants: PPL_Constants
  setConstants(constants: PPL_Constants): void
}

export const usePPLStore = create<StateProps>((set) => ({
  constants: {
    HARVEST_INDEX: 0,
    AERIAL_RESIDUE_INDEX: 0,
    PRODUCT_RESIDUE_INDEX: 0,
    PRODUCT_DRY_MATTER_FACTOR: 0,
    RESIDUE_DRY_MATTER_FACTOR: 0,
    BELOWGROUND_INDEX: 0,
    WEED_AERIAL_FACTOR: 0,
    WEED_BELOWGROUND_INDEX: 0,
  },
  setConstants: (constants: PPL_Constants) => set({ constants }),
}));
