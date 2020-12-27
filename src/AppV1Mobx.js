import React from "react";
import { observer } from "mobx-react-lite";
import { configure } from "mobx";
import todosList from "./mobx-store.js";
import clsx from "clsx";
import "./styles.css";

configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});

const NewTodo = observer(() => {
  const [newElt, setNewElt] = React.useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        todosList.addTodo({
          title: newElt,
          id: Math.random(),
          finished: false,
        });
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
});

const TodoView = observer(({ todo }) => {
  const mystyle = clsx({
    ischecked: todo.finished,
    notchecked: !todo.finished,
  });

  return (
    <li>
      <label htmlFor={todo.title} className={mystyle}>
        <input
          type="checkbox"
          id={todo.title}
          defaultChecked={todo.finished}
          onChange={() => (todo.finished = !todo.finished)}
        />
        {todo.title}
      </label>
    </li>
  );
});

const TodoCount = observer((todos) => {
  return <h3>Mobx: UnFinished todos count: {todosList.unfinished}</h3>;
});
const TodoListView = observer(({ todoList }) => {
  return (
    <ul>
      {todoList.todos &&
        todoList.todos.map((todo) => <TodoView todo={todo} key={todo.id} />)}
    </ul>
  );
});

const AppV1Mobx = observer(() => {
  return (
    <>
      <TodoCount />
      <NewTodo />
      <TodoListView todoList={todosList} />
    </>
  );
});

export default AppV1Mobx;
