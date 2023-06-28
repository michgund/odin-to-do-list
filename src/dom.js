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
    element.className = "tab project-tab home down";
    element.textContent = "Home";
    return element;
  }

  function populateTabBar() {
    document.querySelector(".tabs").innerHTML = "";
    document.querySelector(".tabs").appendChild(createHomeTab());
    document.querySelector(".tabs").appendChild(newProjectTab());
    projects.myProjects.forEach((project) => {
      const element = document.createElement("div");
      element.className = "tab project-tab down";
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
      '<form method="dialog"> <p> <label for="project">Project Name:</label><input type="text" name="project" id="project"> </p> <div> <button class="down" id="projectCancel" type="reset">Cancel</button> <button class="down" type="submit">Confirm</button> </div> </form>';
    return dialog;
  }

  function createTodoModal() {
    const dialog = document.createElement("dialog");
    dialog.setAttribute("id", "todoDialog");
    dialog.innerHTML =
      '<form method="dialog"> <p> <label for="todo">Task:</label><input type="text" name="todo" id="todo"></p><p> <label for="description">Todo Description:</label><textarea name="description" id="description"></textarea></p><p> <label for="priority">Priority</label> <select id="priority" name="priority"> <option>Choose</option> <option>Low</option> <option>Medium</option> <option>High</option> </select> </p> <div> <button class="down" id="todoCancel" type="reset">Cancel</button> <button class="down" type="submit">Confirm</button> </div> </form>';
    return dialog;
  }

  function newProjectTab() {
    const element = document.createElement("div");
    element.className = "tab down";
    element.innerHTML = "+";
    element.addEventListener("click", handlers.handleNewProjectClick);
    // element.appendChild(plus);
    return element;
  }

  function initialisePage() {
    document.body.appendChild(createBanner());
    document.body.appendChild(createTabBar());
    document.body.appendChild(createProjectModal());
    document.body.appendChild(createTodoModal());
    document.querySelector(".tabs").appendChild(newProjectTab());
    handlers.handleNewProjectSubmit();
    handlers.handleNewTodoSubmit();
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
    if (project != "All") {
      const btn = document.createElement("button");
      btn.textContent = "+";
      btn.className = "new-todo down";
      btn.addEventListener("click", handlers.handleNewTodoClick);
      h1.appendChild(btn);
    }
    element.appendChild(h1);
    document.body.appendChild(element);
    handlers.handleAnyClickStyle();
    return element;
  }

  return {
    initialisePage,
    populateTabBar,
    createTodoDiv,
  };
})();

export default dom;
