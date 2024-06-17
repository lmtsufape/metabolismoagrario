import { CultivarConstant, PPL_Constants } from "@/types/CultivarConstants";
import { PPL_CONSTANTS_PT_BR } from "@/utils/pplConstantsToPT_BR";
import { Button, Text, makeStyles, useTheme } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { ConstantsFilter, Filter, defaultConstantsFilter } from "./Filter";

interface Props {
  constantType: keyof PPL_Constants;
  onChange: (value: string) => void;
  constants: CultivarConstant[];
}
export function ConstantSelector({ constantType, constants, onChange }: Props) {
  const { theme } = useTheme();
  const styles = useStyles();
  const [isOpen, setOpen] = useState(false);

  const [filter, setFilter] = useState<ConstantsFilter>(defaultConstantsFilter);

  function closeModal() {
    setOpen(false);
  }

  function getConstantsListFiltered() {
    return constants.filter((constant) => {
      let filterFlag = true;
      if (filter.country) filterFlag = filterFlag && constant.country === filter.country;
      if (filter.climate) filterFlag = filterFlag && constant.climate === filter.climate;
      if (filter.biome) filterFlag = filterFlag && constant.biome === filter.biome;
      if (filter.irrigation) filterFlag = filterFlag && constant.irrigation === filter.irrigation;
      if (filter.cultivationSystem) filterFlag = filterFlag && constant.cultivationSystem === filter.cultivationSystem;
      return filterFlag;
    });
  }

  return (
    <>
      <Button onPress={() => setOpen(true)} type="clear" icon={{ name: "edit", type: "material" }} />
      <ReactNativeModal
        isVisible={isOpen}
        style={{ margin: theme.spacing.md }}
        onDismiss={closeModal}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
      >
        <View style={styles.container}>
          <Text h4 style={{ textAlign: "center", paddingHorizontal: theme.spacing.lg }}>
            Escolher constante - {PPL_CONSTANTS_PT_BR[constantType]}
          </Text>

          <Filter constants={constants} filter={filter} onChange={setFilter} />

          <ScrollView style={{ width: "100%" }}>
            {getConstantsListFiltered().map((constant) => (
              <View key={constant.id} style={styles.constantCard}>
                <View style={styles.infoContainer}>
                  <Text style={{ fontSize: 16, textDecorationLine: "underline" }}>Valor:</Text>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>{constant.value}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={{ fontSize: 16, textDecorationLine: "underline" }}>Referência:</Text>
                  <Text style={{ fontSize: 16 }}>{constant.reference}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={{ fontSize: 16, textDecorationLine: "underline" }}>Comentário:</Text>
                  <Text style={{ fontSize: 16 }}>{constant.comment}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={{ fontSize: 16, textDecorationLine: "underline" }}>Clima:</Text>
                  <Text style={{ fontSize: 16 }}>{constant.climate}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={{ fontSize: 16, textDecorationLine: "underline" }}>Bioma:</Text>
                  <Text style={{ fontSize: 16 }}>{constant.biome}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={{ fontSize: 16, textDecorationLine: "underline" }}>País:</Text>
                  <Text style={{ fontSize: 16 }}>{constant.country}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={{ fontSize: 16, textDecorationLine: "underline" }}>Irrigação:</Text>
                  <Text style={{ fontSize: 16 }}>{constant.irrigation}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={{ fontSize: 16, textDecorationLine: "underline" }}>Sistema de cultivo:</Text>
                  <Text style={{ fontSize: 16 }}>{constant.cultivationSystem}</Text>
                </View>

                <Button
                  key={constant.id}
                  onPress={() => {
                    onChange(constant.value.toString());
                    closeModal();
                  }}
                  type="clear"
                >
                  Selecionar constante
                </Button>
              </View>
            ))}

            {getConstantsListFiltered().length === 0 && (
              <Text style={{ textAlign: "center", fontSize: 16 }}>Nenhuma constante encontrada...</Text>
            )}
          </ScrollView>

          <Button onPress={closeModal} type="clear" style={styles.closeBtn} titleStyle={{ color: theme.colors.grey0 }}>
            Fechar
          </Button>
        </View>
      </ReactNativeModal>
    </>
  );
}

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    borderRadius: 10,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    height: "100%",
    gap: theme.spacing.lg,
  },
  constantCard: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.grey0,
    width: "100%",
    marginBottom: theme.spacing.md,
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: "row",
    marginVertical: theme.spacing.md,
    gap: theme.spacing.md,
  },
  closeBtn: {
    marginTop: "auto",
  },
}));
