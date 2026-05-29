// import React, { useEffect, useState } from 'react'

// const UseEffect = () => {
//     let [count,SetCount] = useState(0)

//     useEffect(()=>{
//         console.log("Hello world ! I am Harsh Golhani");
//     },[])
//   return (
//     <div>
//         <h2>{count}</h2>
//         <button onClick={()=>SetCount(count+1)}>Click</button>
//     </div>
//   )
// }

// export default UseEffect

// import React, { useState } from 'react'

// const UseStateEffect = () => {

//   let [count, SetCount] = useState(0)
//   let [city, SetCity] = useState("Indore")

//   return (
//     <div>
//       <h2>{count}</h2>
//       <h4>{city}</h4>

//       <button onClick={() => SetCity("Ujjain")}>
//         Change
//       </button>

//       <button onClick={() => SetCount(count + 1)}>
//         Click
//       </button>
//     </div>
//   )
// }

// export default UseStateEffect
// import React, { useState, useEffect } from 'react';

// const App = () => {
//   const [input, setInput] = useState(0);
//   const [city, setCity] = useState("Delhi");

//   useEffect(() => {
//     // console.log("useEffect called");

//     async function call() {
//       let res = await fetch("https://jsonplaceholder.typicode.com/posts");
//       let data = await res.json();
//       console.log(data);
//     }

//     call();

//   }, []);

//   return (
//     <div>
//       <h2>{input}</h2>
//       <p>City: {city}</p>

//       <button onClick={() => setCity("Mumbai")}>
//         Change City
//       </button>

//       <button onClick={() => setInput(input + 1)}>
//         +
//       </button>

//       <button onClick={() => setInput(input - 1)}>
//         -
//       </button>
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from 'react'

const UseStateEffect = () => {
  let [ApiData,setData]=useState({})
  useEffect=()=>{
    let [count,set]
  }
  return (
    <div>UseStateEffect</div>
  )
}

export default UseStateEffect