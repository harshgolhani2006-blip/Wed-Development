// import React, { useState } from 'react';

// const App = () => {
//   let [count, setCount] = useState(0);

//   function fun1() {
//     setCount(count + 1);
//   }
//   function fun2() {
//     setCount(count - 1);
//   }

//   return (
//     <div>
//       <h2>Count: {count}</h2>

//       <button onClick={fun1}>ADD</button>
//       <button onClick={fun2}>SUBTRACT</button>
//     </div>
//   );
// };

// export default App;


// import React, { useState } from 'react';

// const App = () => {
//   const [color, setColor] = useState('red');

//   function changeColor() {
//     setColor('blue');
//   }

//   return (
//     <div>
//       <h2 style={{ backgroundColor: color }}>
//         {color} text.
//       </h2>

//       <button onClick={changeColor}>
//         Change Color
//       </button>
//     </div>
//   );
// };

// export default App; 

//Props
// import React from 'react';
// import Home from './Home';

// const App = () => {
//   let user="Harsh";

//   return (
//     <div>
//       <Home Data={user}/>
//     </div>
//   );
// }
// export default App;

// import React from 'react';
// import Home from './Home';   // Import Home component

// const App = () => {
//   let [count, setCount] = React.useState(0);

//   function fun1() {
//     setCount(count + 1);
//   }

//   return (
//     <div>
//       <h2>{count}</h2>

//       <button onClick={fun1}>Click</button>

//       <Home />
//     </div>
//   );
// };

// export default App;

// import React, { useState } from 'react';

// const App = () => {
//   let [input, setInput] = useState("")
//   let [show, setShow] = useState("")
//   function fun1(e) {
//     //console.log(e.target.value);
//     setInput(e.target.value)
//     //console.log(input);

//   }
//   function done() {
//     setShow(input)
//   }
//   return (
//     <div>
//       <h2>{show}</h2>
//    <input type="text"  placeholder='Enter your name' onChange={fun1} onClick={()=>setInput("")} />
//    <button onClick={done}>show</button>
//    <button onClick={()=>setShow("")}>Clear</button>
//    </div>
//   )
// }

// export default App



// import React from 'react'
// import Form from './Form'

// const App = () => {
//   return (
//     <div>
//       <Form />
//     </div>
    
//   )
// }

// export default App

// import React from 'react'
// import UseStateEffect from './UseStateEffect'

// const App = () => {
//   return (
//     <div>
//       <UseStateEffect />
//     </div>
//   )
// }

// export default App

// import React from 'react'
// import Product from './Product'

// const App = () => {
//   return (
//     <div>
//       <Product/>
//     </div>
//   )
// }

// export default App

// Routing doc react-router-dom
// import React from 'react'
// import NavBar from './NavBar'
// import { Routes, Route } from 'react-router-dom'
// import Home from './Home'
// import Form from './Form'
// import Product from './Product'

// const App = () => {
//   return (
//     <>
//       <NavBar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/Form" element={<Form />} />
//         <Route path="/Product" element={<Product />} />
//       </Routes>
//     </>
//   )
// }

// export default App

// import React from 'react'
// import Todo from './Todos'

// const App = () => {
//   return (
//     <div>
//       <Todo />
//     </div>
//   )
// }

// export default App

// import { useEffect } from "react"
// import { useState } from "react"
// import React from 'react'
// import './App.css'
// const Cart = ({cart}) => {
//   return (
//     <div>
//           {
//         cart.map((a)=>{
//           return(<div id='main_card'>
//           <img   src={a.thumbnail}/>
//           {/* <h4>{a.title}</h4>
//           <h6>{a.price}</h6> */}

//           </div>)
//         })
//       }
//     </div>
//   )
// }

// export default Cart

// import React from 'react'
// import Todo from './Todo'

// const App = () => {
//   return (
//     <div>
//       <Todo/>
//     </div>
//   )
// }

// export default App

//It is use memo function which is used to optimize the performance of the component by memoizing the result of a function and only re-computing it when the dependencies change. It is used to avoid unnecessary re-renders of a component when the props or state have not changed. It takes two arguments, a function that returns a value and an array of dependencies. The function will only be re-evaluated when one of the dependencies has changed. This can help improve the performance of a component by reducing the number of times it needs to be re-rendered.
// import React, { useState } from 'react';
// import UseCounter from "./UseCounter";
// import { useMemo } from "react";

// const App = () => {
//   const { count, increment, decrement, reset } = UseCounter(0);
// //   let res=0
// //   function fun1(){
// //     for(let i=0;i<100000000;i++){
// //       res+=i
// //     }
// //    return res
// //   }
// //   let result=fun1()
// //   console.log(result);

// //solution of above problem is useMemo and useCallback hooks
// let total=useMemo(()=>{
//     let res=0
//     for(let i=0;i<100000000;i++){
//         res+=i
//         }
//         return res
// },[])
// console.log(total);
//   return (
//     <div>
//       <h1>{count}</h1>

//       <button onClick={increment}>++</button>
//       <button onClick={decrement}>--</button>
//       <button onClick={reset}>Reset</button>
//     </div>
//   );
// };

// export default App;

// import React, { useState, memo } from "react";

// const App = () => {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h1>{count}</h1>

//       <button onClick={() => setCount(count + 1)}>
//         Add
//       </button>
//       <M />
//     </div>
//   );
// };

// const M = memo(function () {
//   console.log("Hello");
//   return <h2>Memo Component</h2>;
// });

// export default App;


//Practice .
import React from 'react'
import A from './A'

const App = () => {
  return (
    <div>
      <A/>
    </div>
  )
}

export default App