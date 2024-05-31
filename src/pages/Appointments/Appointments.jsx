import { useEffect, useState } from "react";
import { bringAllAppointmentsForDoctor, getUserById, bringAllAppointmentsForClient, bringAllAppointmentsForAdmin } from "../../services/apiCalls";
import Avatar from 'react-avatar';
import Header from "../../components/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthenticated, amIClient, amIDoctor, amIAdmin } from "../../app/slices/userSlice";
import { CreateAppointments } from "./CreateAppointments/CreateAppointments";
import { Button } from "react-bootstrap";
import './Appointments.css'
import { CreateUserAppointments } from "./CreateUserAppointments/CreateUserAppointments";
import Card from 'react-bootstrap/Card';

export const Appointments = () => {
	const [appointments, setAppointments] = useState([]);
	const [clients, setClients] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const hasAcces = useSelector(isAuthenticated)
	const isClient = useSelector(amIClient)
	const isDoctor = useSelector(amIDoctor)
	const isAdmin = useSelector(amIAdmin)

	const bringAllAppointments = async () => {
		let appointments
		console.log('isDoctor', isDoctor)
		console.log('isClient', isClient)
		console.log('isDoctor', isDoctor)
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
	}, []);

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
	return (
		<>
			<Header />
			<div className='container'>
				<div className="appointments-container">
					{loaded && appointments.map((appointment, index) => {
						return (
							
							<div key={index} className="appointment">
								
								{!isAdmin && (<div style={{ textAlign: 'left', display: 'flex', flexSirection: 'flexStart' }}>
									{
										`userid: ${appointment.client.id}`
										// findClient(appointment.client.id)
										// (`${appointment.client.data?.firstName} ${appointment.client.data?.lastName}`)
										// getUserData(appointment.client.id)
									}
								</div>)}

								<div style={{ display: 'flex', flexSirection: 'flexStart' }}>
									fecha: {new Date(appointment.day_date).toLocaleDateString()}

								</div>
								<div style={{ display: 'flex', flexSirection: 'flexStart' }}>
									precio: {appointment.price} €
								</div>
								<div style={{ display: 'flex', flexSirection: 'flexStart' }}>
									descripción: {appointment.description}
								</div>
							</div>
							
						)
					})}
				</div>

				{!isClient &&
				(<div className="create-appointment-container">
				<CreateAppointments />
			</div>)}
			</div>
		</>
	);
};