// React Libs
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; 
import ReactTooltip from 'react-tooltip';

// React Components
import { Background } from "../components/background";  
import { Console } from "../components/console";
import {Button} from '../components/button'

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

const BASE_URL = "http://localhost:5000";

function Room() {


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

  const [isGames, setGames] = useState([]);

  const [isName, setName] = useState("");
  const [isMatch, setMatch] = useState("");
  const [isHost, setHost] = useState("");
  const [isDate, setDate] = useState("");
  const [isImage, setImage] = useState("");

  const [isEditing, setEditing] = useState(false);
  const [isId, setId] = useState(null);

  async function loadingAll() {
    const response = await fetch(`${BASE_URL}/games`);
    const data = await response.json();

    setGames(data);
  }

  useEffect(()=> {
    loadingAll();
  }, []);

  useEffect(() => {
    if (isId !== null && isEditing) {
      const game = isGames.find(value => value._id === isId);
      
      setName(game.name);
      setMatch(game.match);
      setHost(game.host);
      setDate(game.date);
      setImage(game.image);
    }
  }, [isId,isEditing, isGames]);


  async function onSubmit(event) {

    event.preventDefault();

    if (isEditing) {

      await fetch(`${BASE_URL}/update/${isId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: isName,
          match: isMatch,
          host: isHost,
          date: isDate,
          image: isImage
        }),

      });

      setEditing(false);
      setId(null);

    } else {
      await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: isName,
          match: isMatch,
          host: isHost,
          date: isDate,
          image: isImage
        }),

      });
    }

    loadingAll();

    setName("");
    setMatch("");
    setHost("");
    setDate("");
    setImage("");
  };

  async function onDelete(id) {
    await fetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",
    });
    loadingAll();
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
              data-tip 
              data-for = "date"
              className = "calendar"
              src = {calendar}
              alt = "calendar icon" />
            <ReactTooltip
            id = "date"
            type = "error"
            effect = "solid">
              <span> Data da partida </span>
            </ReactTooltip>

            <text
              data-tip
              className = "date"> {game.date} </text>


            <text
              data-tip
              data-for = "match"
              className = "type-game"> {game.match} </text>

            <ReactTooltip
            id = "match"
            type = "error"
            effect = "solid">
              <span> Tipo da partida </span>
            </ReactTooltip>
            <img
              data-tip 
              data-for = "user"
              className = "user"
              src = {game.host === 'Visitante'? `${visitante}`: `${anfitriao}`} 
              
              alt = "user icon" />
            <ReactTooltip
            id = "user"
            type = "error"
            effect = "solid">
              <span> Tipo do host </span>
            </ReactTooltip>

            <img 
              className = "line"
              src = {line}
              alt = "line"/>  

              <i 
              class="fas fa-trash"
              data-tip
              data-for = "trash"
              onClick = {()=> onDelete(game._id)}></i>
            <ReactTooltip
            id = "trash"
            type = "error"
            effect = "solid">
              <span> deletar</span>
            </ReactTooltip>
        
            <i
                data-tip
                data-for = "update"
                onClick = {() => {
                setEditing(true);
                setId(game._id);
              }}

            class="fas fa-edit"></i>
            <ReactTooltip
            id = "update"
            type = "error"
            effect = "solid">
              <span> atualizar  </span>
            </ReactTooltip>

          </div>
            
        ))}

      </Slider>

    </Background>
    
  </div>
  );
};

export default Room;