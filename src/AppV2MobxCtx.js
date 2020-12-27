import React from "react";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { action } from "mobx";
import clsx from "clsx";
import "./styles.css";
import initList from "./initTodos";
// !! change the titles since it is used as the id in the label/input binding

const StoreContext = React.createContext();

function StoreProvider({ children }) {
  const store = useLocalStore(() => ({
    todos: initList,
    addTodo: action((todo) => {
      store.todos.push(todo);
    }),
    get count() {
      return store.todos.filter((todo) => todo.finished === false).length;
    }
  }));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

function TodoCount() {
  const store = React.useContext(StoreContext);
  return useObserver(() => (
    <h3>Mobx useObserver: UnFinished todos count: {store.count}</h3>
  ));
}

function TodoListView2() {
  const store = React.useContext(StoreContext);
  return useObserver(() => (
    <ul>
      {store.todos &&
        store.todos.map((todo) => (
          <TodoView2 key={() => todo.id} todo={todo} />
        ))}
    </ul>
  ));
}

function TodoView2({ todo }) {
  const [style, setStyle] = React.useState(
    clsx({ notchecked: !todo.finished, ischecked: todo.finished })
  );
  const store = React.useContext(StoreContext);

  function toggle() {
    const foundId = store.todos.findIndex((t) => t.id === todo.id);
    store.todos[foundId].finished = !store.todos[foundId].finished;
    setStyle(clsx({ notchecked: !todo.finished, ischecked: todo.finished }));
  }

  return (
    <>
      <li>
        <label htmlFor={todo.title} className={style}>
          <input
            type="checkbox"
            id={todo.title}
            defaultChecked={todo.finished}
            onChange={toggle}
          />
          {todo.title}
        </label>
      </li>
    </>
  );
}

function NewTodo() {
  const store = React.useContext(StoreContext);
  const [todo, setTodo] = React.useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        store.addTodo({ title: todo, id: Math.random(), finished: false });
        setTodo("");
      }}
    >
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit">New</button>
    </form>
  );
}

function AppV2MobxUseCtx() {
  return (
    <StoreProvider>
      <TodoCount />
      <NewTodo />
      <TodoListView2 />
    </StoreProvider>
  );
}

export default AppV2MobxUseCtx;
