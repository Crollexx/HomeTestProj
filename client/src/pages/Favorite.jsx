import React, { useState } from 'react'
import { useParams } from 'react-router-dom'


function Favorite(cards, setCards, user, setUser) {
const {id} = useParams()
const [card, setCard] = useState([])

const addFavorite = (card) => {
  setCards([...cards, card])
}

  return (


    <div>Favorite</div>
    
  )
}

export default Favorite