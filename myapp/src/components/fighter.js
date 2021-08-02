import React from 'react'

import fighter from '../assets/fighter.svg'
import union from '../assets/Union.svg'

import '../styles/global.css'

function Fighter(props) {
  return (
    <div>

      <img 
      className = "union"
      src = {union} 
      alt ="union" />
      
      <img
      className = "fighter"
      src = {fighter} 
      alt ="fither gamer" />

    </div>
  )
}

export default Fighter;






























