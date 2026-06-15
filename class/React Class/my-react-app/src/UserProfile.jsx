import React from 'react'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
    let list=['A','B','C','D']


     let {id}=  useParams()
    let data= list.find((_,index)=>{
        return id==index
     })

  return (
    <div>{data}</div>
  )
}

export default UserProfile