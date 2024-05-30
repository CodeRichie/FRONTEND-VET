import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createAppointments, loginCall, bringAllUsersCall } from "../../../services/apiCalls";
import Header from "../../../components/Header/Header";
import { getUserData, isAuthenticated, amIAdmin, editUserData } from "../../../app/slices/userSlice";



export const CreateUserAppointments = () => {
  const test = ''
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserData)
  console.log('userInfo', userInfo)
  const token = useSelector(isAuthenticated)
  const [users, setUsers] = useState()
  const [userId, setUserId] = useState()

  const validationSchema = Yup.object().shape({
    day_date: Yup.date()
      .required("La fecha es obligatoria"),
    description: Yup.string()
      .required("Descripción es obligatoria"),

  });
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });


  const onSubmit = async (data) => {
    const newData={
      ...data, 
      price: 0,
      clientID: userId
    }
    await createAppointments(token, newData);
  };

  const getUsers = async () => {
    const _users = await bringAllUsersCall(token)
    const usersFiltered =  _users.data.filter((user)=>user.email !== userInfo.email)

    const user =  _users.data.filter((user)=> user.email !== userInfo.email)
    console.log('_users.find(', test)

    setUserId(user[0].id)
    setUsers(usersFiltered)
  }
  useEffect(() => {
    console.log('users', users)
    getUsers()
  }, [])
  useEffect(() => {
    console.log('token', token)
  }, [token])



  return (
    <>

      <div className="registerElementsDesign bg-secondary w-200">
        <h1 className="title">Crear cita</h1>
        <Container>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Dia de la cita</Form.Label>
              <Form.Control
                type="date"
                placeholder="Selecciona fecha..."
                {...register("day_date")}
                isInvalid={!!errors.day_date}
              />
              <Form.Control.Feedback type="invalid">
                {errors.day_date?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Que le sucede a su mascota?"
                {...register("description")}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description?.message}
              </Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Cliente</Form.Label>
              <Form.Select aria-label="Default select example"                  {...register("client")}
                isInvalid={!!errors.client}
>
                {users && users.map((user, index) => (
                  <option key={index} value={user.id}>{`${user.firstName} ${user.lastName}`}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.client?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-grid my-5">
              <Button variant="light" size="lg" type="submit">
                Crear
              </Button>
            </div>
          </Form>
        </Container>
      </div>
      </>
  );
};

