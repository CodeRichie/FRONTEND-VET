import React from 'react'
import "./Home.css";
import Header from "../../components/Header/Header";


export const Home = () => {
  return (
    <>
      <Header/>
      <div className='main'>
          <img src="../src/images/mascotas.jpg"></img>
          <div className="content">
          <p>Veterinaria Animals</p> 
          </div>
      </div>
    </>
  )
}