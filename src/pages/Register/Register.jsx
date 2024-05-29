import { useNavigate } from "react-router-dom";

import { registerNewUserCall } from "../../services/apiCalls";
import "./Register.css";
import Header from "../../components/Header/Header";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";


export const Register = () => {
  const navigate = useNavigate();
  const [errorOnSubmit, setErrorOnsubmit] = useState({exist: false, message: ''})

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Formato de email inválido")
      .required("Email es obligatorio"),
    firstName: Yup.string().required('First name is required'),
    password: Yup.string()
      .required("Password es obligatorio"),
    passwordConfirmation: Yup.string()
      .required("Confirmación de la contraseña es obligatorio")
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben ser iguales")
  });
  const {
    register,
    handleSubmit,
    formState: { errors}
  } = useForm({
    resolver: yupResolver(validationSchema)
  });
  
  const onSubmit = async(data) => {
    let answer
    try {
      answer = await registerNewUserCall(data);
    } catch ({response}) {
      setErrorOnsubmit({exist: true, message: data.message})
    }
    console.log('answer', answer)
      if (answer.status === 200) {
        navigate("/login", {state: {email: data.email}});
      }
  };

  return (
    <><Header />
    <div className="registerElementsDesign">
          <h1 className="title">CREA UNA CUENTA</h1>
          <h2 className="description">¿Eres nuevo? Regístrate y reserva tu primera cita.</h2>
          <Container>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Escriba su email..."
            {...register("email")}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Escriba su nombre..."
            {...register("firstName")}
            isInvalid={!!errors.firstName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            name="password"
            placeholder="Escriba su password..."
            {...register("password")}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPasswordConfirmation">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="text"
            name="passwordConfirmation"
            placeholder="Confirme su password..."
            {...register("passwordConfirmation")}
            isInvalid={!!errors.passwordConfirmation}
          />
          <Form.Control.Feedback type="invalid">
            {errors.passwordConfirmation?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid my-5">
          <Button variant="primary" size="lg" type="submit">
            Sign up
          </Button>
        </div>
      </Form>
    </Container>
    </div>
    {errorOnSubmit.exist && (<div>{errorOnSubmit.message}</div>)}
    </>
  );
};