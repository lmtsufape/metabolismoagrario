import { Input, InputProps } from "@rneui/themed";

type Props = InputProps & {
  onChange: (value: string) => void;
};

export function NumericInput({ onChange, ...props }: Props) {
  function parseChangedText(text: string) {
    let newText = "";
    let numbers = "0123456789.,";

    for (let i = 0; i < text.length; i++) {
      // found valid char
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];

        if (text[i] === ".") {
          numbers = "0123456789";
        }
        if (text[i] === ",") {
          numbers = "0123456789";
          newText = newText.replace(",", ".");
        }
      }
      // else {
      //   alert("please enter numbers only");
      // }
    }

    return newText;
  }

  return (
    <Input
      label="Produção colhida (t de massa fresca)"
      {...props}
      keyboardType="numeric"
      onChangeText={(t) => onChange(parseChangedText(t))}
    />
  );
}
