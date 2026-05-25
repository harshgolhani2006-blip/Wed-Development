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


import React, { useState } from 'react';

const App = () => {
  const [color, setColor] = useState('red');

  function changeColor() {
    setColor('blue');
  }

  return (
    <div>
      <h2 style={{ backgroundColor: color }}>
        {color} text.
      </h2>

      <button onClick={changeColor}>
        Change Color
      </button>
    </div>
  );
};

export default App;