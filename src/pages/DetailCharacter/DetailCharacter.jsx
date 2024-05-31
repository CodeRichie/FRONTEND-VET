import { useEffect, useState } from "react";
import { bringAllCharacters, bringCharacterById, } from "../../services/apiCalls";
import Avatar from 'react-avatar';
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";


export const DetailCharacter = () => {
	const [detailCharacter, setDetailCharacter] = useState([]);
	let { id } = useParams()
	console.log('id', id)
	console.log('first', detailDoctor)
	const bringDetailedCharacter = () => {
		bringCharacterById(id)
			.then((res) => {
				setDetailCharacter(res);
			})
			.catch((error) => {
				console.log(error, "ups");
			});
	};

	useEffect(bringDetailedCharacter, [])

	return (
		<><Header /><div className="caractersDesign">
		</div></>
	);
};