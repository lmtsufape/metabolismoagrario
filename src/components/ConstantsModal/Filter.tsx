import { Badge, Button, Icon, Text, makeStyles, useTheme } from "@rneui/themed";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { Select } from "../Select";
import { CultivarConstant } from "@/types/CultivarConstants";
import { IRRIGATIONS_TO_PT_BR } from "@/utils/parseIrrigationsToPT_BR";
import { CULTIVATION_SYSTEMS_TO_PT_BR } from "@/utils/parseCultivationSystemsToPT_BR";
import { CLIMATES_TO_PT_BR } from "@/utils/parseClimatesToPT_BR";

export interface ConstantsFilter {
  country: string | null;
  climate: string | null;
  biome: string | null;
  irrigation: string | null;
  cultivationSystem: string | null;
}
export const defaultConstantsFilter: ConstantsFilter = {
  country: null,
  climate: null,
  biome: null,
  irrigation: null,
  cultivationSystem: null,
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

  const countriesList = useMemo(
    () => new Map(constants.map((constant) => [constant.country, { label: constant.country, id: constant.country }])),
    [constants]
  );
  const climatesList = new Map(
    constants.map((constant) => [
      constant.climate,
      { label: CLIMATES_TO_PT_BR[constant.climate], id: constant.climate },
    ])
  );
  const biomesList = new Map(
    constants.map((constant) => [constant.biome, { label: constant.biome, id: constant.biome }])
  );
  const irrigationList = new Map(
    constants.map((constant) => [
      constant.irrigation,
      { label: IRRIGATIONS_TO_PT_BR[constant.irrigation], id: constant.irrigation },
    ])
  );
  const cultivationSystemsList = new Map(
    constants.map((constant) => [
      constant.cultivationSystem,
      { label: CULTIVATION_SYSTEMS_TO_PT_BR[constant.cultivationSystem], id: constant.cultivationSystem },
    ])
  );

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
        <Button
          icon={{ name: "filter-alt", type: "material", color: theme.colors.primary }}
          titleStyle={{ color: theme.colors.primary }}
          type="clear"
          onPress={() => setOpen(true)}
        >
          Filtrar
          {Object.values(filter).some((value) => value !== null) && (
            <Badge
              containerStyle={{ marginLeft: 4, paddingBottom: 20 }}
              status="primary"
              textStyle={{ color: "#FFf" }}
              value={Object.values(filter).filter((value) => value !== null).length}
            />
          )}
        </Button>
        {Object.values(filter).some((value) => value !== null) && (
          <Button
            icon={{ name: "filter-alt-off", type: "material", color: theme.colors.error }}
            titleStyle={{ color: theme.colors.error }}
            type="clear"
            onPress={() => onChange(defaultConstantsFilter)}
          >
            Limpar
          </Button>
        )}
      </View>

      <ReactNativeModal
        isVisible={isOpen}
        style={{ margin: 0, justifyContent: "flex-end" }}
        onDismiss={closeModal}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="filter-alt" type="material" style={{ marginRight: 5 }} />
              <Text style={{ fontSize: 18 }}>Filtrar</Text>
            </View>
            <Button icon={{ name: "close", type: "material" }} onPress={closeModal} color={"error"} type="clear" />
          </View>

          <ScrollView style={styles.filtersContainer}>
            <View style={styles.filterContainer}>
              <Text style={{ fontSize: 16, color: theme?.colors?.grey3, fontWeight: "bold" }}>País</Text>
              <Select
                list={[...countriesList.values()]}
                selectedItem={filter.country}
                onSelect={(selectedItem) => onChange({ ...filter, country: selectedItem || null })}
              />
            </View>
            <View style={styles.filterContainer}>
              <Text style={{ fontSize: 16, color: theme?.colors?.grey3, fontWeight: "bold" }}>Clima</Text>
              <Select
                list={[...climatesList.values()]}
                selectedItem={filter.climate}
                onSelect={(selectedItem) => onChange({ ...filter, climate: selectedItem || null })}
              />
            </View>
            <View style={styles.filterContainer}>
              <Text style={{ fontSize: 16, color: theme?.colors?.grey3, fontWeight: "bold" }}>Bioma</Text>
              <Select
                list={[...biomesList.values()]}
                selectedItem={filter.biome}
                onSelect={(selectedItem) => onChange({ ...filter, biome: selectedItem || null })}
              />
            </View>
            <View style={styles.filterContainer}>
              <Text style={{ fontSize: 16, color: theme?.colors?.grey3, fontWeight: "bold" }}>Irrigação</Text>
              <Select
                list={[...irrigationList.values()]}
                selectedItem={filter.irrigation}
                onSelect={(selectedItem) => onChange({ ...filter, irrigation: selectedItem || null })}
              />
            </View>
            <View style={styles.filterContainer}>
              <Text style={{ fontSize: 16, color: theme?.colors?.grey3, fontWeight: "bold" }}>Sistema de cultivo</Text>
              <Select
                list={[...cultivationSystemsList.values()]}
                selectedItem={filter.cultivationSystem}
                onSelect={(selectedItem) => onChange({ ...filter, cultivationSystem: selectedItem || null })}
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
