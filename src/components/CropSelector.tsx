import { CLIMATES_TO_PT_BR } from "@/utils/parseClimatesToPT_BR";
import { Button, Icon, ListItem, Text, makeStyles, useTheme } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { getCropsList } from "../services/api";
import { Climates, Crop } from "../types";

interface Props {
  selectedCrop: Crop | null;
  onSelect: (crop: Crop) => void;
}

export function CropSelector({ selectedCrop, onSelect }: Props) {
  const styles = useStyles();
  const { theme } = useTheme();
  const [isOpen, setOpen] = useState(false);
  const [selectedClimate, setSelectedClimate] = useState<Climates | null>(null);

  const cropsListQuery = useQuery({
    queryKey: ["CROPS"],
    queryFn: getCropsList,
  });

  const getButtonLabel = () => {
    if (cropsListQuery.isLoading) return "Buscando...";

    if (selectedCrop) return selectedCrop.name;

    return "Seleciona cultura";
  };

  function closeModal() {
    setOpen(false);
  }

  function Header() {
    if (selectedClimate === null) return <Text h3>Selecione um clima</Text>;

    return (
      <View>
        <Text
          h3
          onPress={() => setSelectedClimate(null)}
          style={{ borderBottomColor: theme.colors.white, borderBottomWidth: StyleSheet.hairlineWidth }}
        >
          <Icon name="arrow-back-ios" size={20} /> Selecione uma cultura
        </Text>
        <Text style={{ textAlign: "center", marginTop: 6 }}>
          Clima: {CLIMATES_TO_PT_BR[selectedClimate].toUpperCase()}
        </Text>
      </View>
    );
  }

  function ClimatesList() {
    return Object.keys(cropsListQuery.data!).map((key) => {
      const items = cropsListQuery.data![key as Climates];

      return (
        <ListItem
          key={key}
          onPress={() => setSelectedClimate(key as Climates)}
          disabled={items.length === 0}
          style={{ opacity: items.length > 0 ? 1 : 0.5 }}
          bottomDivider
        >
          <ListItem.Content>
            <ListItem.Title>{CLIMATES_TO_PT_BR[key as Climates]}</ListItem.Title>
            <ListItem.Subtitle>{items.length} culturas cadastradas</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      );
    });
  }

  function CropsList() {
    if (!selectedClimate) {
      return null;
    }

    const items = cropsListQuery.data![selectedClimate];

    return items.map((item) => (
      <ListItem
        key={item.id}
        onPress={() => {
          closeModal();
          onSelect(item);
        }}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.scientificName}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ));
  }

  return (
    <>
      <Button size="lg" type="outline" onPress={() => setOpen(true)} disabled={cropsListQuery.isLoading}>
        {getButtonLabel()}
      </Button>

      <ReactNativeModal
        isVisible={isOpen}
        onDismiss={closeModal}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
      >
        <View style={styles.container}>
          <Header />

          <ScrollView style={{ width: "100%", marginVertical: 10 }}>
            {selectedClimate === null ? <ClimatesList /> : <CropsList />}
          </ScrollView>

          <Button
            type="clear"
            titleStyle={{ color: theme.colors.grey0 }}
            containerStyle={styles.closeBtn}
            onPress={closeModal}
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
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "90%",
    width: "100%",
    padding: 10,
    paddingBottom: 0,
  },

  closeBtn: {
    marginTop: "auto",
    marginBottom: 10,
    width: "100%",
  },
}));
