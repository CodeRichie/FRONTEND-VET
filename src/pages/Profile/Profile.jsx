import { useEffect, useState } from "react";
import { updateProfile, bringProfile } from "../../services/apiCalls";
import { Container, Form, Button } from "react-bootstrap";
import BootstrapModal from "../../components/BootstrapModal/BootstrapModal";
import { useDispatch, useSelector } from "react-redux";
import {  getUserData, isAuthenticated, amIAdmin, editUserData } from "../../app/slices/userSlice";
import "./Profile.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Header from "../../components/Header/Header";
import sessionStorage from "redux-persist/es/storage/session";

export const Profile = () => {
  const userInfo = useSelector(getUserData)
  const hasAcces =  useSelector(isAuthenticated)
  const isAdmin = useSelector(amIAdmin)
  const dispatch = useDispatch();


  const token = userInfo.token;


  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

console.log('profileData', profileData)
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Firstname es obligatorio"),
    lastName: Yup.string(),
    phone: Yup.number(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors},
    reset
  } = useForm({
    defaultValues: {
      firstName: profileData.firstName,
      lastName: profileData.lastName ?? '',
      phone: profileData.phone,
    },
    resolver: yupResolver(validationSchema)
  });

  const fetchProfile = async () => {
    const myProfileData = await bringProfile(hasAcces);
    setProfileData(myProfileData);
  };

  useEffect(() => {
    fetchProfile();
  }, []);


useEffect(() => {
    if (profileData) {
        reset(profileData);
    }
}, [profileData]); 

  const onEditProfile = async(data) => {
    const answer = await updateProfile(data, hasAcces);
    if (answer.status === 200) {
      dispatch(editUserData({ userInfo: answer.data}))
      }
  };

  const onInputChange = (e) => {
    console.log('e', e)
  }

  return (
  <>
  <Header />
    <div className="profileElementsDesign">
  {/* <BootstrapModal profileData={profileData} token={token} handlerProp={onInputChange} /> */}
      <>
        <h1 className="title">MIS DATOS PERSONALES</h1>
        <h2 className="description">Desde aquí podrás actualizar siempre tus datos.</h2>
        <Form noValidate onSubmit={handleSubmit(onEditProfile)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="firstName"
            placeholder="Edite su nombre..."
            {...register("firstName")}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Edite su apellido..."
            {...register("lastName")}
            isInvalid={!!errors.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName?.message}
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            type="number"
            placeholder="Edite su telefono..."
            {...register("phone")}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid my-5">
          <Button variant="dark" size="lg" type="submit">
            Editar perfil
          </Button>
        </div>
      </Form>

      </>
    </div></>
  );
};
