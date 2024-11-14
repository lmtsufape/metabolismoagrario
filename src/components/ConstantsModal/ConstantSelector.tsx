import { CultivarConstant, PPL_Constants } from "@/types/CultivarConstants";
import { PPL_CONSTANTS_PT_BR } from "@/utils/pplConstantsToPT_BR";
import { Button, Text, makeStyles, useTheme } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { ConstantsFilter, Filter, defaultConstantsFilter } from "./Filter";
import { CLIMATES_TO_PT_BR } from "@/utils/parseClimatesToPT_BR";
import { IRRIGATIONS_TO_PT_BR } from "@/utils/parseIrrigationsToPT_BR";
import { CULTIVATION_SYSTEMS_TO_PT_BR } from "@/utils/parseCultivationSystemsToPT_BR";
import { SOILS_TO_PT_BR } from "@/utils/parseIrrigationsToPT_BR copy";

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
    function checkFilterMatchesConstant({
      constantValue,
      filterKey,
    }: {
      constantValue: any;
      filterKey: keyof ConstantsFilter;
    }) {
      if (constantValue === filter[filterKey]) {
        return true;
      }
      if (filter[filterKey] === "not_informed") {
        return constantValue === null;
      }
      return false;
    }

    return constants.filter((constant) => {
      let filterFlag = true;
      if (filter.country)
        filterFlag =
          filterFlag &&
          checkFilterMatchesConstant({
            constantValue: constant.country,
            filterKey: "country",
          });
      if (filter.climate)
        filterFlag =
          filterFlag &&
          checkFilterMatchesConstant({
            constantValue: constant.climate,
            filterKey: "climate",
          });
      if (filter.biome)
        filterFlag =
          filterFlag &&
          checkFilterMatchesConstant({
            constantValue: constant.biome,
            filterKey: "biome",
          });
      if (filter.irrigation)
        filterFlag =
          filterFlag &&
          checkFilterMatchesConstant({
            constantValue: constant.irrigation,
            filterKey: "irrigation",
          });
      if (filter.soil)
        filterFlag =
          filterFlag &&
          checkFilterMatchesConstant({
            constantValue: constant.soil,
            filterKey: "soil",
          });
      if (filter.cultivationSystem)
        filterFlag =
          filterFlag &&
          checkFilterMatchesConstant({
            constantValue: constant.cultivationSystem,
            filterKey: "cultivationSystem",
          });
      return filterFlag;
    });
  }

  return (
    <>
      <Button
        onPress={() => setOpen(true)}
        type="clear"
        icon={{
          name: "edit",
          type: "font-awesome",
          color: theme.colors.primary,
        }}
      />
      <ReactNativeModal
        isVisible={isOpen}
        style={{ margin: theme.spacing.md }}
        onDismiss={closeModal}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
      >
        <View style={[styles.container, { paddingTop: theme.spacing.xl }]}>
          <View
            style={{
              width: "100%",
              borderBottomColor: theme.colors.grey1,
              borderBottomWidth: 1,
              paddingBottom: 12,
            }}
          >
            <Text
              h4
              style={{
                textAlign: "center",
                paddingHorizontal: theme.spacing.sm,
                fontWeight: "normal",
              }}
            >
              Escolher fator de conversão
            </Text>
            <Text
              h4
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {PPL_CONSTANTS_PT_BR[constantType]}
            </Text>
          </View>

          <Filter constants={constants} filter={filter} onChange={setFilter} />

          <ScrollView style={{ width: "100%" }}>
            {getConstantsListFiltered().map((constant) => (
              <View key={constant.id} style={styles.constantCard}>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoResult}>Valor:</Text>
                  <Text style={{ fontSize: 16 }}>{constant.value}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoResult}>Clima:</Text>
                  <Text style={{ fontSize: 16 }}>
                    {CLIMATES_TO_PT_BR[constant.climate]}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoResult}>Bioma:</Text>
                  <Text style={{ fontSize: 16 }}>{constant.biome}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoResult}>País:</Text>
                  <Text style={{ fontSize: 16 }}>{constant.country}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoResult}>Solo:</Text>
                  <Text style={{ fontSize: 16 }}>
                    {SOILS_TO_PT_BR[constant.soil]}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoResult}>Irrigação:</Text>
                  <Text style={{ fontSize: 16 }}>
                    {IRRIGATIONS_TO_PT_BR[constant.irrigation]}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoResult}>Sistema de cultivo:</Text>
                  <Text style={{ fontSize: 16 }}>
                    {CULTIVATION_SYSTEMS_TO_PT_BR[constant.cultivationSystem]}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoResult}>Referência:</Text>
                  <Text style={{ fontSize: 16 }}>{constant.reference}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoResult}>Observação:</Text>
                  <Text style={{ fontSize: 16 }}>{constant.comment}</Text>
                </View>

                <Button
                  key={constant.id}
                  onPress={() => {
                    onChange(constant.value.toString());
                    closeModal();
                  }}
                  type="clear"
                  titleStyle={{ fontWeight: "bold" }}
                >
                  Selecionar fator de conversão
                </Button>
              </View>
            ))}

            {getConstantsListFiltered().length === 0 && (
              <Text style={{ textAlign: "center", fontSize: 16 }}>
                Nenhuma fator de conversão encontrado...
              </Text>
            )}
          </ScrollView>

          <Button
            onPress={closeModal}
            type="clear"
            style={styles.closeBtn}
            titleStyle={{ color: theme.colors.grey1, fontWeight: "bold" }}
          >
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
    height: "90%",
    gap: theme.spacing.lg,
  },
  constantCard: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.grey5,
    width: "100%",
    marginBottom: theme.spacing.md,
    borderRadius: 10,
  },
  infoResult: {
    fontWeight: "bold",
    color: theme.colors.grey0,
    fontSize: 16,
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
