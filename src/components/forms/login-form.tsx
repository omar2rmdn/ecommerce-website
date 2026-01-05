import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "./form-input";
import { LoginSchema, type LoginType } from "@/validations/login-schema";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
  });

  function submitForm(data: LoginType) {
    console.log(data);
  }

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h1>Login to Your Account</h1>
        <Form onSubmit={handleSubmit(submitForm)}>
          <FormInput
            label="Email"
            name="email"
            error={errors.email?.message as string}
            register={register}
            type="email"
          />

          <FormInput
            label="Password"
            name="password"
            error={errors.password?.message as string}
            register={register}
            type="password"
          />

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default LoginForm;
