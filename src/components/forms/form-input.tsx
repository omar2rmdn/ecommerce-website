import { Form } from "react-bootstrap";
import type { Path, FieldValues, UseFormRegister } from "react-hook-form";

type Props<FieldValue extends FieldValues> = {
  label: string;
  name: Path<FieldValue>;
  register: UseFormRegister<FieldValue>;
  type?: string;
  error: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  success?: string;
  formText?: string;
};

export const FormInput = <FieldValue extends FieldValues>({
  type = "text",
  register,
  name,
  error,
  label,
  onBlur,
  success,
  formText,
}: Props<FieldValue>) => {
  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };

  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={`Enter ${label}`}
        {...register(name)}
        isInvalid={error ? true : false}
        isValid={success ? true : false}
        onBlur={blurHandler}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
      {formText && <Form.Text muted>{formText}</Form.Text>}
    </Form.Group>
  );
};
