import { CultivarConstant, PPL_Constants } from "@/types/CultivarConstants";
import { PPL_CONSTANTS_PT_BR } from "@/utils/pplConstantsToPT_BR";
import { Button, Text, makeStyles, useTheme } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import ReactNativeModal from "react-native-modal";

interface Props {
  constantType: keyof PPL_Constants;
  onChange: (value: string) => void;
  constants: CultivarConstant[];
}
export function ConstantSelector({ constantType, constants, onChange }: Props) {
  const { theme } = useTheme();
  const styles = useStyles();
  const [isOpen, setOpen] = useState(false);

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <Button onPress={() => setOpen(true)} type="clear" icon={{ name: "edit", type: "font-awesome5" }}></Button>
      <ReactNativeModal
        isVisible={isOpen}
        style={{ margin: theme.spacing.md }}
        onDismiss={closeModal}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
      >
        <View style={styles.container}>
          <Text h4 style={{ textAlign: "center" }}>
            Escolher constante - {PPL_CONSTANTS_PT_BR[constantType]}
          </Text>
          <ScrollView style={{ width: "100%", marginVertical: theme.spacing.lg }}>
            {constants.map((constant) => (
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

            {constants.length === 0 && (
              <Text style={{ textAlign: "center", fontSize: 16 }}>Nenhuma constante cadastrada...</Text>
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
    height: "70%",
  },
  constantCard: {
    borderBottomColor: theme.colors.grey3,
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: theme.spacing.lg,
  },
  infoContainer: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginVertical: theme.spacing.xs,
  },
  closeBtn: {
    marginTop: "auto",
  },
}));
