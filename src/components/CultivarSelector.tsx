import {
  Button,
  Icon,
  Image,
  ListItem,
  Text,
  makeStyles,
  useTheme,
} from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import { getCropsDetails, getCropsList } from "../services/api";
import { Crop, Cultivar } from "../types";
import VasoIcon from "../../assets/icons/Vaso.png";

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

  const formatName = (name: string) => {
    return name.length > 24 ? name.slice(0, 24).concat("...") : name;
  };

  const cropsListQuery = useQuery({
    queryKey: ["CROPS"],
    queryFn: getCropsList,
  });
  const cropDetailsQuery = useQuery({
    queryKey: ["CROPS", selectedCrop],
    queryFn: () => getCropsDetails(selectedCrop!.id),
    enabled: selectedCrop !== null,
    staleTime: 0, //
  });

  const getButtonLabel = () => {
    if (cropsListQuery.isLoading)
      return <Text style={styles.buttonLabel}>Buscando...</Text>;

    if (selectedCultivar)
      return (
        <>
          <Text style={[styles.buttonLabel, { textAlign: "center" }]}>
            {selectedCrop?.name}
          </Text>
          <Text
            style={[
              styles.buttonLabel,
              { fontWeight: "bold", textAlign: "center" },
            ]}
          >
            {formatName(selectedCultivar.name)}
          </Text>
        </>
      );

    return (
      <Text style={styles.buttonLabel}>
        Selecionar{" "}
        <Text style={[styles.buttonLabel, { fontWeight: "bold" }]}>
          Cultura
        </Text>
      </Text>
    );
  };

  function closeModal() {
    setOpen(false);
  }

  function reset() {
    closeModal();
    setSelectedCrop(null);
    onSelect(null);
  }

  function Header() {
    return (
      <View
        style={{
          width: "100%",
          borderBottomColor: theme.colors.divider,
          borderStyle: "solid",
          borderBottomWidth: 1,
          alignItems: "center",
          paddingBottom: 12,
        }}
      >
        <Text
          h4
          onPress={reset}
          style={{ color: theme.colors.primary, fontWeight: "bold" }}
        >
          <Icon
            name="leaf"
            type="font-awesome"
            size={20}
            color={theme.colors.primary}
            style={{ marginRight: 8 }}
          />
          {selectedCrop ? "Selecione uma cultivar" : "Selecione uma cultura"}
        </Text>
        {selectedCrop && (
          <Text
            h4
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 6,
              color: theme.colors.grey1,
            }}
          >
            Cultura: {selectedCrop.name}
          </Text>
        )}
      </View>
    );
  }

  function CropsList() {
    if (cropsListQuery.data && cropsListQuery.data.length < 1)
      return (
        <Text
          h4
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: theme.colors.grey4,
          }}
        >
          Não há culturas
        </Text>
      );

    return cropsListQuery.data!.map((crop) => (
      <ListItem
        key={crop.id}
        onPress={() => setSelectedCrop(crop)}
        style={styles.selectButton}
      >
        <ListItem.Content>
          <ListItem.Title
            style={{ color: theme.colors.grey1, fontWeight: "bold" }}
          >
            {crop.name}
          </ListItem.Title>
          <ListItem.Subtitle
            style={{ color: theme.colors.grey1, fontWeight: "normal" }}
          >
            {crop.scientificName}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ));
  }

  function CultivarsList() {
    if (cropDetailsQuery.isLoading)
      return (
        <>
          <Text style={{ textAlign: "center", marginBottom: 12 }}>
            Buscando cultivares...
          </Text>
          <ActivityIndicator size={"small"} color={theme.colors.grey1} />
        </>
      );

    if (
      cropDetailsQuery.data &&
      cropDetailsQuery.data?.crop.cultivars.length < 1
    )
      return (
        <Text
          h4
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: theme.colors.grey4,
          }}
        >
          Não há cultivares
        </Text>
      );

    return cropDetailsQuery.data?.crop.cultivars.map((cultivar) => (
      <ListItem
        key={cultivar.id}
        onPress={() => {
          closeModal();
          onSelect({ ...cultivar, cropName: selectedCrop?.name });
        }}
        style={styles.selectButton}
      >
        <ListItem.Content>
          <ListItem.Title
            style={{ color: theme.colors.grey1, fontWeight: "bold" }}
          >
            {cultivar.name}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ));
  }

  return (
    <>
      <Button
        size="lg"
        type="outline"
        onPress={() => setOpen(true)}
        disabled={cropsListQuery.isLoading}
        buttonStyle={styles.selectorButton}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {(!selectedCultivar || cropsListQuery.isLoading) && (
            <Image
              source={VasoIcon}
              style={{ width: 36, height: 36, marginRight: 8 }}
            />
          )}

          <View style={{ width: selectedCultivar ? "100%" : "51%" }}>
            {getButtonLabel()}
          </View>
        </View>
      </Button>

      <ReactNativeModal
        style={{ margin: 0 }}
        isVisible={isOpen}
        onDismiss={closeModal}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
      >
        <View style={styles.container}>
          <Button
            type="clear"
            titleStyle={{ color: theme.colors.grey0 }}
            containerStyle={styles.closeBtn}
            onPress={reset}
          >
            <Icon
              name="chevron-down"
              type="font-awesome"
              size={16}
              color={theme.colors.primary}
            />
          </Button>
          <Header />
          <ScrollView style={{ width: "100%", marginVertical: 10 }}>
            {getCurrentList() === "CROPS" ? <CropsList /> : <CultivarsList />}
          </ScrollView>
        </View>
      </ReactNativeModal>
    </>
  );
}

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "80%",
    width: "100%",
    padding: 10,
    paddingBottom: 0,
  },

  selectorButton: {
    paddingVertical: 16,
    borderRadius: 8,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    color: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonLabel: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: "normal",
  },

  closeBtn: {
    marginTop: "auto",
    marginBottom: 10,
    width: "100%",
  },

  selectButton: {
    maxHeight: Dimensions.get("screen").height / 12,
    borderColor: theme.colors.grey1,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
}));
