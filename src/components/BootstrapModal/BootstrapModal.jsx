import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomInput } from "../CustomInput/CustomInput";
import { updateProfile } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import "./BootstrapModal.css";

function BootstrapModal({ profileData, formInputs, inputHandler, token }) {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    // doble navigate para forzar a recargar el perfil en caso de no querer actualizar los datos,
    // para que llame de nuevo a la API y los recupere.
    //navigate("/");
    //  setTimeout(() => {
    //   navigate("/profile");
    //});

    setShow(false);
  };
  const handleUpdate = async () => {
    try {
      await updateProfile(profileData, token);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  }

  // const formInputs = [
  //   {type: 'date', name: 'date', placeholder: 'Select a date', value: date, isDisabled: false,onChange: dateHandler},
  //   {type: 'text', name: 'description', placeholder: 'Description', value: description, isDisabled: false,onChange: descriptionHandler},
  //   {type: 'number', name: 'price', placeholder: 'Price', value: price, isDisabled: false,onChange: priceHandler},
  //   {type: 'text', name: 'client', placeholder: 'Client', value: client, isDisabled: false,onChange: clientHandler},
  // ]

  return (
    <>
      <Button className="regularButtonClass" variant="primary" onClick={() => setShow(true)}>
        MODIFICAR
      </Button>

      {show && (

        <>
          <Modal>
            <Modal.Header closeButton>
              <Modal.Title>Edita tus datos!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
          {formInputs.map(input => {
            return (
              <CustomInput
                typeProp={input.type}
                nameProp={input.name}
                placeholderProp={input.placeholder}
                value={input.value}
                isDisabled={input.isDisabled}
                handlerProp={input.onChange}
              />
            )
          })}
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

      )}
    </>
  );
}

export default BootstrapModal;