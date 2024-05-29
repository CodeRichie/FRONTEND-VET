import { Fragment, useEffect, useState } from "react";
import { bringAllCharacters, bringCharacterById, } from "../../services/apiCalls";
import "./Characters.css";
import Avatar from 'react-avatar';
import Header from "../../components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';



export const Characters = () => {
	const [characters, setCharacters] = useState([]);
	const navigate = useNavigate()
	console.log('first', characters)
	const bringCharacters = () => {
		bringAllCharacters()
			.then((res) => {
				console.log(res, "res")
				setCharacters(res);
			})
			.catch((error) => {
				console.log(error, "ups");
			});
	};

	useEffect(() => {
		bringCharacters()
	}, [])

	return (
		<><Header /><div className="charactersDesign">
			<ol>
				{characters.map(({ user, userID, id }) => {
					return (
						<div key={`${userID} + ${id}`} onClick={() => navigate(`/characters/${userID}`, { replace: true })} className="cardCharacter">
							<Avatar size={50} round="50px" name={user.firstName} />
							<div className="contactDesign">
								<div className="contactName">
									<p className="firstName">{user.firstName}</p>
								</div>
								<div className="contactData">
									<p className="phone">{user.phone}</p>
									<p className="email">{user.email}</p>
								</div>
							</div>
						</div>
					);
				})}

			</ol>
		</div></>
	);
};

