import localStorages from "./localStorage";

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
    // console.log(todo);
    localStorages.populateStorage(todo);
    // pushTodo(todo);
  }

  //   function pushTodo(todo) {
  //     myTodos.push(todo);
  //   }

  function convertPriority(priority) {
    if (isNaN(priority)) {
      switch (priority) {
        case "Low":
          return 0;
          break;
        case "Medium":
          return 1;
          break;
        case "High":
          return 2;
          break;
      }
    } else {
      switch (priority) {
        case 0:
          return "Low";
          break;
        case 1:
          return "Medium";
          break;
        case 2:
          return "High";
          break;
      }
    }
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

  function fetchStoredTodos() {
    myTodos = [];
    let counter = 0;
    while (localStorages.retrieveStorage(counter)) {
      //   console.log(localStorages.retrieveStorage(counter));
      myTodos.push(localStorages.retrieveStorage(counter));
      counter++;
    }
    return myTodos;
  }

  function editTodo(form) {
    // console.log(form);
    let newName = form.querySelector(".task").value,
      newDescription = form.querySelector(".description").value,
      newPriority = convertPriority(form.querySelector(".priority").value),
      newDate = form.querySelector(".dueDate").value,
      todoID = form.parentElement.id.slice(6);
    // console.log(myTodos);
    myTodos.forEach((oldTodo) => {
      if (oldTodo.id == todoID) {
        // console.log(oldTodo);
        oldTodo.name = newName;
        oldTodo.description = newDescription;
        oldTodo.priority = newPriority;
        oldTodo.dueDate = newDate;
        // console.log(oldTodo);
        localStorages.editStorageItem(oldTodo);
      }
    });
  }

  function deleteTodo(id) {
    for (let i = 0; i < myTodos.length; i++) {
      if (myTodos[i].id == id) {
        myTodos.splice(i, 1);
        localStorage.removeItem(id);
      }
    }
  }

  // function redoTodoIDs() {
  //   for (let i = 0; i < myTodos.length; i++) {
  //     myTodos[i].id = i;
  //   }
  // }

  function editTodoProject(project, newProject) {
    myTodos.forEach((todo) => {
      if (todo.project == project) {
        todo.project = newProject;
        localStorages.editStorageItem(todo);
      }
    });
  }

  function deleteProjectTodos(project) {
    let projectTodos = fetchTodos(project);
    // console.log(projectTodos);
    projectTodos.forEach((element) => localStorage.removeItem(element.id));
    // console.log(myTodos[i]);
    // localStorage.removeItem(myTodos[i].id);
    // myTodos.splice(i, 1);
    // i--;
  }

  return {
    createNewTodo,
    addTodo,
    myTodos,
    fetchTodos,
    editTodo,
    deleteTodo,
    // redoTodoIDs,
    editTodoProject,
    deleteProjectTodos,
    convertPriority,
    fetchStoredTodos,
  };
})();

export default todos;
