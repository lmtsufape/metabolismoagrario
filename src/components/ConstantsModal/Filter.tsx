import { Badge, Button, Icon, Text, makeStyles, useTheme } from "@rneui/themed";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { Select } from "../Select";
import { CultivarConstant } from "@/types/CultivarConstants";
import { IRRIGATIONS_TO_PT_BR } from "@/utils/parseIrrigationsToPT_BR";
import { CULTIVATION_SYSTEMS_TO_PT_BR } from "@/utils/parseCultivationSystemsToPT_BR";
import { CLIMATES_TO_PT_BR } from "@/utils/parseClimatesToPT_BR";
import { SOILS_TO_PT_BR } from "@/utils/parseIrrigationsToPT_BR copy";

export interface ConstantsFilter {
  country: string | null | "not_informed";
  climate: string | null | "not_informed";
  biome: string | null | "not_informed";
  irrigation: string | null | "not_informed";
  cultivationSystem: string | null | "not_informed";
  soil: string | null | "not_informed";
}
export const defaultConstantsFilter: ConstantsFilter = {
  country: null,
  climate: null,
  biome: null,
  irrigation: null,
  cultivationSystem: null,
  soil: null,
};

interface Props {
  constants: CultivarConstant[];
  filter: ConstantsFilter;
  onChange: (value: ConstantsFilter) => void;
}

