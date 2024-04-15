import { makeStyles } from "@rneui/themed";

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "90%",
  },
  formContainer: {
    width: "100%",
    marginVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  constantContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
}));
