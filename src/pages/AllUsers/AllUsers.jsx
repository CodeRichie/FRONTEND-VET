import { Fragment, useEffect, useState } from "react";
import { bringAllCharacters, bringCharacterById, getAllUsers, } from "../../services/apiCalls";
import "./AllUsers.css";
import Avatar from 'react-avatar';
import Header from "../../components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, amIClient, amIDoctor, amIAdmin } from "../../app/slices/userSlice";

import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { useSelector } from "react-redux";



export const AllUsers = () => {
	const [users, setUsers] = useState([]);
	const hasAcces = useSelector(isAuthenticated)

	const bringUsers = () => {
		getAllUsers(hasAcces)
			.then((res) => {
				console.log(res, "res")
				setUsers(res);
			})
			.catch((error) => {
				console.log(error, "ups");
			});
	};

	useEffect(() => {
		bringUsers()
	}, [])

	return (
		<>
			<Header />
			{<div className="charactersDesign">
				<ol>
					{users.map(({ email, firstName, lastName, phone, id }) => {
						return (
							<div key={id} className="cardCharacter">
								<Avatar size={50} round="50px" name={firstName} />
								<div className="contactDesign">
									<div className="contactName">
										<p className="firstName">{`${lastName}, ${firstName}`}</p>
									</div>

									<div className="contactData">
										<p className="phone">{phone}</p>
										<p className="email">{email}</p>
									</div>
								</div>
							</div>
						);
					})}

				</ol>
			</div>}
		</>
	);
};

