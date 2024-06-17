import { Icon, Text, makeStyles, useTheme } from "@rneui/themed";
import { View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

interface DataShape {
  label: string;
  id: string;
}

interface Props {
  list: DataShape[];
  selectedItem: string | null;
  onSelect: (selectedItem: string) => void;
}

export function Select({ list, selectedItem, onSelect }: Props) {
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <SelectDropdown
      data={list}
      onSelect={(selectedItem: DataShape, index) => {
        onSelect(selectedItem.id);
      }}
      defaultValueByIndex={list.findIndex((item) => item.id === selectedItem)}
      renderButton={(item, isOpened) => {
        return (
          <View style={styles.dropdownButton}>
            <Text style={styles.dropdownButtonTxt}>{(item && item.label) || "Selecionar"}</Text>
            <Icon name={isOpened ? "keyboard-arrow-up" : "keyboard-arrow-down"} type="material" />
          </View>
        );
      }}
      renderItem={(item: DataShape, index, isSelected) => {
        return (
          <View style={{ ...styles.dropdownItem, ...(isSelected && { backgroundColor: theme.colors.grey0 }) }}>
            <Text style={{ fontSize: 16 }}>{item.label}</Text>
          </View>
        );
      }}
      dropdownStyle={{
        borderRadius: theme.spacing.md,
      }}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  dropdownButton: {
    width: "100%",
    height: 50,
    backgroundColor: theme.colors.searchBg,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxt: {
    fontSize: 18,
    fontWeight: "500",
  },
  dropdownItem: {
    padding: 12,
    fontSize: 16,
  },
}));
