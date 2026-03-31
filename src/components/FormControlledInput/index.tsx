import {
  FormControl,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Text,
} from "@gluestack-ui/themed";
import { Controller } from "react-hook-form";

type FormControlledInputProps = {
  control: any;
  name: string;
  placeholder: string;
  label?: string;
};

export function FormControlledInput({
  control,
  name,
  placeholder,
  label,
}: FormControlledInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl isInvalid={!!error} mb={3}>
          {label && (
            <FormControlLabel>
              <FormControlLabelText>
                <Text>
                  {label} {error && "*"}
                </Text>
              </FormControlLabelText>
            </FormControlLabel>
          )}
          <Input>
            <InputField
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
            />
          </Input>
          {error && (
            <FormControlErrorText>{error.message}</FormControlErrorText>
          )}
        </FormControl>
      )}
    />
  );
}
