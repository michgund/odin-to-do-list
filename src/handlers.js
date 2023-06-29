import dom from "./dom";
import projects from "./projects";
import todos from "./todos";
import { isFuture, isValid } from "date-fns";

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
      // also add "home" because all todo's are "home".. Quick troubleshooting.. //TODO fix.
      if (
        !validateProject(project.value) ||
        project.value == "" ||
        project.value == "Home"
      ) {
        e.preventDefault();
      } else {
        projects.addProject(projects.createNewProject(project.value));
        dom.populateTabBar();
        form.reset();
        document.querySelector("#projectDialog").close();
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
    form.addEventListener("submit", (e) => {
      //   e.preventDefault();
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
            form.reset();
            document.querySelector("#todoDialog").close();
          }
        } else {
          e.preventDefault();
        }
      });
    });
  }

  function validateTodo(x) {
    const todoForm = document.querySelector("#todoDialog>form");
    const dateArr = dueDate.value.split("-");

    let nameValid = todo.value ? true : false,
      descriptionValid = description.value ? true : false,
      priorityValid = priority.value != "Choose" ? true : false,
      dateValid = isFuture(new Date(dateArr[0], dateArr[1], dateArr[2]))
        ? true
        : false;

    // Validate task name
    if (!nameValid && !document.querySelector("#nameWarning")) {
      const nameWarning = document.createElement("span");
      nameWarning.setAttribute("id", "nameWarning");
      nameWarning.style.color = "red";
      nameWarning.textContent = "Please give your task a name.";
      todoForm.insertBefore(
        nameWarning,
        todoForm.querySelector("p:nth-of-type(2)")
      );
    } else if (nameValid && document.querySelector("#nameWarning")) {
      document.querySelector("#nameWarning").remove();
    }

    //validate task description
    if (!descriptionValid && !document.querySelector("#descriptionWarning")) {
      const descriptionWarning = document.createElement("span");
      descriptionWarning.setAttribute("id", "descriptionWarning");
      descriptionWarning.style.color = "red";
      descriptionWarning.textContent = "Please give your task a description.";
      todoForm.insertBefore(
        descriptionWarning,
        todoForm.querySelector("p:nth-of-type(3)")
      );
    } else if (
      descriptionValid &&
      document.querySelector("#descriptionWarning")
    ) {
      document.querySelector("#descriptionWarning").remove();
    }

    //validate task priority
    if (!priorityValid && !document.querySelector("#priorityWarning")) {
      const priorityWarning = document.createElement("span");
      priorityWarning.setAttribute("id", "priorityWarning");
      priorityWarning.style.color = "red";
      priorityWarning.textContent = "Please give your task a priority.";
      todoForm.insertBefore(
        priorityWarning,
        todoForm.querySelector("p:nth-of-type(4)")
      );
    } else if (priorityValid && document.querySelector("#priorityWarning")) {
      document.querySelector("#priorityWarning").remove();
    }

    //validate task date
    if (!dateValid && !document.querySelector("#dateWarning")) {
      const dateWarning = document.createElement("span");
      dateWarning.setAttribute("id", "dateWarning");
      dateWarning.style.color = "red";
      dateWarning.textContent = "Please set a due date in the future.";
      todoForm.insertBefore(dateWarning, todoForm.querySelector("div"));
    } else if (dateValid && document.querySelector("#dateWarning")) {
      document.querySelector("#dateWarning").remove();
    }

    if (nameValid && descriptionValid && priorityValid && dateValid) {
      return true;
    }
  }

  function handleNewTodoClick() {
    const dialog = document.querySelector("#todoDialog");
    dialog.showModal();
    handleNewTodoSubmit();

    document.querySelector("#todoCancel").addEventListener("click", () => {
      const warnings = dialog.querySelectorAll("span");
      warnings.forEach((warning) => warning.remove());
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

  function handleTodoDeactivate(todo) {
    todo.active = todo.active ? false : true;
  }

  return {
    handleNewProjectClick,
    handleNewProjectSubmit,
    handleProjectClick,
    handleNewTodoClick,
    handleAnyClickStyle,
    handleNewTodoSubmit,
    handleTodoDeactivate,
  };
})();

export default handlers;
