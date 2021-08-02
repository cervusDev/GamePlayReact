import React from 'react'
import { useHistory } from 'react-router-dom'


import { Background } from '../components/background'
import { Console } from '../components/console'
import { Button } from '../components/button'
import Fighter from '../components/fighter'

import discord from '../assets/discord.svg'
import line from '../assets/divisor.svg'

import "../styles/home.css"
import '../styles/global.css'



function Home() {
  const history = useHistory();

  function navigateToRoom() {
    history.push('/room')
  }
  return (

    <div className= "home">

      <Console className = "console"/>

      <Background className = "background">

      <Fighter/>

      </Background>

      <main>

        <div className = "hellow">
          
          <p>Conecte-se e organize suas</p>
          <p className = "secondrow">jogatinas</p>

        </div>

        <div className = "button">

          <Button
           onClick = {navigateToRoom}
           type = "submit">

            <img

            className = "line"
            src= {line} 
            alt="line" />

            <i class="fab fa-google"></i>
            
            <p>Entrar com Google</p>

          </Button>
        </div>
      </main>
    </div>
    
  )
}

export default Home;

