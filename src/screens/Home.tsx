import { ConstantsModal } from "@/components/ConstantsModal/index";
import { CultivarSelector } from "@/components/CultivarSelector";
import { DimissableKeyboardView } from "@/components/DimissableKeyboardView";
import { NumericInput } from "@/components/NumericInput";
import { PPL } from "@/models/PPL";
import { PPL_Constants } from "@/types/CultivarConstants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, useTheme } from "@rneui/themed";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import { RootStackParamList } from "../Routes";
import { Cultivar } from "../types";

interface FormData {
  harvestedProduction: string;
  area: string;
}

type NavigationProps = NativeStackScreenProps<RootStackParamList, "Home">;

export function Home({ navigation }: NavigationProps) {
  const { theme } = useTheme();
  const [selectedCultivar, setSelectedCultivar] = useState<Cultivar | null>(null);
  const { control, getValues } = useForm<FormData>({
    defaultValues: {
      harvestedProduction: "0",
      area: "0",
    },
  });

  function onSubmit(constants: PPL_Constants) {
    const area = Number(getValues().area);
    const harvestedProduction = Number(getValues().harvestedProduction);

    if (area <= 0 || harvestedProduction <= 0) {
      Alert.alert("Por favor, preencha os campos de Produção e Área!");
      return;
    }

    const fullData = { area, harvestedProduction, selectedCrop: selectedCultivar, constants };
    console.log(fullData);

    const ppl = new PPL({
      area,
      harvestedProduction,
      constants,
      cultivar: selectedCultivar!,
    });

    navigation.navigate("PPLResult", { ppl });
  }

  return (
    <DimissableKeyboardView>
      <View style={{ flex: 1, padding: theme.spacing.lg, justifyContent: "space-between" }}>
        <View style={{ gap: theme.spacing.lg }}>
          <Text
            h1
            style={{
              textAlign: "center",
              color: theme.colors.primary,
              textDecorationLine: "underline",
              marginBottom: theme.spacing.lg,
            }}
          >
            PPL - Calculadora
          </Text>

          <View style={{ marginHorizontal: 10, gap: 4, paddingBottom: 24 }}>
            <Text style={{ fontSize: 16, color: theme?.colors?.grey3, fontWeight: "bold" }}></Text>
            <CultivarSelector selectedCultivar={selectedCultivar} onSelect={(c) => setSelectedCultivar(c)} />
          </View>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="harvestedProduction"
            render={({ field: { ref, ...rest } }) => (
              <NumericInput label="Produção colhida (t de massa fresca)" {...rest} />
            )}
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="area"
            render={({ field: { ref, ...rest } }) => <NumericInput label="Área plantada (ha)" {...rest} />}
          />
        </View>

        <View style={{ gap: theme.spacing.lg }}>
          <ConstantsModal selectedCultivar={selectedCultivar} onSubmit={(constants) => onSubmit(constants)} />
        </View>
      </View>
    </DimissableKeyboardView>
  );
}
