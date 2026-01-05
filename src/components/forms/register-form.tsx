import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegsiterSchema,
  type RegisterType,
} from "@/validations/register-schema";
import { FormInput } from "./form-input";
import { useEmailCheck } from "@/hooks/use-email-check";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(RegsiterSchema),
    mode: "onBlur",
  });

  const { available, checkEmail, emailInput, resetCheckEmail } =
    useEmailCheck();

  function submitForm(data: RegisterType) {
    console.log(data);
  }

  async function emailOnBlurHandler(e: React.FocusEvent<HTMLInputElement>) {
    await trigger("email");
    const { isDirty, invalid } = getFieldState("email");
    const value = e.target.value;

    if (isDirty && !invalid && emailInput !== value) {
      checkEmail(value);
    }

    if (isDirty && invalid && emailInput) {
      resetCheckEmail();
    }
  }

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h1>Create a New Account</h1>
        <Form onSubmit={handleSubmit(submitForm)}>
          <FormInput
            label="First Name"
            name="firstName"
            error={errors.firstName?.message as string}
            register={register}
          />

          <FormInput
            label="Last Name"
            name="lastName"
            error={errors.lastName?.message as string}
            register={register}
          />

          <FormInput
            label="Email"
            name="email"
            error={
              (errors.email?.message as string)
                ? available === "notAvailable"
                  ? "Email is already in use"
                  : ""
                : ""
            }
            register={register}
            type="email"
            onBlur={emailOnBlurHandler}
            formText={
              available === "checking" ? "Checking Email Availability" : ""
            }
            success={
              available === "available" ? "Emails is available for use" : ""
            }
          />

          <FormInput
            label="Password"
            name="password"
            error={errors.password?.message as string}
            register={register}
            type="password"
          />

          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            error={errors.confirmPassword?.message as string}
            register={register}
            type="password"
          />

          <Button
            disabled={available === "checking"}
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default RegisterForm;
