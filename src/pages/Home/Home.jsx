import React from 'react'
import "./Home.css";
import Header from "../../components/Header/Header";


export const Home = () => {
  return (
    <>
      <Header/>
      <div className='main'>
          <div className="overlay"></div>
          <img src="../src/images/TATTOOFONDO.jpg"></img>
          <div className="content">
              <p>Veterinaria Animals</p> 
          </div>
      </div>
    </>
  )
}