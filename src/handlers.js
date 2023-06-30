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
    const btns = document.querySelectorAll(".down");
    btns.forEach((btn) => {
      btn.addEventListener("mousedown", () => {
        btn.classList.add("clicked");
        window.addEventListener("mouseup", () => {
          btn.classList.remove("clicked");
        });
      });
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
                form.querySelector(".task").value,
                form.querySelector(".description").value,
                form.querySelector(".priority").value,
                form.querySelector(".dueDate").value,
                true,
                todos.myTodos.length
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

  function validateTodo(form) {
    const dateArr = form.querySelector(".dueDate").value.split("-");
    let nameValid = form.querySelector(".task").value ? true : false;
    let descriptionValid = form.querySelector(".description").value
      ? true
      : false;
    let priorityValid =
      form.querySelector(".priority").value != "Choose" ? true : false;
    let dateValid = isFuture(new Date(dateArr[0], dateArr[1], dateArr[2]))
      ? true
      : false;

    // Validate task name
    if (!nameValid && !form.querySelector(".nameWarning")) {
      const nameWarning = document.createElement("span");
      nameWarning.classList.add("nameWarning");
      nameWarning.style.color = "red";
      nameWarning.textContent = "Please give your task a name.";
      form.insertBefore(nameWarning, form.querySelector("p:nth-of-type(2)"));
    } else if (nameValid && form.querySelector(".nameWarning")) {
      form.querySelector(".nameWarning").remove();
    }

    //validate task description
    if (!descriptionValid && !form.querySelector(".descriptionWarning")) {
      const descriptionWarning = document.createElement("span");
      descriptionWarning.classList.add("descriptionWarning");
      descriptionWarning.style.color = "red";
      descriptionWarning.textContent = "Please give your task a description.";
      form.insertBefore(
        descriptionWarning,
        form.querySelector("p:nth-of-type(3)")
      );
    } else if (descriptionValid && form.querySelector(".descriptionWarning")) {
      form.querySelector(".descriptionWarning").remove();
    }

    //validate task priority
    if (!priorityValid && !form.querySelector(".priorityWarning")) {
      const priorityWarning = document.createElement("span");
      priorityWarning.classList.add("priorityWarning");
      priorityWarning.style.color = "red";
      priorityWarning.textContent = "Please give your task a priority.";
      form.insertBefore(
        priorityWarning,
        form.querySelector("p:nth-of-type(4)")
      );
    } else if (priorityValid && form.querySelector(".priorityWarning")) {
      form.querySelector(".priorityWarning").remove();
    }

    //validate task date
    if (!dateValid && !form.querySelector(".dateWarning")) {
      const dateWarning = document.createElement("span");
      dateWarning.classList.add("dateWarning");
      dateWarning.style.color = "red";
      dateWarning.textContent = "Please set a due date in the future.";
      form.insertBefore(dateWarning, form.querySelector("div"));
    } else if (dateValid && form.querySelector(".dateWarning")) {
      form.querySelector(".dateWarning").remove();
    }

    if (nameValid && descriptionValid && priorityValid && dateValid) {
      return true;
    }
  }

  function handleNewTodoClick() {
    const dialog = document.querySelector("#todoDialog");
    dialog.showModal();
    handleNewTodoSubmit();

    dialog.querySelector(".cancel").addEventListener("click", () => {
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

  function handleTodoEdit(todo) {
    const dialog = document.querySelector(`#dialog${todo.id}`);
    dialog.showModal();
    handleTodoEditSubmit(todo);

    dialog.querySelector(".cancel").addEventListener("click", () => {
      const warnings = dialog.querySelectorAll("span");
      warnings.forEach((warning) => warning.remove());
      dialog.close();
    });
  }

  function handleTodoEditSubmit(todo) {
    const form = document.querySelector(`#dialog${todo.id}>form`);
    form.addEventListener("submit", (e) => {
      console.log("edit");
      projects.myProjects.forEach((element) => {
        if (element.selected) {
          console.log(element);
          console.log(form);
          if (validateTodo(form)) {
            console.log("valid");
            todos.editTodo(form);
            dom.createTodoDiv(element.name);
            form.reset();
            document.querySelector(`#dialog${todo.id}`).close();
          }
        } else {
          e.preventDefault();
        }
      });
    });
  }

  function handleTodoDelete(todo) {
    //TODO: Modal for delete?
    if (confirm("Are you sure? This action cannot be undone.")) {
      todos.deleteTodo(todo.id);
      dom.createTodoDiv(todo.project);
    }
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
    handleTodoEdit,
    handleTodoDelete,
  };
})();

export default handlers;
