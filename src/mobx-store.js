import { observable, action } from "mobx";

const todosList = observable({
  todos: [],
  get unfinished() {
    return this.todos.filter((todo) => todo.finished === false).length;
  },
  addTodo: action(function (todo) {
    return this.todos.push(todo);
  }),
});

todosList.addTodo({ id: Math.random(), title: "first", finished: false });
todosList.addTodo({ id: Math.random(), title: "Second", finished: true });
todosList.addTodo({ id: Math.random(), title: "Third", finished: true });

export default todosList;
