import dom from "./dom";
import handlers from "./handlers";

const projects = (() => {
  let myProjects = [];

  function createNewProject(name, selected) {
    return {
      name: name,
      selected: selected,
    };
  }

  function addProject(project) {
    myProjects.push(project);
  }

  function createSome() {
    addProject(createNewProject("Todo list", false));
    addProject(createNewProject("Learn React", false));
    addProject(createNewProject("TOP", false));
    addProject(createNewProject("Life", false));
  }

  function fetchTodos(project) {
    return todos.getProjectTodos(project);
  }

  function displayTodos(project) {
    fetchTodos(project);
    dom.renderTodos(project);
  }

  return {
    createNewProject,
    addProject,
    myProjects,
    createSome,
  };
})();

export default projects;
