import { Button, Icon, ListItem, Text, makeStyles, useTheme } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { getCropsDetails, getCropsList } from "../services/api";
import { Crop, Cultivar } from "../types";

interface Props {
  selectedCultivar: Cultivar | null;
  onSelect: (cultivar: Cultivar | null) => void;
}

export function CultivarSelector({ selectedCultivar, onSelect }: Props) {
  const styles = useStyles();
  const { theme } = useTheme();
  const [isOpen, setOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

  const getCurrentList = () => {
    if (selectedCultivar === null && selectedCrop === null) return "CROPS";
    if (selectedCrop === null) return "CROPS";

    return "CULTIVARS";
  };

  const cropsListQuery = useQuery({
    queryKey: ["CROPS"],
    queryFn: getCropsList,
  });
  const cropDetailsQuery = useQuery({
    queryKey: ["CROPS", selectedCrop],
    queryFn: () => getCropsDetails(selectedCrop!.id),
    enabled: selectedCrop !== null,
  });

  const getButtonLabel = () => {
    if (cropsListQuery.isLoading) return "Buscando...";

    if (selectedCultivar) return `${selectedCrop?.name} - ${selectedCultivar.name}`;

    return "Selecionar cultivar";
  };

  function closeModal() {
    setOpen(false);
  }

  function reset() {
    setSelectedCrop(null);
    onSelect(null);
  }

  function Header() {
    if (selectedCrop === null) return <Text h3>Selecione uma cultura</Text>;

    return (
      <View>
        <Text
          h3
          onPress={reset}
          style={{ borderBottomColor: theme.colors.white, borderBottomWidth: StyleSheet.hairlineWidth }}
        >
          <Icon name="arrow-back-ios" size={20} /> Selecione um cultivar
        </Text>
        <Text style={{ textAlign: "center", marginTop: 6 }}>Cultura: {selectedCrop.name}</Text>
      </View>
    );
  }

  function CropsList() {
    return cropsListQuery.data!.map((crop) => (
      <ListItem key={crop.id} onPress={() => setSelectedCrop(crop)} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{crop.name}</ListItem.Title>
          <ListItem.Subtitle>{crop.scientificName}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ));
  }

  function CultivarsList() {
    return cropDetailsQuery.data?.crop.cultivars.map((cultivar) => (
      <ListItem
        key={cultivar.id}
        onPress={() => {
          closeModal();
          onSelect({ ...cultivar, cropName: selectedCrop?.name });
        }}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title>{cultivar.name}</ListItem.Title>
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
            {getCurrentList() === "CROPS" ? <CropsList /> : <CultivarsList />}
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
