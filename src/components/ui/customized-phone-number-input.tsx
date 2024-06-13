import { ControllerRenderProps } from "react-hook-form";
import { PhoneInput } from "./phone-input";
import ua from "react-phone-number-input/locale/ua";

export default function CustomizedPhoneNumberInput({
  field,
}: {
  field: ControllerRenderProps<any, "phoneNumber">;
}) {
  return (
    <PhoneInput
      {...field}
      id="phoneNumber"
      labels={ua}
      countries={["UA"]}
      defaultCountry="UA"
      placeholder="000 000 0000"
      international={false}
    />
  );
}
