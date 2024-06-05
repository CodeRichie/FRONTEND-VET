import { useEffect, useState } from "react";
import { bringAllAppointmentsForDoctor, getUserById, bringAllAppointmentsForClient, bringAllAppointmentsForAdmin, deleteAppointments } from "../../services/apiCalls";
import Avatar from 'react-avatar';
import Header from "../../components/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthenticated, amIClient, amIDoctor, amIAdmin } from "../../app/slices/userSlice";
import { CreateAppointments } from "./CreateAppointments/CreateAppointments";
import { EditAppointments } from "./EditAppointments/EditAppointments";
import { Button } from "react-bootstrap";
import './Appointments.css'
import { CreateUserAppointments } from "./CreateUserAppointments/CreateUserAppointments";
import Card from 'react-bootstrap/Card';

export const Appointments = () => {
	const [appointments, setAppointments] = useState([]);
	const [appointment, setAppointment] = useState();
	const [clients, setClients] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const hasAcces = useSelector(isAuthenticated)
	const isClient = useSelector(amIClient)
	const isDoctor = useSelector(amIDoctor)
	const isAdmin = useSelector(amIAdmin)
	const [isModalOpened, setIsModalOpened] = useState(false)

	const bringAllAppointments = async () => {
		let appointments

		if (isDoctor) {
			appointments = await bringAllAppointmentsForDoctor(hasAcces)
		}
		if (isClient) {
			appointments = await bringAllAppointmentsForClient(hasAcces)
		}
		if (isAdmin) {
			appointments = await bringAllAppointmentsForAdmin(hasAcces)
		}

		setAppointments(appointments);
	};

	const getUserData = async (id) => {
		const user = await getUserById(id, hasAcces)
		return user.data
	}

	useEffect(() => {
		bringAllAppointments()
	}, [isModalOpened]);

	useEffect(() => {
		if (appointments && !isAdmin) {
			appointments.forEach((appointment) => {
				getUserData(appointment.client.id)
					.then((client) => {
						setClients(_clients => [..._clients, client])
					})

			})
		}
	}, [appointments])

	useEffect(() => {
		if (clients.length > 0 || isAdmin) {
			setLoaded(true)
		}
	}, [clients])

	const findClient = (clientID) => {
		const client = clients.find((client) => client.id === clientID)


		// return client.id
	}

	const onEditAppointment = (appointment) => {
		setIsModalOpened(!isModalOpened)
		setAppointment(appointment)
	}
	const onDeleteAppointment = async (appointment) => {
		await deleteAppointments(hasAcces, appointment);
		bringAllAppointments()
	}
	const handleUpdate = () => {
		setAppointment()
	}
	const handleClose = () => {
		setIsModalOpened(!isModalOpened)
		setAppointment()
	}
	return (
		<>
			<Header />
			<div className='container'>
				<div className="appointments-container">
					{loaded && appointments.map((appointment, index) => {
						return (
							<>
								{!isClient && isAdmin && (
									<div className="icons">
										<a className="icon editIcon" onClick={() => onEditAppointment(appointment)}>
											<img
												src="../src/images/edit.svg"
												width="18"
												height="18"
												className="d-inline-block align-top"
												alt="React Bootstrap logo"
											/>
										</a>
										<a className="icon deleteIcon" onClick={() => onDeleteAppointment(appointment.id)}>
											<img
												src="../src/images/delete.svg"
												width="18"
												height="18"
												className="d-inline-block align-top"
												alt="React Bootstrap logo"
											/>
										</a>
									</div>
								)}
								<div key={index} className="appointment">

									{isAdmin && (
										<div className="appointment-data">
											{
												`Usuario: ${appointment?.client.user.firstName} ${appointment?.client.user.lastName}`
											}
										</div>
									)}

									<div className="appointment-data">
										Fecha: {new Date(appointment.day_date).toLocaleDateString()}
									</div>
									<div className="appointment-data">
										Precio: {appointment.price} €
									</div>
									<div className="appointment-data">
										Descripción: {appointment.description}
									</div>
								</div>
							</>
						)
					})}
				</div>

				{!isClient &&
					(<div className="create-appointment-container">
						<CreateAppointments onCreate={bringAllAppointments} />
						{isModalOpened && <EditAppointments appointment={appointment} handleClose={handleClose} />}
					</div>)}
			</div>
		</>
	);
};