import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { RootStackParamList } from "../Routes";

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
    <View style={{ padding: 4 }}>
      <Text>
        {productivity.name}: {productivity.result}
      </Text>
      <Text>{productivity.formula}</Text>
      <Text>{productivity.calculation}</Text>

      <Text>--------------</Text>

      <Text>
        {totalAerialBiomass.name}: {totalAerialBiomass.result}
      </Text>
      <Text>{totalAerialBiomass.formula}</Text>
      <Text>{totalAerialBiomass.calculation}</Text>

      <Text>--------------</Text>

      <Text>
        {residueBiomass.name}: {residueBiomass.result}
      </Text>
      <Text>{residueBiomass.formula}</Text>
      <Text>{residueBiomass.calculation}</Text>

      <Text>--------------</Text>

      <Text>
        {dryMatterBiomass.name}: {dryMatterBiomass.result}
      </Text>
      <Text>{dryMatterBiomass.formula}</Text>
      <Text>{dryMatterBiomass.calculation}</Text>

      <Text>--------------</Text>

      <Text>
        {residueDryMatterBiomass.name}: {residueDryMatterBiomass.result}
      </Text>
      <Text>{residueDryMatterBiomass.formula}</Text>
      <Text>{residueDryMatterBiomass.calculation}</Text>

      <Text>--------------</Text>

      <Text>
        {dryMatterBiomassTotal.name}: {dryMatterBiomassTotal.result}
      </Text>
      <Text>{dryMatterBiomassTotal.formula}</Text>
      <Text>{dryMatterBiomassTotal.calculation}</Text>

      <Text>--------------</Text>

      <Text>
        {belowgroundBiomass.name}: {belowgroundBiomass.result}
      </Text>
      <Text>{belowgroundBiomass.formula}</Text>
      <Text>{belowgroundBiomass.calculation}</Text>
      <Text>--------------</Text>

      <Text>
        {weedAerialBiomass.name}: {weedAerialBiomass.result}
      </Text>
      <Text>{weedAerialBiomass.formula}</Text>
      <Text>{weedAerialBiomass.calculation}</Text>
      <Text>--------------</Text>

      <Text>
        {weedBelowgroundBiomass.name}: {weedBelowgroundBiomass.result}
      </Text>
      <Text>{weedBelowgroundBiomass.formula}</Text>
      <Text>{weedBelowgroundBiomass.calculation}</Text>
    </View>
  );
}
