import { PPL_CONSTANTS_PT_BR } from "@/utils/pplConstantsToPT_BR";
import { Crop, PPL_Constants } from "../types";

type Props = {
  crop: Crop
  constants: PPL_Constants
  area: number
  harvestedProduction: number
}

export type PPlCalculationsReturn = {
  result: number
  formula: string
  name: string
  calculation: string
}

export class PPL {
  crop: Crop
  constants: PPL_Constants
  area: number
  harvestedProduction: number

  constructor(props: Props) {
    this.crop = props.crop
    this.constants = props.constants
    this.area = props.area
    this.harvestedProduction = props.harvestedProduction
  }

  getProductivity(): PPlCalculationsReturn {
    return {
      name: "Produtividade MF",
      result: this.harvestedProduction / this.area,
      formula: `Produção colhida / área`, // --> harvestedProduction / area
      calculation: `${this.harvestedProduction} / ${this.area}`
    }
  }

  getTotalAerialBiomass(): PPlCalculationsReturn {
    const productivity = this.getProductivity()
    return {
      name: "Biomassa aérea total",
      result: productivity.result / this.constants.HARVEST_INDEX,
      formula: `${productivity.name} / ${PPL_CONSTANTS_PT_BR["HARVEST_INDEX"]}`,
      calculation: `${productivity.result} / ${this.constants.HARVEST_INDEX}`
    }
  }

  getResidueBiomass(): PPlCalculationsReturn {
    const totalAerialBiomass = this.getTotalAerialBiomass()
    return {
      name: "Biomassa do resíduo",
      result: this.constants.AERIAL_RESIDUE_INDEX * totalAerialBiomass.result,
      formula: `${PPL_CONSTANTS_PT_BR["AERIAL_RESIDUE_INDEX"]} * ${totalAerialBiomass.name}`,
      calculation: `${this.constants.AERIAL_RESIDUE_INDEX} * ${totalAerialBiomass.result}`
    }
  }


  // Biomassa colhida em matéria seca 
  getDryMatterBiomass(): PPlCalculationsReturn {
    const productivity = this.getProductivity()
    return {
      name: "Biomassa colhida em matéria seca",
      result: productivity.result * this.constants.PRODUCT_DRY_MATTER_FACTOR,
      formula: `${productivity.name} * ${PPL_CONSTANTS_PT_BR["PRODUCT_DRY_MATTER_FACTOR"]}`,
      calculation: `${productivity.result} * ${this.constants.PRODUCT_DRY_MATTER_FACTOR}`
    }
  }

  // Biomassa do resíduo colhida em matéria seca 
  getResidueDryMatterBiomass(): PPlCalculationsReturn {
    const productivity = this.getProductivity()
    return {
      name: "Biomassa do resíduo em matéria seca",
      result: productivity.result * this.constants.RESIDUE_DRY_MATTER_FACTOR,
      formula: `${productivity.name} * ${PPL_CONSTANTS_PT_BR["RESIDUE_DRY_MATTER_FACTOR"]}`,
      calculation: `${productivity.result} * ${this.constants.RESIDUE_DRY_MATTER_FACTOR}`
    }
  }

  // BIOMASSA DA PARTE AÉREA (MS) = Biomassa colhida (MS) + biomassa do resíduo (MS) 
  getDryMatterBiomassTotal(): PPlCalculationsReturn {
    const dryMatterBiomass = this.getDryMatterBiomass();
    const residueDryMatterBiomass = this.getResidueDryMatterBiomass();
    return {
      name: "Biomassa em matéria seca",
      result: dryMatterBiomass.result + residueDryMatterBiomass.result,
      formula: `${dryMatterBiomass.name} + ${residueDryMatterBiomass.name}`,
      calculation: `${dryMatterBiomass.result} + ${residueDryMatterBiomass.result}`
    }
  }

  // Biomassa da parte subterrânea (raízes):
  getBelowgroundBiomass(): PPlCalculationsReturn {
    const dryMatterBiomassTotal = this.getDryMatterBiomassTotal();
    return {
      name: "Biomassa das raízes",
      result: dryMatterBiomassTotal.result * this.constants.BELOWGROUND_INDEX,
      formula: `${dryMatterBiomassTotal.name} * ${PPL_CONSTANTS_PT_BR["BELOWGROUND_INDEX"]}`,
      calculation: `${dryMatterBiomassTotal.result} * ${this.constants.BELOWGROUND_INDEX}`
    }
  }

  // Biomassa aérea das plantas adventícias 
  getWeedAerialBiomass(): PPlCalculationsReturn {
    const dryMatterBiomass = this.getDryMatterBiomass();
    return {
      name: "Biomassa aérea das plantas adventícias",
      result: this.constants.WEED_AERIAL_FACTOR * dryMatterBiomass.result,
      formula: `${PPL_CONSTANTS_PT_BR["WEED_AERIAL_FACTOR"]} * ${dryMatterBiomass.name}`,
      calculation: `${this.constants.WEED_AERIAL_FACTOR} * ${dryMatterBiomass.result}`
    }
  }

  // Biomassa subterrânea das plantas adventícias 
  getWeedBelowgroundBiomass(): PPlCalculationsReturn {
    const weedAerialBiomass = this.getWeedAerialBiomass();
    return {
      name: "Biomassa das plantas adventícias (raízes)",
      result: weedAerialBiomass.result * this.constants.WEED_BELOWGROUND_INDEX,
      formula: `${weedAerialBiomass.name} * ${PPL_CONSTANTS_PT_BR["WEED_BELOWGROUND_INDEX"]}`,
      calculation: `${weedAerialBiomass.result} * ${this.constants.WEED_BELOWGROUND_INDEX}`
    }
  }

}


//   crop: {
//     id: "024bf2b3-3992-4db0-95fb-6c62aa3cb97d",
//     name: "Tomate",
//     scientificName: "Solanum lycopersicum",
//   },
//   harvestedProduction: 0,
//   area: 0,
//   constants: {
//     AERIAL_RESIDUE_INDEX: 0,
//     PRODUCT_RESIDUE_INDEX: 0,
//     PRODUCT_DRY_MATTER_FACTOR: 0,
//     RESIDUE_DRY_MATTER_FACTOR: 0,
//     BELOWGROUND_INDEX: 0,
//     WEED_AERIAL_FACTOR: 0,
//     WEED_BELOWGROUND_INDEX: 0,
//     HARVEST_INDEX: 0,
//   }
// })

// ppl.getProductivity().formula