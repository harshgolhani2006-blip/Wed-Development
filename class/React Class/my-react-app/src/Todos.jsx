// import React, { useEffect, useState } from "react";
// import "./Todo.css";

// const Todo = () => {
//   const [task, setTask] = useState("");
//   const [todos, setTodos] = useState(()=>{
//     let data=  localStorage.getItem("key")
//     if(data){
//         return JSON.parse(data)
//     }
//     return []
//   });
//   useEffect(()=>{
//     localStorage.setItem("key",JSON.stringify(todos))
//   },[todos])
//   return (
//     <div className="container">
//       <h1>Todo List</h1>

//       <div className="input-box">
//         <input
//           type="text"
//           name="task"
//           value={task}
//           placeholder="Enter a task"
//           onChange={(e)=>setTask(e.target.value)}
  
//         />

// <button onClick={()=>setTodos([...todos,task])}>add</button>
//       </div>
//       <div className="todo-list">
//         {todos.map((todo, index) => (
//           <div className="todo-item" key={index}>
//             <span>{todo}</span>

//             <div className="actions">
//               <button >
//                 Edit
//               </button>

//               <button >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Todo;


import React, { useEffect, useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    const data = localStorage.getItem("key");
    return data ? JSON.parse(data) : [];
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("key", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = task;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, task]);
    }

    setTask("");
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEdit = (index) => {
    setTask(todos[index]);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={handleAdd}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <div className="todo-list">
        {todos.map((todo, index) => (
          <div className="todo-item" key={index}>
            <span>{todo}</span>

            <div className="actions">
              <button onClick={() => handleEdit(index)}>
                Edit
              </button>

              <button onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;













