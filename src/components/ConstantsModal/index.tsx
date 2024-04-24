import { Crop, PPL_Constants } from "@/types/index";
import { convertFieldsToNumber } from "@/utils/convertObjFieldsToNumber";
import { PPL_CONSTANTS_PT_BR } from "@/utils/pplConstantsToPT_BR";
import { Text } from "@rneui/base";
import { Button, Icon, Input } from "@rneui/themed";
import { useState } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { ConstantSelector } from "./ConstantSelector";
import { useStyles } from "./styles";
import { NumericInput } from "../NumericInput";

type PPL_Constants_Form = {
  [key in keyof PPL_Constants]: string;
};

type Props = {
  crop: Crop;
  onSubmit: (values: PPL_Constants) => void;
};

export function ConstantsModal({ crop, onSubmit }: Props) {
  const styles = useStyles();
  const [isOpen, setOpen] = useState(false);

  function setInitialConstantValue(type: keyof PPL_Constants) {
    const constant = crop.constants.find((c) => c.type === type);
    if (constant) {
      return constant.value.toString();
    }
    return "0";
  }

  const { control, handleSubmit, setValue } = useForm<PPL_Constants_Form>({
    defaultValues: {
      HARVEST_INDEX: setInitialConstantValue("HARVEST_INDEX"),
      AERIAL_RESIDUE_INDEX: setInitialConstantValue("AERIAL_RESIDUE_INDEX"),
      PRODUCT_RESIDUE_INDEX: setInitialConstantValue("PRODUCT_RESIDUE_INDEX"),
      PRODUCT_DRY_MATTER_FACTOR: setInitialConstantValue("PRODUCT_DRY_MATTER_FACTOR"),
      RESIDUE_DRY_MATTER_FACTOR: setInitialConstantValue("RESIDUE_DRY_MATTER_FACTOR"),
      BELOWGROUND_INDEX: setInitialConstantValue("BELOWGROUND_INDEX"),
      WEED_AERIAL_FACTOR: setInitialConstantValue("WEED_AERIAL_FACTOR"),
      WEED_BELOWGROUND_INDEX: setInitialConstantValue("WEED_BELOWGROUND_INDEX"),
    },
  });

  function closeModal() {
    setOpen(false);
  }

  function handleSubmitForm(data: PPL_Constants_Form) {
    // TODO validate data

    closeModal();
    onSubmit(convertFieldsToNumber(data));
  }

  function handleConstantValueSelected(type: keyof PPL_Constants, value: string) {
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

  return (
    <>
      <Button size="lg" onPress={() => setOpen(true)} containerStyle={{ width: "80%", alignSelf: "center" }}>
        Calcular
      </Button>
      <ReactNativeModal
        isVisible={isOpen}
        style={{ margin: 0, justifyContent: "flex-end" }}
        swipeDirection={["down"]}
        onDismiss={closeModal}
        onSwipeComplete={closeModal}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
      >
        <View style={styles.container}>
          <Icon name="chevron-down" type="font-awesome-5" />
          <Text h3>Definir Constantes</Text>

          <ScrollView style={styles.formContainer} contentContainerStyle={{ alignItems: "center" }}>
            <View style={styles.constantContainer}>
              <ConstantInput control={control} name="HARVEST_INDEX" label={PPL_CONSTANTS_PT_BR["HARVEST_INDEX"]} />
              <ConstantSelector
                constantType="HARVEST_INDEX"
                constants={crop.constants.filter((c) => c.type === "HARVEST_INDEX")}
                onChange={(v) => handleConstantValueSelected("HARVEST_INDEX", v)}
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
                constants={crop.constants.filter((c) => c.type === "AERIAL_RESIDUE_INDEX")}
                onChange={(v) => handleConstantValueSelected("AERIAL_RESIDUE_INDEX", v)}
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
                constants={crop.constants.filter((c) => c.type === "PRODUCT_RESIDUE_INDEX")}
                onChange={(v) => handleConstantValueSelected("PRODUCT_RESIDUE_INDEX", v)}
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
                constants={crop.constants.filter((c) => c.type === "PRODUCT_DRY_MATTER_FACTOR")}
                onChange={(v) => handleConstantValueSelected("PRODUCT_DRY_MATTER_FACTOR", v)}
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
                constants={crop.constants.filter((c) => c.type === "RESIDUE_DRY_MATTER_FACTOR")}
                onChange={(v) => handleConstantValueSelected("RESIDUE_DRY_MATTER_FACTOR", v)}
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
                constants={crop.constants.filter((c) => c.type === "BELOWGROUND_INDEX")}
                onChange={(v) => handleConstantValueSelected("BELOWGROUND_INDEX", v)}
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
                constants={crop.constants.filter((c) => c.type === "WEED_AERIAL_FACTOR")}
                onChange={(v) => handleConstantValueSelected("WEED_AERIAL_FACTOR", v)}
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
                constants={crop.constants.filter((c) => c.type === "WEED_BELOWGROUND_INDEX")}
                onChange={(v) => handleConstantValueSelected("WEED_BELOWGROUND_INDEX", v)}
              />
            </View>
          </ScrollView>

          <Button
            size="lg"
            onPress={handleSubmit(handleSubmitForm)}
            containerStyle={{ width: "80%", marginVertical: 20 }}
          >
            Continuar
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
      render={({ field: { ref, ...rest } }) => (
        <NumericInput label={label} containerStyle={{ width: "80%" }} {...rest} />
      )}
    />
  );
}
