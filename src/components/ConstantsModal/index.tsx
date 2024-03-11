import { Text } from "@rneui/base";
import { Button, Icon, Input } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import { Keyboard, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { useStyles } from "../styles";

interface FormData {
  HARVEST_INDEX: string;
  AERIAL_RESIDUE_INDEX: string;
  PRODUCT_RESIDUE_INDEX: string;
  PRODUCT_DRY_MATTER_FACTOR: string;
}

export function ConstantsModal() {
  const [isKeyboardOpen, setKeyboardStatus] = useState(false);
  const styles = useStyles({ isKeyboardOpen });
  const [isOpen, setOpen] = useState(false);
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      HARVEST_INDEX: "0",
      AERIAL_RESIDUE_INDEX: "0",
      PRODUCT_RESIDUE_INDEX: "0",
      PRODUCT_DRY_MATTER_FACTOR: "0",
    },
  });

  // keyboard listener
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  function closeModal() {
    setOpen(!isOpen);
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
      <Button onPress={() => setOpen(true)} type="clear">
        Definir constantes
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

          <View style={styles.formContainer}>
            <ConstantInput control={control} name="HARVEST_INDEX" label="Índice de colheita" />
            <ConstantInput control={control} name="AERIAL_RESIDUE_INDEX" label="Índice de resíduo da parte aérea" />
            <ConstantInput control={control} name="PRODUCT_RESIDUE_INDEX" label="Índice de resíduo do produto" />
            <ConstantInput control={control} name="PRODUCT_DRY_MATTER_FACTOR" label="Teor da matéria seca colhida" />
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
}

interface ConstantInputProps {
  control: Control<FormData, any>;
  name: keyof FormData;
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
      render={({ field: { onChange, onBlur, value } }) => (
        <Input label={label} keyboardType="numeric" onBlur={onBlur} onChangeText={onChange} value={value} />
      )}
    />
  );
}
