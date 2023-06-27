import dom from "./dom";
import handlers from "./handlers";

const projects = (() => {
  let myProjects = [];

  function createNewProject(name) {
    return {
      name: name,
    };
  }

  function addProject(project) {
    myProjects.push(project);
  }

  function createSome() {
    addProject(createNewProject("todo list"));
    addProject(createNewProject("learn React"));
    addProject(createNewProject("todo list"));
    addProject(createNewProject("learn React"));
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
