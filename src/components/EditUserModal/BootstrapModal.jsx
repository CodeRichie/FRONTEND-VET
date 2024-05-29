import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomInput } from "../CustomInput/CustomInput";
import { updateProfile } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import "./BootstrapModal.css";

function BootstrapModal({ profileData, inputHandler, token }) {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    // doble navigate para forzar a recargar el perfil en caso de no querer actualizar los datos,
    // para que llame de nuevo a la API y los recupere.
    //navigate("/");
    //  setTimeout(() => {
    //   navigate("/profile");
    //});

    console.log("close");
    setShow(false);
  };
  const handleUpdate = async () => {
    try {
      await updateProfile(profileData, token);
      console.log("usuario actualizado");
      setTimeout(() => {
        setShow(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button className="regularButtonClass" variant="primary" onClick={() => setShow(true)}>
        MODIFICAR
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edita tus datos!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomInput
            typeProp="text"
            nameProp="firstName"
            placeholderProp="first name"
            value={profileData?.firstName}
            isDisabled=""
            handlerProp={inputHandler}
          />
        <CustomInput
            typeProp="text"
            nameProp="lastName"
            placeholderProp="last name"
            value={profileData?.lastName}
            isDisabled=""
            handlerProp={inputHandler}
        />
          <CustomInput
            typeProp="email"
            nameProp="email"
            placeholderProp="email"
            value={profileData?.email}
            isDisabled="disabled"
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="phone"
            nameProp="phone"
            placeholderProp="phone"
            value={profileData?.phone}
            isDisabled=""
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="text"
            nameProp="role"
            placeholderProp="role"
            value={profileData?.role?.name}
            isDisabled="disabled"
            handlerProp={inputHandler}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="regularButtonClass" variant="secondary" onClick={handleClose}>
            CANCELAR
          </Button>
          <Button className="regularButtonClass" variant="primary" onClick={handleUpdate}>
            GUARDAR
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BootstrapModal;