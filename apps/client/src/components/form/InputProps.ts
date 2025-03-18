import { ControllerProps, FieldValues } from "react-hook-form";

export type InputProps<Values extends FieldValues> = Omit<
  ControllerProps<Values>,
  "render"
>;
