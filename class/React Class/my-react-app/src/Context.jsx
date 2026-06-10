// import { createContext } from "react";

//  let Context=   createContext()
//  export default Context

import React, { createContext, useReducer } from "react";
export const storeContext = createContext();
const initialState = {
      input:"",
      todos:[]
};
function reducer(store, action) {
    console.log(action,"acc");
    
    if(action.type=="Set_inp"){
        return{
            ...store,
            input:action.payload
        }
    }else if(action.type=="Add_todo"){
        return{
            ...store,
            todos:[...store.todos,store.input]
        }
    }else if(action.type=="DELET_TODO"){
        return{
            ...store,
            todos:store.todos.filter((a,b)=>{
                return b!==action.payload
            })
        }
    }else if(action.type=="UPDATE_TODO"){
        let newTodo=store.todos.map((a,b)=>{
            if(b==store.index){
                return store.input
            }else{
                return a
            }
        })
        return{
            ...store,
            todos:newTodo
        }
    }
}
const Context = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <storeContext.Provider value={{ store, dispatch }}>
      {children}
    </storeContext.Provider>
  );
};

export default Context;