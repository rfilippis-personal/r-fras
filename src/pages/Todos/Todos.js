import { useState } from "react";
import "pages/Todos/Todos.scss";

const Posts = ({ scrollRef }) => {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([
    { id: 0, description: "Tomar café da manhã", status: true },
    { id: 1, description: "Estudar React", status: false },
    { id: 2, description: "Almoçar", status: false },
  ]);

  const inputTextHandle = (e) => {
    setInputText(e.target.value);
  };

  const addTodosHandle = () => {
    const _id = !todos.length ? 0 : todos.length;
    setTodos([...todos, { id: _id, description: inputText, status: false }]);
    setInputText("");
  };

  const statusTodoHandle = (_todo) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === _todo.id) {
          return {
            ...todo,
            status: !todo.status,
          };
        }
        return todo;
      })
    );
  };

  return (
    <div className="page-content">
      <div className="page-title">Todos</div>

      <div className="todos-container" id="todos-container">
        <div className="form-container">
          <input
            className="input-text"
            type="text"
            value={inputText}
            onChange={inputTextHandle}
          ></input>
          <button type="button" onClick={addTodosHandle}>
            add todo
          </button>
        </div>

        {todos &&
          todos.map((todo) => (
            <div className="todos" key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => statusTodoHandle(todo)}
                />
                <span className={todo.status ? "todo-done" : ""}>
                  {todo.description}
                </span>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
