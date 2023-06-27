import dom from "./dom";
import handlers from "./handlers";

const projects = (() => {
  let myProjects = [];

  function createNewTodo(name, description, priority, dueDate) {
    return {
      name: name,
      description: description,
      priority: priority,
      dueDate: dueDate,
    };
  }

  function createNewProject(name) {
    return {
      name: name,
    };
  }

  function addProject(project) {
    myProjects.push(project);
  }

  return {
    createNewTodo,
    createNewProject,
    addProject,
    myProjects,
  };
})();

export default projects;
