import React from "react";
import clsx from "clsx";
import "./styles.css";
import initList from "./initTodos";

const TodoView = ({ todo, onToggle }) => {
  const mystyle = clsx({
    ischecked: todo.finished,
    notchecked: !todo.finished
  });
  return (
    <li>
      <label htmlFor={todo.title} className={mystyle}>
        <input
          type="checkbox"
          id={todo.title}
          defaultChecked={todo.finished}
          onChange={() => onToggle(todo.id)}
        />
        {todo.title}
      </label>
    </li>
  );
};

const TodoListView = ({ todoList, onhandleToggle }) => {
  return (
    <ul>
      {todoList &&
        todoList.map((todo) => (
          <TodoView todo={todo} key={todo.id} onToggle={onhandleToggle} />
        ))}
    </ul>
  );
};

function NewTodo({ onhandleAddTodo }) {
  const [newElt, setNewElt] = React.useState("");
  console.log(newElt);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onhandleAddTodo({ title: newElt, id: Math.random(), finished: false });
        setNewElt("");
      }}
    >
      <input
        type="text"
        value={newElt}
        onChange={(e) => setNewElt(e.target.value)}
      />
      <input type="submit" value="New" />
    </form>
  );
}

function TodoCount({ count }) {
  return <h3>Prop lift: UnFinished todos count: {count}</h3>;
}

const AppV3PropLift = () => {
  const [todos, setTodos] = React.useState(initList);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setCount(todos.filter((todo) => todo.finished === false).length);
  }, [todos]);

  function handleToggle(id) {
    setTodos((previous) => {
      const foundId = previous.findIndex((todo) => todo.id === id);
      const todoAtFoundId = previous[foundId];
      const newTodos = [...previous];
      newTodos[foundId] = {
        ...todoAtFoundId,
        finished: !todoAtFoundId.finished
      };
      return newTodos;
    });
  }

  function handleAddTodo(todo) {
    setTodos((previous) => {
      return [...previous, todo];
    });
  }

  return (
    <div>
      <TodoCount count={count} />
      <NewTodo onhandleAddTodo={handleAddTodo} />
      <TodoListView todoList={todos} onhandleToggle={handleToggle} />
    </div>
  );
};

export default AppV3PropLift;
