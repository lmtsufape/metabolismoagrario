import { Button, Input, Text, useTheme } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import { Alert, View } from "react-native";

interface FormData {
  harvestedProduction: string;
  area: string;
}

export function Home() {
  const { theme } = useTheme();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      harvestedProduction: "0",
      area: "0",
    },
  });

  function onSubmit(data: FormData) {
    console.log(data);
    Alert.alert(JSON.stringify(data));
  }

  return (
    <View style={{ flex: 1, padding: theme.spacing.lg, gap: theme.spacing.lg }}>
      <Text h1 style={{ textAlign: "center" }}>
        PPL - Calculadora
      </Text>

      <Controller
        control={control}
        rules={{
          required: true,
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

      <Button size="lg" onPress={handleSubmit(onSubmit)}>
        Calcular
      </Button>
    </View>
  );
}
