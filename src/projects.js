import dom from "./dom";
import handlers from "./handlers";
import todos from "./todos";

const projects = (() => {
  let myProjects = [];

  function createNewProject(name, selected, id) {
    return {
      name: name,
      selected: selected,
      id: id,
    };
  }

  function addProject(project) {
    myProjects.push(project);
  }

  function createSome() {
    addProject(createNewProject("Todo list", false, 0));
    addProject(createNewProject("Learn React", false, 1));
    addProject(createNewProject("TOP", false, 2));
    addProject(createNewProject("Life", false, 3));
  }

  function getID(projectName) {
    // console.log(projectName);
    let projectID;
    myProjects.forEach((project) => {
      if (project.name == projectName) {
        // console.log(project.name);
        projectID = project.id;
        // console.log(project);
      }
    });
    return projectID;
  }

  function editProject(project, newProject) {
    myProjects.forEach((myProject) => {
      if (myProject.name == project) {
        myProject.name = newProject;
      }
    });
    todos.editTodoProject(project, newProject);
  }

  function deleteProject(project) {
    // console.log(myProjects);
    for (let i = 0; i < myProjects.length; i++) {
      if (myProjects[i].name == project) {
        myProjects.splice(i, 1);
      }
    }
    todos.deleteProjectTodos(project);
  }

  return {
    createNewProject,
    addProject,
    myProjects,
    createSome,
    getID,
    editProject,
    deleteProject,
  };
})();

export default projects;
