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
    active,
    id
  ) {
    return {
      project: project,
      name: name,
      description: description,
      priority: priority,
      dueDate: dueDate,
      active: active,
      id: id,
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
        true,
        0
      )
    );
    addTodo(
      createNewTodo(
        "Todo list",
        "Do some stuff",
        "Add lorem ipsum but be done writing but how about some filters too?",
        "Low",
        "2023-10-12",
        true,
        1
      )
    );
  }

  function fetchTodos(project) {
    let projectTodo = [];
    myTodos.forEach((todo) => {
      if (todo.project == project) {
        projectTodo.push(todo);
      }
    });
    return projectTodo;
  }

  function editTodo(form) {
    // console.log(form);
    let newName = form.querySelector(".task").value,
      newDescription = form.querySelector(".description").value,
      newPriority = form.querySelector(".priority").value,
      newDate = form.querySelector(".dueDate").value,
      todoID = form.parentElement.id.slice(6);

    myTodos.forEach((oldTodo) => {
      if (oldTodo.id == todoID) {
        oldTodo.name = newName;
        oldTodo.description = newDescription;
        oldTodo.priority = newPriority;
        oldTodo.dueDate = newDate;
      }
    });
  }

  function deleteTodo(id) {
    for (let i = 0; i < myTodos.length; i++) {
      if (myTodos[i].id == id) {
        myTodos.splice(i, 1);
      }
    }
  }

  return {
    createNewTodo,
    addTodo,
    myTodos,
    createSome,
    fetchTodos,
    editTodo,
    deleteTodo,
  };
})();

export default todos;
