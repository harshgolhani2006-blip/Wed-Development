import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserList = () => {
    let list=['A','B','C','D']
 let navigate=   useNavigate()
    function fun1(id){
        // console.log(id);
        navigate(`/profile/${id}`)  

    }
   
  return (
    <div className='p-5'>
      {list.map((data,id)=>{
        return(<>
        <h2 className='text-xl font-bold text-red-500' key={id}>{data}</h2>
      
        <button className='bg-blue-500 text-white p-2 rounded' onClick={()=>fun1(id)}>show</button>
     
        </>)
    })}
        </div>
  )
}

export default UserList