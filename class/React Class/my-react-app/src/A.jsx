// import React from 'react'

// const A = ({Data}) => {
//   return (
//     <div>
//       <h2>A Page</h2>
//       <p>{Data}</p>
//     </div>
//   );
// }

// export default A;

import React from 'react'

const A = () => {
  let [count, setCount] = React.useState(0);
  function fun1() {
    setCount(count + 1);
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={fun1}>
        Click me
      </button>
    </div>
  )
}

export default A