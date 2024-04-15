import { ConstantsModal } from "@/components/ConstantsModal/index";
import { DimissableKeyboardView } from "@/components/DimissableKeyboardView";
import { DropdownSelect } from "@/components/DropdownSelect";
import { usePPLStore } from "@/stores/PPLStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Input, Text, useTheme } from "@rneui/themed";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import { RootStackParamList } from "../Routes";
import { PPL } from "@/models/PPL";
import { mockedCrop } from "../mockData";
import { Crop } from "../types";

interface FormData {
  harvestedProduction: string;
  area: string;
}

type NavigationProps = NativeStackScreenProps<RootStackParamList, "Home">;

export function Home({ navigation }: NavigationProps) {
  const { theme } = useTheme();
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      harvestedProduction: "0",
      area: "0",
    },
  });
  const pplConstants = usePPLStore((state) => state.constants);
  const cropData = mockedCrop.crop as Crop;

  // TODO on crop selected, fetch its constants and fill them with usePPLStore

  function onSubmit(data: FormData) {
    if (!selectedCrop) {
      Alert.alert("Selecione uma cultura!");
      return;
    }
    // TODO validate pplConstants as well
    const fullData = { ...data, selectedCrop, pplConstants };
    console.log(fullData);
    const ppl = new PPL({
      area: Number(data.area),
      harvestedProduction: Number(data.harvestedProduction),
      constants: pplConstants,
      crop: {
        id: selectedCrop,
        name: "Arroz",
        scientificName: "Solanum lycopersicum",
      },
    });
    navigation.navigate("PPLResult", { ppl });
  }

  return (
    <DimissableKeyboardView>
      <View style={{ flex: 1, padding: theme.spacing.lg, justifyContent: "space-between" }}>
        <View style={{ gap: theme.spacing.lg }}>
          <Text h1 style={{ textAlign: "center" }}>
            PPL - Calculadora
          </Text>

          <View style={{ marginHorizontal: 10, gap: 4, paddingBottom: 24 }}>
            <Text style={{ fontSize: 16, color: theme?.colors?.grey3, fontWeight: "bold" }}>Cultura</Text>
            <DropdownSelect
              items={[
                { id: "2", label: "Arroz" },
                { id: "1", label: "Tomate" },
                { id: "3", label: "Cana de Açucar" },
              ]}
              onSelect={(c) => setSelectedCrop(c)}
            />
          </View>

          <Controller
            control={control}
            rules={{
              required: true,
              // validate: (value) => Number(value) > 0,
            }}
            name="harvestedProduction"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Produção colhida (t de massa fresca)"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="area"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Área plantada (ha)"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <View style={{ gap: theme.spacing.lg }}>
          <ConstantsModal crop={cropData} />
          <Button size="lg" onPress={handleSubmit(onSubmit)}>
            Calcular
          </Button>
        </View>
      </View>
    </DimissableKeyboardView>
  );
}
