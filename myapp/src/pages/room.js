// React Libs
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; 

// React Components
import { Background } from "../components/background";  
import { Console } from "../components/console";
import {Button} from '../components/button'
import { games } from '../models/database';


//images
import self from "../assets/self.svg"
import rectangle from "../assets/rectangle.svg"
import rankicon from '../assets/rankicon.svg'
import duel from '../assets/duel.svg'
import funny from '../assets/funny.svg'
import border from '../assets/border.svg'

import plus from '../assets/plus.svg'
import calendar from '../assets/calendar.svg'
import anfitriao from '../assets/anfitriao.svg'
import visitante from '../assets/visitante.svg'
import line from '../assets/line.svg'


// css components
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// css pages
import '../styles/room.css'
import '../styles/global.css'

function Room() {

  const [isGames, setGames] = useState(games);

  const [isName, setName] = useState("");
  const [isMatch, setMatch] = useState("");
  const [isHost, setHost] = useState("");
  const [isDate, setDate] = useState("");
  const [isImage, setImage] = useState("");

  const [isEditing, setEditing] = useState(false);
  const [isIndex, setIndex] = useState(null);

  useEffect(() => {
    if (isIndex !== null && isEditing) {
      setName(isGames[isIndex].name);
      setMatch(isGames[isIndex].match);
      setHost(isGames[isIndex].host);
      setDate(isGames[isIndex].date);
      setImage(isGames[isIndex].image);
    }
  }, [isIndex,isEditing, isGames]);


  function onSubmit(event) {

    event.preventDefault();

    if (isEditing) {

      const updateGames = isGames.map((value, index) => {

        if (isIndex === index) {

          value.name = isName;
          value.match = isMatch;
          value.host = isHost;
          value.date = isDate;
          value.image = isImage;

        }; 
        return value;
      });

      setGames(updateGames);
      setEditing(false);
      setIndex(null);
    } else {
      setGames([
        ...isGames,
        {
          name: isName,
          match: isMatch,
          host: isHost,
          date: isDate,
          image: isImage,
        }
      ]);
    }
    setName("");
    setMatch("");
    setHost("");
    setDate("");
    setImage("");
  };

  function onDelete(index) {
    setGames(isGames.filter((value, i) => i !== index));
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "-80px",
    slidesToShow: 1,
    speed: 500,
    rows: 3,
    slidesPerRow: 1
  };


  return(
    <div id = "room">
    <Console className = "console"/>
    
    <Background className = "background">

    <header>

        <img 
        src= {self} 
        alt="" />

        <p> Olá,</p> <p className= "name">Tiago</p>
        <text> Hoje é dia de vitória</text>

        <Button 
          className = "button">
          <img 
          className = "plus"
          src = {plus}
          alt = "plus"/>
        </Button>
      </header>

      <section>
        <div className = "categories">
          <img 
          className = "first-rectangle" 
          src = {rectangle} 
          alt = "rectangle"/>
          <text
          className = "first-text">Ranqueada</text>

          <img 
          className = "second-rectangle" 
          src = {rectangle} 
          alt = "rectangle" />
          <text
          className = "second-text">Treinamento</text>

          <img 
          className = "third-rectangle" 
          src = {rectangle} 
          alt = "rectangle" />
          <text
          className = "third-text"> Diversão </text>

          <img 
          className = "ranked"
          src = {rankicon} 
          alt = "troféu" />

          <img 
          className = "duel" 
          src = {duel}
          alt = "duel"/>

          <img
          className = "funny"
          src = {funny}
          alt = "funny"/>
        </div>

        <p className = "agenda"> Partidas agendadas</p> 
      </section>

      <form onSubmit = {onSubmit}>

            <input 
            className = "first"
            value = {isName}
            placeholder = "Nome do jogo"
            onChange = {(event) => {
              setName(event.target.value);
            }} />

            <input
            className = "second"
            value = {isMatch}
            placeholder = "Tipo de partida"
            onChange = {(event) => {
              setMatch(event.target.value);
            }} />
            <input
            className = "third"
            value = {isDate}
            placeholder = "Data da partida"
            onChange = {(event) => {
              setDate(event.target.value);
            }}/>

            <input
            className = "fourth"
            value = {isImage}
            placeholder = "Url da imagem"
            onChange = {(event) => {
              setImage(event.target.value);
            }} />

            <input
            className = "five"
            value = {isHost}
            placeholder = "Tipo de host"
            onChange = {(event) => {
              setHost(event.target.value);
            }} />

            <button 
            className = 'agendar'
            type = "submit"> Agendar </button>

          </form>

      <Slider {...settings}>

      {isGames.map((game, index) => ( 
        <div
          className = "game-wrapper">

          <img
          className = "border"
          src = {border}
          alt = "borda"/>

          <img
            className = "game"
            src = {game.image}
            alt = "game" />

          <text
            className = "name"> {game.name} </text>
          

          <img 
            className = "calendar"
            src = {calendar}
            alt = "calendar icon" />

          <text
            className = "date"> {game.date} </text>

          <text
            className = "type-game"> {game.match} </text>
          <img 
            className = "user"
            src = {game.host === 'Visitante'? `${visitante}`: `${anfitriao}`} 
            
            alt = "user icon" />


          <img 
            className = "line"
            src = {line}
            alt = "line"/>

          <i class="fas fa-trash"
             onClick = {()=> onDelete(index)}></i>
       
          <i

            onClick = {() => {
              setEditing(true);
              setIndex(index);
            }}

          class="fas fa-edit"></i>

        </div>
          
      ))}

      </Slider>

    </Background>
    
  </div>
  );
};

export default Room;