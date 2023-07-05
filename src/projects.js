import dom from "./dom";
import handlers from "./handlers";
import localStorages from "./localStorage";
import todos from "./todos";

const projects = (() => {
  let myProjects = [];
  function getMyProjectsArr() {
    let myProjects = [];
    if (localStorages.retrieveStoredProjects()) {
      myProjects = localStorages.retrieveStoredProjects();
    }
    return myProjects;
  }

  function createNewProject(name, selected, projectID) {
    return {
      name: name,
      selected: selected,
      projectID: projectID,
    };
  }

  function addProject(project) {
    myProjects = getMyProjectsArr();
    console.log(myProjects);
    myProjects.push(project);
    console.log(myProjects);
    // console.log(myProjects);
    localStorages.populateStorage(myProjects);
    // console.log(localStorages.retrieveStorage("projects"));
  }

  function fetchStoredProjects() {
    // myProjects = getMyProjectsArr();
    // console.log(localStorages.retrieveStorage("projects"));
    return localStorages.retrieveStorage("projects");
    // return myTodos;
  }

  function createSome() {
    // addProject(createNewProject("Todo list", false, 0));
    // addProject(createNewProject("Learn React", false, 1));
    // addProject(createNewProject("TOP", false, 2));
    // addProject(createNewProject("Life", false, 3));
  }

  function getID(projectName) {
    // console.log(projectName);
    let projectID;
    myProjects = getMyProjectsArr();
    myProjects.forEach((project) => {
      if (project.name == projectName) {
        // console.log(project.name);
        projectID = project.projectID;
        // console.log(project);
      }
    });
    return projectID;
  }

  function editProject(project, newProject) {
    myProjects = getMyProjectsArr();
    myProjects.forEach((myProject) => {
      if (myProject.name == project) {
        myProject.name = newProject;
      }
    });
    console.log(myProjects);
    localStorages.populateStorage(myProjects);
    console.log(localStorages.retrieveStoredProjects());
    todos.editTodoProject(project, newProject);
  }

  function deleteProject(project) {
    // console.log(myProjects);
    myProjects = getMyProjectsArr();
    for (let i = 0; i < myProjects.length; i++) {
      if (myProjects[i].name == project) {
        myProjects.splice(i, 1);
      }
    }
    localStorages.populateStorage(myProjects);
    todos.deleteProjectTodos(project);
  }

  return {
    createNewProject,
    fetchStoredProjects,
    addProject,
    getMyProjectsArr,
    createSome,
    getID,
    editProject,
    deleteProject,
  };
})();

export default projects;
