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
        "To finish this todo list.. Some stuff needs to be done, but can finish it by today",
        "High",
        "2023-11-24",
        true,
        0
      )
    );
    addTodo(
      createNewTodo(
        "Todo list",
        "Fix the dates",
        "When editing the todo, didn't the dates mess up?",
        "Low",
        "2023-10-12",
        true,
        1
      )
    );
    addTodo(
      createNewTodo(
        "Todo list",
        "Local storage",
        "Add it",
        "Medium",
        "2023-10-12",
        true,
        2
      )
    );
    addTodo(
      createNewTodo(
        "Todo list",
        "Projects",
        "Need to be able to edit project names and delete them",
        "Medium",
        "2023-10-12",
        true,
        3
      )
    );
    addTodo(
      createNewTodo(
        "Todo list",
        "Filter",
        "How about being able to filter the tasks by priority OR dates (sort by prio on same dates as well)?",
        "Medium",
        "2023-10-12",
        true,
        4
      )
    );
    addTodo(
      createNewTodo(
        "Todo list",
        "Scroll",
        "Hey, what happens if there are more than screen size of todos?",
        "Medium",
        "2023-10-12",
        false,
        5
      )
    );
    addTodo(
      createNewTodo(
        "Todo list",
        "Home page",
        "Home page should show all todos",
        "Medium",
        "2023-10-12",
        false,
        6
      )
    );
    addTodo(
      createNewTodo(
        "Learn React",
        "New task",
        "Should be able to view all todos from homepage",
        "Medium",
        "2023-10-12",
        true,
        7
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

  function redoTodoIDs() {
    for (let i = 0; i < myTodos.length; i++) {
      myTodos[i].id = i;
    }
  }

  function editTodoProject(project, newProject) {
    myTodos.forEach((todo) => {
      if (todo.project == project) {
        todo.project = newProject;
      }
    });
  }

  function deleteProjectTodos(project) {
    let max = myTodos.length;
    for (let i = 0; i < max; i++) {
      if (myTodos[i] && myTodos[i].project == project) {
        myTodos.splice(i, 1);
        i--;
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
    redoTodoIDs,
    editTodoProject,
    deleteProjectTodos,
  };
})();

export default todos;
