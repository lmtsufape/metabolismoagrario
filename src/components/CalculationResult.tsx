import { PPlCalculationsReturn } from "@/models/PPL";
import { Text, makeStyles, useTheme } from "@rneui/themed";
import { View } from "react-native";

type Props = {
  calcResult: PPlCalculationsReturn;
};

export function CalculationResult({ calcResult }: Props) {
  const { theme } = useTheme();
  const styles = useStyles();

  function parseResult(result: number, unity: string) {
    if (isNaN(result)) return "Não foi possível calcular";

    if (!isFinite(result)) return "Não foi possível calcular";

    return result.toFixed(2) + " " + unity;
  }

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 10,
        gap: 4,
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "normal", textAlign: "center", ...styles.text }}>
        {calcResult.name}:{" "}
        <Text style={{ fontWeight: "bold", ...styles.text }}>{parseResult(calcResult.result, calcResult.unity)}</Text>
      </Text>

      <Text style={{ fontStyle: "italic", ...styles.text }}>
        Fórmula: <Text style={{ ...styles.text }}>{calcResult.formula}</Text>
      </Text>
      <Text style={{ fontStyle: "italic", ...styles.text }}>
        Cálculo: <Text style={{ ...styles.text }}>{calcResult.calculation}</Text>
      </Text>
    </View>
  );
}

const useStyles = makeStyles(({ colors }) => ({
  text: {
    color: colors.white,
  },
}));
