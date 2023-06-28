import projects from "./projects";
import handlers from "./handlers";

const dom = (() => {
  function createBanner() {
    const element = document.createElement("div");
    element.classList.add("banner");
    const title = document.createElement("h1");
    title.textContent = "Todo";
    element.appendChild(title);
    return element;
  }

  function createTabBar() {
    const element = document.createElement("div");
    element.classList.add("tabs");
    return element;
  }

  function createHomeTab() {
    const element = document.createElement("div");
    element.className = "tab project-tab home";
    element.textContent = "Home";
    return element;
  }

  function populateTabBar() {
    document.querySelector(".tabs").innerHTML = "";
    document.querySelector(".tabs").appendChild(createHomeTab());
    document.querySelector(".tabs").appendChild(newProjectTab());
    projects.myProjects.forEach((project) => {
      const element = document.createElement("div");
      element.className = "tab project-tab";
      if (project.selected == true) {
        element.classList.add("selected");
      }
      element.textContent = project.name;
      document.querySelector(".tabs").appendChild(element);
    });
    handlers.handleProjectClick();
  }

  function createProjectModal() {
    const dialog = document.createElement("dialog");
    dialog.setAttribute("id", "projectDialog");
    dialog.innerHTML =
      '<form method="dialog"> <p> <label for="project">Project Name:</label><input type="text" name="project" id="project"></p><p> <label for="description">Project Description:</label><textarea name="description" id="description"></textarea></p><p> <label for="priority">Priority</label> <select id="priority" name="priority"> <option>Choose</option> <option>Low</option> <option>Medium</option> <option>High</option> </select> </p> <div> <button id="cancel" type="reset">Cancel</button> <button type="submit">Confirm</button> </div> </form>';
    return dialog;
  }

  function newProjectTab() {
    const element = document.createElement("div");
    element.classList.add("tab");
    element.innerHTML = "+";
    element.addEventListener("click", handlers.handleNewProjectClick);
    // element.appendChild(plus);
    return element;
  }

  function initialisePage() {
    document.body.appendChild(createBanner());
    document.body.appendChild(createTabBar());
    document.body.appendChild(createProjectModal());
    document.querySelector(".tabs").appendChild(newProjectTab());
    handlers.handleNewProjectSubmit();
    projects.createSome();
    populateTabBar();
    document.body.appendChild(createTodoDiv("All"));
    document.querySelector(".home").classList.add("selected");
  }

  function createTodoDiv(project) {
    const elementExists = document.querySelector(".todo-div");
    if (elementExists) {
      elementExists.remove();
    }
    const element = document.createElement("div");
    element.classList.add("todo-div");
    const h1 = document.createElement("h1");
    h1.textContent = `${project} todo's`;
    element.appendChild(h1);
    document.body.appendChild(element);
    return element;
  }

  return {
    initialisePage,
    populateTabBar,
    createTodoDiv,
  };
})();

export default dom;
