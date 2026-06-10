import React from 'react'
import './App.css'
const Cart = ({cart}) => {
  return (
    <div>
          {
        cart.map((a)=>{
          return(<div id='main_card'>
          <img   src={a.thumbnail}/>
          {/* <h4>{a.title}</h4>
          <h6>{a.price}</h6> */}

          </div>)
        })
      }
    </div>
  )
}

export default Cart