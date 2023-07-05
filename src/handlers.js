import dom from "./dom";
import projects from "./projects";
import todos from "./todos";
import { isFuture, isValid } from "date-fns";
import localStorages from "./localStorage";

const handlers = (() => {
  function handleNewProjectClick() {
    const dialog = document.querySelector("#projectDialog");
    dialog.showModal();
    handleNewProjectSubmit();

    document.querySelector("#projectCancel").addEventListener("click", () => {
      if (dialog.querySelector(".warning")) {
        dialog
          .querySelectorAll(".warning")
          .forEach((warning) => warning.remove());
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
        !validateProject(project.value, form) ||
        project.value == "" ||
        project.value == "Home"
      ) {
        e.preventDefault();
      } else {
        projects.addProject(
          projects.createNewProject(
            project.value,
            false,
            projects.myProjects.length ? projects.myProjects.length : 0
          )
        );
        dom.populateTabBar();
        form.reset();
        document.querySelector("#projectDialog").close();
        if (form.querySelector(".warning")) {
          form
            .querySelectorAll(".warning")
            .forEach((warning) => warning.remove());
        }
      }
    });
  }

  function validateProject(newProject, form) {
    // const form = document.querySelector("#projectDialog>form");
    if (form.querySelector(".warning")) {
      form.querySelectorAll(".warning").forEach((warning) => warning.remove());
    }
    if (newProject.length > 30) {
      if (!form.querySelector("#longWarning")) {
        const warning = document.createElement("p");
        warning.setAttribute("id", "longWarning");
        warning.classList.add("warning");
        warning.style.color = "red";
        warning.textContent =
          "Please keep the project name less than 30 characters.";
        form.insertBefore(warning, form.firstElementChild.nextElementSibling);
      }
      return false;
    } else if (newProject.length < 30 && form.querySelector("#longWarning")) {
      form.querySelector("#nameWarning").remove();
    }
    let uniqueProject = true;
    if (projects.myProjects) {
      projects.myProjects.forEach((element) => {
        if (element.name == newProject) {
          uniqueProject = false;
          if (!document.querySelector("#nameWarning")) {
            const warning = document.createElement("p");
            warning.setAttribute("id", "nameWarning");
            warning.classList.add("warning");
            warning.style.color = "red";
            warning.textContent =
              "Project already exists! Please use a different name to identify a unique project.";
            form.insertBefore(
              warning,
              form.firstElementChild.nextElementSibling
            );
          }
        }
      });
    }
    return uniqueProject;
  }

  function handleNewTodoSubmit() {
    const form = document.querySelector("#todoDialog>form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      //   e.preventDefault();
      projects.myProjects.forEach((element) => {
        if (element.selected) {
          if (validateTodo(form)) {
            todos.addTodo(
              todos.createNewTodo(
                element.name,
                form.querySelector(".task").value,
                form.querySelector(".description").value,
                todos.convertPriority(form.querySelector(".priority").value),
                form.querySelector(".dueDate").value,
                true,
                todos.myTodos.length
              )
            );
            dom.createTodoDiv(element.name);
            form.reset();
            document.querySelector("#todoDialog").close();
          }
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
        // console.log(todos.myTodos);
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
      e.preventDefault();
      console.log("edit");
      projects.myProjects.forEach((element) => {
        if (element.selected) {
          //   console.log(element);
          //   console.log(form);
          if (validateTodo(form)) {
            // console.log("valid");
            todos.editTodo(form);
            dom.createTodoDiv(element.name);
            form.reset();
            document.querySelector(`#dialog${todo.id}`).close();
          }
        }
      });
    });
  }

  function handleTodoDelete(todo) {
    //TODO: Modal for delete?
    if (confirm("Are you sure? This action cannot be undone.")) {
      todos.deleteTodo(todo.id);
      // todos.redoTodoIDs();
      dom.createTodoDiv(todo.project);
    }
  }

  function handleTodoDeactivate(todo) {
    todo.active = todo.active ? false : true;
    localStorages.editStorageItem(todo);
  }

  function handleProjectEditSubmit(project) {
    const form = document.querySelector(
      `#projectEdit${projects.getID(project)}>form`
    );
    form.addEventListener("submit", (e) => {
      let newProject = form.querySelector(".project").value;
      //   console.log("edit");
      projects.myProjects = projects.getMyProjectsArr();
      //   console.log(projects.myProjects);
      //   console.log(element.id);
      //   console.log(projects.getID(project));
      projects.myProjects.forEach((element) => {
        if (
          element.projectID == projects.getID(project) &&
          validateProject(newProject, form)
        ) {
          //   console.log(element);
          //   console.log(form);
          //   console.log("valid");
          projects.editProject(project, newProject);
          dom.populateTabBar();
          dom.createTodoDiv(newProject);
          form.reset();
          form.parentElement.close();
        } else {
          e.preventDefault();
        }
      });
    });
  }

  function handleProjectEdit(project) {
    const dialog = document.querySelector(
      `#projectEdit${projects.getID(project)}`
    );
    // console.log(dialogs);
    dialog.showModal();
    handleProjectEditSubmit(project);

    dialog.querySelector(".delete").addEventListener("click", (e) => {
      e.preventDefault();
      // console.log("delete");
      if (
        confirm(
          "Are you sure you wish to delete this project? All of the project todo's will be deleted as well. This action cannot be undone."
        )
      ) {
        projects.deleteProject(project);
        dom.populateTabBar();
        dom.createTodoDiv("All");
        dialog.close();
      }
    });

    dialog.querySelector(".cancel").addEventListener("click", () => {
      if (dialog.querySelector(".warning")) {
        dialog
          .querySelectorAll(".warning")
          .forEach((warning) => warning.remove());
      }
      dialog.close();
    });
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
    handleProjectEdit,
  };
})();

export default handlers;
