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

import React from 'react'

const App = () => {
  //let count=0;
  let [count, setCount] = React.useState(0);
  
  function fun1() {
    setCount(count + 1);
    //count++;
  }
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={fun1}>Click</button>
      <Home/>
    </div>
  )
}
export default App