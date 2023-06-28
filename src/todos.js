import dom from "./dom";
import handlers from "./handlers";

const todos = (() => {
  let myTodos = [];

  function createNewTodo(
    project,
    name,
    description,
    priority,
    dueDate,
    active
  ) {
    return {
      project: project,
      name: name,
      description: description,
      priority: priority,
      dueDate: dueDate,
      active: active,
    };
  }

  function addTodo(todo) {
    myTodos.push(todo);
  }

  function createSome() {
    addTodo(
      createNewTodo(
        "Todo list",
        "Finish todo list",
        "To finish this todo list I still need to implement the dates and also be able to edit and delete",
        "High",
        "2023-11-24",
        true
      )
    );
    addTodo(
      createNewTodo(
        "Todo list",
        "Do some stuff",
        "Add lorem ipsum but be done writing",
        "Low",
        "2023-10-12",
        true
      )
    );
  }

  return {
    createNewTodo,
    addTodo,
    myTodos,
    createSome,
  };
})();

export default todos;
