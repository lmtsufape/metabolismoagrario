import { useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

interface Props {
  items: { label: string; id: string }[];
  onSelect: (value: string) => void;
}

export function DropdownSelect({ items, onSelect }: Props) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (value) onSelect(value);
  }, [value]);

  return (
    <DropDownPicker
      schema={{
        label: "label",
        value: "id",
      }}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      // loading={true}
      searchable={true}
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
      placeholder="Selecione um item"
      searchPlaceholder="Buscar..."
      translation={{
        NOTHING_TO_SHOW: "Nenhum item encontrado...",
      }}
    />
  );
}
