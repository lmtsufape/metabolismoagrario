import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, Text, View } from "react-native";
import { RootStackParamList } from "../Routes";
import { CalculationResult } from "@/components/CalculationResult";

type NavigationProps = NativeStackScreenProps<RootStackParamList, "PPLResult">;

export function PPLResult(props: NavigationProps) {
  const PPL = props.route.params.ppl;

  const productivity = PPL.getProductivity();
  const totalAerialBiomass = PPL.getTotalAerialBiomass();
  const residueBiomass = PPL.getResidueBiomass();
  const dryMatterBiomass = PPL.getDryMatterBiomass();
  const residueDryMatterBiomass = PPL.getResidueDryMatterBiomass();
  const dryMatterBiomassTotal = PPL.getDryMatterBiomassTotal();
  const belowgroundBiomass = PPL.getBelowgroundBiomass();
  const weedAerialBiomass = PPL.getWeedAerialBiomass();
  const weedBelowgroundBiomass = PPL.getWeedBelowgroundBiomass();

  return (
    <ScrollView contentContainerStyle={{ gap: 10, paddingVertical: 10 }}>
      <CalculationResult calcResult={productivity} />

      <CalculationResult calcResult={totalAerialBiomass} />

      <CalculationResult calcResult={residueBiomass} />

      <CalculationResult calcResult={dryMatterBiomass} />

      <CalculationResult calcResult={residueDryMatterBiomass} />

      <CalculationResult calcResult={dryMatterBiomassTotal} />

      <CalculationResult calcResult={belowgroundBiomass} />

      <CalculationResult calcResult={weedAerialBiomass} />

      <CalculationResult calcResult={weedBelowgroundBiomass} />
    </ScrollView>
  );
}
