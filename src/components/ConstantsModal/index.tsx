import { PPL_Constants } from "@/types/CultivarConstants";
import { Cultivar } from "@/types/index";
import { convertFieldsToNumber } from "@/utils/convertObjFieldsToNumber";
import { PPL_CONSTANTS_PT_BR } from "@/utils/pplConstantsToPT_BR";
import { Text } from "@rneui/base";
import { Button, Icon, useTheme } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import { getCultivarDetails } from "../../services/api";
import { NumericInput } from "../NumericInput";
import { ConstantSelector } from "./ConstantSelector";
import { useStyles } from "./styles";

type PPL_Constants_Form = {
  [key in keyof PPL_Constants]: string;
};

type Props = {
  selectedCultivar: Cultivar | null;
  onSubmit: (values: PPL_Constants) => void;
};

export function ConstantsModal({ selectedCultivar, onSubmit }: Props) {
  const styles = useStyles();
  const [isOpen, setOpen] = useState(false);
  const { theme } = useTheme();

  const cultivarDetailsQuery = useQuery({
    queryKey: ["CULTIVAR", selectedCultivar?.id],
    queryFn: () => getCultivarDetails(selectedCultivar!.id),
    enabled: selectedCultivar !== null,
  });

  const cultivarData = cultivarDetailsQuery.data;

  function setInitialConstantValue(type: keyof PPL_Constants) {
    const constant = cultivarData?.constants.find((c) => c.type === type);
    if (constant) {
      return constant.value.toString();
    }
    return "";
  }

  const { control, handleSubmit, setValue, reset } =
    useForm<PPL_Constants_Form>({
      defaultValues: {
        HARVEST_INDEX: setInitialConstantValue("HARVEST_INDEX"),
        AERIAL_RESIDUE_INDEX: setInitialConstantValue("AERIAL_RESIDUE_INDEX"),
        PRODUCT_RESIDUE_INDEX: setInitialConstantValue("PRODUCT_RESIDUE_INDEX"),
        PRODUCT_DRY_MATTER_FACTOR: setInitialConstantValue(
          "PRODUCT_DRY_MATTER_FACTOR"
        ),
        RESIDUE_DRY_MATTER_FACTOR: setInitialConstantValue(
          "RESIDUE_DRY_MATTER_FACTOR"
        ),
        BELOWGROUND_INDEX: setInitialConstantValue("BELOWGROUND_INDEX"),
        WEED_AERIAL_FACTOR: setInitialConstantValue("WEED_AERIAL_FACTOR"),
        WEED_BELOWGROUND_INDEX: setInitialConstantValue(
          "WEED_BELOWGROUND_INDEX"
        ),
      },
    });

  useEffect(() => {
    if (cultivarData) {
      reset({
        HARVEST_INDEX: setInitialConstantValue("HARVEST_INDEX"),
        AERIAL_RESIDUE_INDEX: setInitialConstantValue("AERIAL_RESIDUE_INDEX"),
        PRODUCT_RESIDUE_INDEX: setInitialConstantValue("PRODUCT_RESIDUE_INDEX"),
        PRODUCT_DRY_MATTER_FACTOR: setInitialConstantValue(
          "PRODUCT_DRY_MATTER_FACTOR"
        ),
        RESIDUE_DRY_MATTER_FACTOR: setInitialConstantValue(
          "RESIDUE_DRY_MATTER_FACTOR"
        ),
        BELOWGROUND_INDEX: setInitialConstantValue("BELOWGROUND_INDEX"),
        WEED_AERIAL_FACTOR: setInitialConstantValue("WEED_AERIAL_FACTOR"),
        WEED_BELOWGROUND_INDEX: setInitialConstantValue(
          "WEED_BELOWGROUND_INDEX"
        ),
      });
    }
  }, [cultivarData]);

  function closeModal() {
    setOpen(false);
  }

  function handleSubmitForm(data: PPL_Constants_Form) {
    closeModal();
    onSubmit(convertFieldsToNumber(data));
  }

  function handleConstantValueSelected(
    type: keyof PPL_Constants,
    value: string
  ) {
    setValue(type, value);
  }

  /*
    Harvest_index // Índice de colheita
    Aerial_residue_index // Índice de resíduo da parte aérea
    Product_residue_index // Índice de resíduo do produto
    Product_dry_matter_factor // Teor da matéria seca colhida
    Residue_dry_matter_factor // Teor da matéria seca resíduo
    Belowground_index // Índice de raiz (Belowground Biomass in the sheet, maybe?)
    Weed_aerial_factor // Fator de conversão para estimar a biomassa aérea das adventícias (where in the sheet?)
    Weed_belowground_index // Índice de raiz adventícias (where in the sheet?)
  */

  if (selectedCultivar === null)
    return (
      <Button
        size="lg"
        onPress={() => Alert.alert("Selecione um cultivo!")}
        buttonStyle={styles.submitButton}
        titleStyle={{ fontWeight: "bold" }}
        containerStyle={{ width: "80%", alignSelf: "center" }}
      >
        Continuar
      </Button>
    );

  if (cultivarData === undefined)
    return (
      <Button
        size="lg"
        disabled
        loading
        buttonStyle={styles.submitButton}
        titleStyle={{ fontWeight: "bold" }}
        containerStyle={{ width: "80%", alignSelf: "center" }}
        title="Buscando fatores de conversão..."
      ></Button>
    );

  return (
    <>
      <Button
        size="lg"
        onPress={() => setOpen(true)}
        buttonStyle={styles.submitButton}
        titleStyle={{ fontWeight: "bold" }}
        containerStyle={{ width: "80%", alignSelf: "center" }}
      >
        Continuar
      </Button>
      <ReactNativeModal
        isVisible={isOpen}
        style={{ margin: 0, justifyContent: "flex-end" }}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
      >
        <View style={styles.container}>
          <View
            style={{
              borderBottomColor: theme.colors.divider,
              borderBottomWidth: 2,
              width: "100%",
            }}
          >
            <Icon
              name="chevron-down"
              type="font-awesome"
              color={theme.colors.primary}
              style={{ marginBottom: theme.spacing.md }}
              onPress={closeModal}
            />
            <Text
              h4
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: theme.colors.primary,
                paddingBottom: theme.spacing.xl,
              }}
            >
              Definir Fatores de conversão
            </Text>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView
              style={styles.formContainer}
              contentContainerStyle={{
                alignItems: "center",
                paddingBottom: Dimensions.get("screen").height / 15,
              }}
            >
              <View style={styles.constantContainer}>
                <ConstantInput
                  control={control}
                  name="HARVEST_INDEX"
                  label={PPL_CONSTANTS_PT_BR["HARVEST_INDEX"]}
                />
                <ConstantSelector
                  constantType="HARVEST_INDEX"
                  constants={cultivarData.constants.filter(
                    (c) => c.type === "HARVEST_INDEX"
                  )}
                  onChange={(v) =>
                    handleConstantValueSelected("HARVEST_INDEX", v)
                  }
                />
              </View>

              <View style={styles.constantContainer}>
                <ConstantInput
                  control={control}
                  name="AERIAL_RESIDUE_INDEX"
                  label={PPL_CONSTANTS_PT_BR["AERIAL_RESIDUE_INDEX"]}
                />
                <ConstantSelector
                  constantType="AERIAL_RESIDUE_INDEX"
                  constants={cultivarData.constants.filter(
                    (c) => c.type === "AERIAL_RESIDUE_INDEX"
                  )}
                  onChange={(v) =>
                    handleConstantValueSelected("AERIAL_RESIDUE_INDEX", v)
                  }
                />
              </View>

              <View style={styles.constantContainer}>
                <ConstantInput
                  control={control}
                  name="PRODUCT_RESIDUE_INDEX"
                  label={PPL_CONSTANTS_PT_BR["PRODUCT_RESIDUE_INDEX"]}
                />
                <ConstantSelector
                  constantType="PRODUCT_RESIDUE_INDEX"
                  constants={cultivarData.constants.filter(
                    (c) => c.type === "PRODUCT_RESIDUE_INDEX"
                  )}
                  onChange={(v) =>
                    handleConstantValueSelected("PRODUCT_RESIDUE_INDEX", v)
                  }
                />
              </View>

              <View style={styles.constantContainer}>
                <ConstantInput
                  control={control}
                  name="PRODUCT_DRY_MATTER_FACTOR"
                  label={PPL_CONSTANTS_PT_BR["PRODUCT_DRY_MATTER_FACTOR"]}
                />
                <ConstantSelector
                  constantType="PRODUCT_DRY_MATTER_FACTOR"
                  constants={cultivarData.constants.filter(
                    (c) => c.type === "PRODUCT_DRY_MATTER_FACTOR"
                  )}
                  onChange={(v) =>
                    handleConstantValueSelected("PRODUCT_DRY_MATTER_FACTOR", v)
                  }
                />
              </View>

              <View style={styles.constantContainer}>
                <ConstantInput
                  control={control}
                  name="RESIDUE_DRY_MATTER_FACTOR"
                  label={PPL_CONSTANTS_PT_BR["RESIDUE_DRY_MATTER_FACTOR"]}
                />
                <ConstantSelector
                  constantType="RESIDUE_DRY_MATTER_FACTOR"
                  constants={cultivarData.constants.filter(
                    (c) => c.type === "RESIDUE_DRY_MATTER_FACTOR"
                  )}
                  onChange={(v) =>
                    handleConstantValueSelected("RESIDUE_DRY_MATTER_FACTOR", v)
                  }
                />
              </View>

              <View style={styles.constantContainer}>
                <ConstantInput
                  control={control}
                  name="BELOWGROUND_INDEX"
                  label={PPL_CONSTANTS_PT_BR["BELOWGROUND_INDEX"]}
                />
                <ConstantSelector
                  constantType="BELOWGROUND_INDEX"
                  constants={cultivarData.constants.filter(
                    (c) => c.type === "BELOWGROUND_INDEX"
                  )}
                  onChange={(v) =>
                    handleConstantValueSelected("BELOWGROUND_INDEX", v)
                  }
                />
              </View>

              <View style={styles.constantContainer}>
                <ConstantInput
                  control={control}
                  name="WEED_AERIAL_FACTOR"
                  label={PPL_CONSTANTS_PT_BR["WEED_AERIAL_FACTOR"]}
                />
                <ConstantSelector
                  constantType="WEED_AERIAL_FACTOR"
                  constants={cultivarData.constants.filter(
                    (c) => c.type === "WEED_AERIAL_FACTOR"
                  )}
                  onChange={(v) =>
                    handleConstantValueSelected("WEED_AERIAL_FACTOR", v)
                  }
                />
              </View>

              <View style={styles.constantContainer}>
                <ConstantInput
                  control={control}
                  name="WEED_BELOWGROUND_INDEX"
                  label={PPL_CONSTANTS_PT_BR["WEED_BELOWGROUND_INDEX"]}
                />
                <ConstantSelector
                  constantType="WEED_BELOWGROUND_INDEX"
                  constants={cultivarData.constants.filter(
                    (c) => c.type === "WEED_BELOWGROUND_INDEX"
                  )}
                  onChange={(v) =>
                    handleConstantValueSelected("WEED_BELOWGROUND_INDEX", v)
                  }
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

          <Button
            size="lg"
            onPress={handleSubmit(handleSubmitForm)}
            containerStyle={{ width: "80%", marginVertical: 20 }}
          >
            Calcular
          </Button>
        </View>
      </ReactNativeModal>
    </>
  );
}

interface ConstantInputProps {
  control: Control<PPL_Constants_Form, any>;
  name: keyof PPL_Constants_Form;
  label: string;
}
function ConstantInput({ control, name, label }: ConstantInputProps) {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      name={name}
      render={({ field: { ref, ...rest }, fieldState }) => (
        <NumericInput
          label={label}
          containerStyle={{ width: "80%" }}
          errorMessage={fieldState.invalid ? "Campo obrigatório" : undefined}
          {...rest}
        />
      )}
    />
  );
}
