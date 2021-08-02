import React from 'react'
//components
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


//css
import '../styles/room.css'
import '../styles/global.css'

export default class Room extends React.Component {
  

  constructor(props) {
    super(props);

    this.state = {
      games,
      name: "",
      type: "",
      host: "",
      date: "",
      image: "",
      editing: false,
      editingIndex: null
    };
  };

  submit = (eventDefault) => { //porque a declaração function não funciona?
    eventDefault.preventDefault();

    const {games, name, type, host, date, image, editing, editingIndex } = this.state

    this.setState({
      name: "",
      type: "",
      host: "",
      date: "",
      image: ""
     });

    if (editing) {
      const updatedGame = games.map((game, index) => {
        if (editingIndex === index) {
          game.name = name
          game.gameType = type
          game.hostType = host
          game.date = date
          game.image = image
        };

        return game;

      });

      this.setState({
        games: updatedGame,
        editing: false,
        editingIndex: null
      });

    } else {
      this.setState({
        games: [
          ...games,
          {
            name: name,
            gameType: type,
            hostType: host,
            date: date,
            image: image
          },
        ]
      });
    };

    this.setState({
      name: "",
      type: "",
      host: "",
      date: "",
      image: ""

    });

  };

  onDelete = (i) => {
    const {games} = this.state;
    if (window.confirm('você tem certeza que deseja excluir essa jogatina?')) {
      this.setState({
        games: games.filter((value, index) => index !== i)
      });
      
    };

  };


  render() {

    const {games, name, type, host, date, image } = this.state

    return (
  
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

          <form onSubmit = {this.submit}>
                <input 
                className = "first"
                placeholder = {name || "Nome do Jogo"}
                onChange = {(state)=> {
                  this.setState({
                    name: state.target.value
                  })
                }}/>
                <input
                className = "second"
                placeholder = {type || "Tipo da Partida"}
                onChange = {(state)=> {
                  this.setState({
                    type: state.target.value
                  })
                }}/>
                <input
                className = "third"
                placeholder = {date || "Data e Hora"}
                onChange = {(state) => {
                  this.setState({
                    date: state.target.value
                  })
                }}/>

                <input
                className = "fourth"
                placeholder = {image || "Url da Imagem"}
                onChange = {(state)=> {
                  this.setState({
                    image: state.target.value
                  })
                }}/>

                <input
                className = "five"
                placeholder = {host || "Tipo do Host"}
                onChange = {(state)=> {
                  this.setState({
                    host: state.target.value
                  })
                }}/>

                <button 
                className = 'agendar'
                type = "submit"> Agendar </button>
              </form>
          {games.map((game, index) => ( 
              <div  
                className = "game-wrapper">
                  <img
                  className = "border"
                  src = {border}
                  alt = "borda"/>
                  <img
                    className = "game"
                    src = {game.image}
                    alt = "game" >

                  </img>
                  
                  <text
                      className = "name"> {game.name} </text>

                  <img 
                    className = "calendar"
                    src = {calendar}
                    alt = "calendar icon" />

                  <text
                    className = "date"> {game.date} </text>
                  
                  <text
                        className = "type-game"> {game.gameType} </text>

                  <img 
                    className = "user"
                    src = {game.hostType === 'Visitante'? `${visitante}`: `${anfitriao}`} 
                    alt = "user icon" />

                  <img 
                        className = "line"
                        src = {line}
                        alt = "line"/>

                  <i class="fas fa-trash"
                    onClick = {()=> this.onDelete(index)}></i>
           
                  <i
                    onClick = {()=> {
                    this.setState({
                      editing: true,
                      editingIndex: index,
                      name: game.name,
                      type: game.gameType,
                      date: game.date,
                      image: game.image
                    })
                  }}
                  class="fas fa-edit"></i>
              </div>
              
          ))}

        </Background>
        
      </div>
    )
  }
}

