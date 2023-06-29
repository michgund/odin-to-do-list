import dom from "./dom";
import projects from "./projects";
import todos from "./todos";

const handlers = (() => {
  function handleNewProjectClick() {
    const dialog = document.querySelector("#projectDialog");
    dialog.showModal();
    handleNewProjectSubmit();

    document.querySelector("#projectCancel").addEventListener("click", () => {
      //   dialog.nextElementSibling.reset();
      if (document.querySelector("#warning")) {
        document.querySelector("#warning").remove();
      }
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
    form.addEventListener("submit", (e) => {
      // form was submitting to quickly or something like that, so had to check if string is empty to prevent double submission(?)
      if (!validateProject(project.value) || project.value == "") {
        e.preventDefault();
      } else {
        projects.addProject(projects.createNewProject(project.value));
        dom.populateTabBar();
        form.reset();
        document.querySelector("#projectDialog").close();
        console.log("hit");
        if (document.querySelector("#warning")) {
          document.querySelector("#warning").remove();
        }
      }
    });
  }

  function validateProject(newProject) {
    const form = document.querySelector("#projectDialog>form");
    let uniqueProject = true;
    projects.myProjects.forEach((element) => {
      if (element.name == newProject) {
        uniqueProject = false;
        if (!document.querySelector("#warning")) {
          const warning = document.createElement("p");
          warning.setAttribute("id", "warning");
          warning.style.color = "red";
          warning.textContent =
            "Project already exists! Please use a different name to identify a unique project.";
          form.insertBefore(warning, form.firstElementChild.nextElementSibling);
        }
      }
    });
    return uniqueProject;
  }

  function handleNewTodoSubmit() {
    const form = document.querySelector("#todoDialog>form");
    form.addEventListener("submit", () => {
      projects.myProjects.forEach((element) => {
        if (element.selected) {
          if (validateTodo(form)) {
            todos.addTodo(
              todos.createNewTodo(
                element.name,
                todo.value,
                description.value,
                priority.value,
                dueDate.value,
                true
              )
            );
            dom.createTodoDiv(element.name);
          }
        }
      });
      console.log(todos.myTodos);
      form.reset();
    });
  }

  function validateTodo(form) {
    if (!todo.value) {
      const nameWarning = document.createElement("p");
      nameWarning.textContent = "Please give your task a name.";
    }
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
        // console.log(projects.myProjects);
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
