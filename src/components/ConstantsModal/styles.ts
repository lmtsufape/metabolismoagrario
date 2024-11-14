import { makeStyles } from "@rneui/themed";

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "90%",
    paddingTop: theme.spacing.lg,
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
  submitButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    padding: 18,
  },
}));
