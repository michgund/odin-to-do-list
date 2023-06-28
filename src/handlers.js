import dom from "./dom";
import projects from "./projects";
import todos from "./todos";

const handlers = (() => {
  function handleNewProjectClick() {
    const dialog = document.querySelector("#projectDialog");
    dialog.showModal();

    document.querySelector("#projectCancel").addEventListener("click", () => {
      dialog.close();
    });
  }

  function handleAnyClickStyle() {
    const btns = document.querySelectorAll("button");
    btns.forEach((btn) => {
      btn.addEventListener("mousedown", () => {
        btn.classList.add("clicked");
        window.addEventListener("mouseup", () => {
          btn.classList.remove("clicked");
        });
      });
      //   btn.addEventListener("mousedown", () => {});
    });
  }

  function handleNewProjectSubmit() {
    const form = document.querySelector("#projectDialog>form");
    form.addEventListener("submit", () => {
      projects.addProject(projects.createNewProject(project.value));
      dom.populateTabBar();
      form.reset();
    });
  }

  function handleNewTodoSubmit() {
    const form = document.querySelector("#todoDialog>form");
    form.addEventListener("submit", () => {
      console.log(todo.value);
      console.log(description.value);
      console.log(priority.value);
      form.reset();
    });
  }

  function handleNewTodoClick() {
    const dialog = document.querySelector("#todoDialog");
    dialog.showModal();

    document.querySelector("#todoCancel").addEventListener("click", () => {
      dialog.close();
    });
  }

  function handleProjectClick() {
    const tabs = document.querySelectorAll(".project-tab");
    tabs.forEach((element) => {
      element.addEventListener("click", () => {
        dom.createTodoDiv(
          element.textContent === "Home" ? "All" : element.textContent
        );
        tabs.forEach((element) => {
          element.classList.remove("selected");
        });
        projects.myProjects.forEach((project) =>
          project.name == element.textContent
            ? (project.selected = true)
            : (project.selected = false)
        );
        console.log(projects.myProjects);
        element.classList.add("selected");
      });
    });
  }

  return {
    handleNewProjectClick,
    handleNewProjectSubmit,
    handleProjectClick,
    handleNewTodoClick,
    handleAnyClickStyle,
    handleNewTodoSubmit,
  };
})();

export default handlers;
