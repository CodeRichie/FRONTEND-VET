import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { updateAppointments, loginCall, bringAllUsersCall } from "../../../services/apiCalls";
import Header from "../../../components/Header/Header";
import { getUserData, isAuthenticated, amIAdmin, editUserData } from "../../../app/slices/userSlice";
import Modal from "react-bootstrap/Modal";

import "./BootstrapModal.css";



export const EditAppointments = ({ appointment, handleClose, handleUpdate }) => {
  const test = ''
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserData)
  const token = useSelector(isAuthenticated)
  const [users, setUsers] = useState()
  const user = userInfo;

  const validationSchema = Yup.object().shape({
    day_date: Yup.date()
      .required("La fecha es obligatoria"),
    description: Yup.string()
      .required("Descripción es obligatoria"),
    price: Yup.number().required("Precio es obligatorio"),

  });
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });


  const onSubmit = async (data) => {
    await updateAppointments(token, data, appointment.id);
    handleClose()
  };

  const getUsers = async () => {
    const _users = await bringAllUsersCall(token)
    setUsers(_users.data)
  }
  useEffect(() => {
    console.log('users', users)
    getUsers()
  }, [])
  useEffect(() => {
    console.log('token', token)
  }, [token])

useEffect(() => {
  console.log('appointment', appointment)
}, []);

  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='ms-auto'>Editar cita</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding: 0}}>
          <div className="edit-appointment-container w-200">
            <h1 className="title">Editar cita</h1>

              <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3 " controlId="formGroupEmail">
                  <Form.Label>Dia de la cita</Form.Label>
                  <Form.Control
                    type="date"
                    // placeholder={new Date(appointment?.day_date)}
                    defaultValue={new Date(appointment?.day_date).toLocaleDateString()}
                    placeholder={new Date(appointment?.day_date).toLocaleDateString()}
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
                    placeholder={appointment?.description}
                    defaultValue={appointment?.description}
                    {...register("description")}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={appointment?.price}
                    defaultValue={appointment?.price}
                    {...register("price")}
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={`${appointment?.client.user.firstName} ${appointment?.client.user.lastName}`}
                    disabled
                  />
                </Form.Group>
                <div className="d-grid my-5">
                  <Button variant="primary" size="lg" type="submit" onClick={handleUpdate}>
                    Editar
                  </Button>
                </div>
              </Form>

          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button className="regularButtonClass" variant="secondary" onClick={handleClose}>
            CANCELAR
          </Button>
          <Button className="regularButtonClass" variant="primary" onClick={handleUpdate}>
            GUARDAR
          </Button>
        </Modal.Footer> */}
      </Modal>

    </>
  );
};