export function Filter({ constants, filter, onChange }: Props) {
  const { theme } = useTheme();
  const styles = useStyles();
  const [isOpen, setOpen] = useState(false);

  const countriesList = new Map(
    constants.map((constant) => [
      constant.country,
      {
        label: constant.country ?? "Não informado",
        id: constant.country ?? "not_informed",
      },
    ])
  );
  const climatesList = new Map(
    constants.map((constant) => [
      constant.climate,
      {
        label: CLIMATES_TO_PT_BR[constant.climate] ?? "Não informado",
        id: constant.climate ?? "not_informed",
      },
    ])
  );
  const biomesList = new Map(
    constants.map((constant) => [
      constant.biome,
      {
        label: constant.biome ?? "Não informado",
        id: constant.biome ?? "not_informed",
      },
    ])
  );
  const soilList = new Map(
    constants.map((constant) => [
      constant.soil,
      {
        label: SOILS_TO_PT_BR[constant.soil] ?? "Não informado",
        id: constant.soil ?? "not_informed",
      },
    ])
  );
  const irrigationList = new Map(
    constants.map((constant) => [
      constant.irrigation,
      {
        label: IRRIGATIONS_TO_PT_BR[constant.irrigation] ?? "Não informado",
        id: constant.irrigation ?? "not_informed",
      },
    ])
  );
  const cultivationSystemsList = new Map(
    constants.map((constant) => [
      constant.cultivationSystem,
      {
        label:
          CULTIVATION_SYSTEMS_TO_PT_BR[constant.cultivationSystem] ??
          "Não informado",
        id: constant.cultivationSystem ?? "not_informed",
      },
    ])
  );

  function sortConstantsByLabel(
    list: Map<string, { label: string; id: string }>
  ) {
    return Array.from(list.values()).sort((a, b) => {
      if (a.id === "not_informed") {
        return -1;
      }
      if (b.id === "not_informed") {
        return 1;
      }
      return a.label.localeCompare(b.label);
    });
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button
          icon={{
            name: "filter",
            type: "font-awesome",
            color: theme.colors.primary,
          }}
          titleStyle={{ color: theme.colors.primary, fontWeight: "bold" }}
          type="clear"
          onPress={() => setOpen(true)}
        >
          Filtrar
          {Object.values(filter).some((value) => value !== null) && (
            <Badge
              containerStyle={{ marginLeft: 4, paddingBottom: 20 }}
              status="primary"
              textStyle={{ color: "#FFf" }}
              value={
                Object.values(filter).filter((value) => value !== null).length
              }
            />
          )}
        </Button>
        {Object.values(filter).some((value) => value !== null) && (
          <Button
            titleStyle={{ color: theme.colors.error, fontWeight: "bold" }}
            type="clear"
            onPress={() => onChange(defaultConstantsFilter)}
          >
            Limpar filtros
          </Button>
        )}
      </View>

      <ReactNativeModal
        isVisible={isOpen}
        style={{ margin: 0 }}
        onDismiss={closeModal}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="filter"
                type="font-awesome"
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Filtrar</Text>
            </View>
            <Button
              icon={{
                name: "times",
                type: "font-awesome",
                color: theme.colors.error,
              }}
              onPress={closeModal}
              type="clear"
            />
          </View>

          <ScrollView style={styles.filtersContainer}>
            <View style={styles.filterContainer}>
              <Text
                style={{
                  fontSize: 16,
                  color: theme?.colors?.grey3,
                  fontWeight: "bold",
                }}
              >
                Clima
              </Text>
              <Select
                list={sortConstantsByLabel(climatesList)}
                selectedItem={filter.climate}
                onSelect={(selectedItem) =>
                  onChange({ ...filter, climate: selectedItem || null })
                }
              />
            </View>
            <View style={styles.filterContainer}>
              <Text
                style={{
                  fontSize: 16,
                  color: theme?.colors?.grey3,
                  fontWeight: "bold",
                }}
              >
                Bioma
              </Text>
              <Select
                list={sortConstantsByLabel(biomesList)}
                selectedItem={filter.biome}
                onSelect={(selectedItem) =>
                  onChange({ ...filter, biome: selectedItem || null })
                }
              />
            </View>
            <View style={styles.filterContainer}>
              <Text
                style={{
                  fontSize: 16,
                  color: theme?.colors?.grey3,
                  fontWeight: "bold",
                }}
              >
                País
              </Text>
              <Select
                list={sortConstantsByLabel(countriesList)}
                selectedItem={filter.country}
                onSelect={(selectedItem) =>
                  onChange({ ...filter, country: selectedItem || null })
                }
              />
            </View>
            <View style={styles.filterContainer}>
              <Text
                style={{
                  fontSize: 16,
                  color: theme?.colors?.grey3,
                  fontWeight: "bold",
                }}
              >
                Solo
              </Text>
              <Select
                list={sortConstantsByLabel(soilList)}
                selectedItem={filter.soil}
                onSelect={(selectedItem) =>
                  onChange({ ...filter, soil: selectedItem || null })
                }
              />
            </View>
            <View style={styles.filterContainer}>
              <Text
                style={{
                  fontSize: 16,
                  color: theme?.colors?.grey3,
                  fontWeight: "bold",
                }}
              >
                Irrigação
              </Text>
              <Select
                list={sortConstantsByLabel(irrigationList)}
                selectedItem={filter.irrigation}
                onSelect={(selectedItem) =>
                  onChange({ ...filter, irrigation: selectedItem || null })
                }
              />
            </View>
            <View style={styles.filterContainer}>
              <Text
                style={{
                  fontSize: 16,
                  color: theme?.colors?.grey3,
                  fontWeight: "bold",
                }}
              >
                Sistema de cultivo
              </Text>
              <Select
                list={sortConstantsByLabel(cultivationSystemsList)}
                selectedItem={filter.cultivationSystem}
                onSelect={(selectedItem) =>
                  onChange({
                    ...filter,
                    cultivationSystem: selectedItem || null,
                  })
                }
              />
            </View>
          </ScrollView>

          <Button containerStyle={{ width: "100%" }} onPress={closeModal}>
            Filtrar
          </Button>
        </View>
      </ReactNativeModal>
    </>
  );
}

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: theme.spacing.xl,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filtersContainer: {
    width: "100%",
    height: "auto",
    marginVertical: theme.spacing.lg,
  },
  filterContainer: {
    gap: 4,
    marginVertical: theme.spacing.lg,
  },
}));
