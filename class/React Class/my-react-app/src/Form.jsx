import React, { useState } from 'react'
import './App.css'

const Form = () => {

  let [input, SetInput] = useState({
    name: "",
    email: "",
    passWord: ""
  })

  function fun1(e) {
    let { name, value } = e.target

    SetInput({
      ...input,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    console.log(input)

    alert("Form Submitted Successfully")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <h2>Login Form</h2>

        <input
          type='text'
          name='name'
          value={input.name}
          onChange={fun1}
          placeholder='Enter your name'
        />

        <input
          type='email'
          name='email'
          value={input.email}
          onChange={fun1}
          placeholder='Enter your email'
        />

        <input
          type='password'
          name='passWord'
          value={input.passWord}
          onChange={fun1}
          placeholder='Enter your password'
        />

        <button type='submit'>
          Submit
        </button>

      </form>
    </div>
  )
}

export default Form