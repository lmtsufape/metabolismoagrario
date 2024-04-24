import { useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Crop } from "../types";

interface Props {
  items: Crop[];
  loading: boolean;
  onSelect: (value: string) => void;
}

export function DropdownSelect({ items, loading, onSelect }: Props) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const itemsParsed = items.map((i) => ({ label: i.name, value: i.id }));

  useEffect(() => {
    if (value) onSelect(value);
  }, [value]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={itemsParsed}
      setOpen={setOpen}
      setValue={setValue}
      searchable={true}
      disabled={loading}
      disabledStyle={{
        opacity: 0.5,
      }}
      style={{
        borderColor: theme.colors.grey3,
      }}
      itemSeparatorStyle={{ borderColor: theme.colors.grey3 }}
      containerStyle={{
        borderColor: theme.colors.grey3,
        borderWidth: 0,
        zIndex: 5000,
      }}
      searchTextInputStyle={{
        borderColor: theme.colors.grey3,
      }}
      dropDownContainerStyle={{
        borderColor: theme.colors.grey3,
      }}
      closeAfterSelecting={true}
      closeOnBackPressed={true}
      placeholder={loading ? "Carregando..." : "Selecione um item"}
      searchPlaceholder="Buscar..."
      translation={{
        NOTHING_TO_SHOW: "Nenhum item encontrado...",
      }}
    />
  );
}
