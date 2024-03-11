import { makeStyles } from "@rneui/themed";

export const useStyles = makeStyles((theme, { isKeyboardOpen }: { isKeyboardOpen: boolean }) => ({
  container: {
    backgroundColor: theme.colors.background,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: isKeyboardOpen ? "96%" : "70%",
  },
  formContainer: {
    width: "100%",
    marginVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  }
}));
