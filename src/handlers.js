import dom from "./dom";
import projects from "./projects";

const handlers = (() => {
  function handleNewProjectClick() {
    const dialog = document.querySelector("#projectDialog");
    // dialog.close();
    dialog.showModal();

    document.querySelector("#cancel").addEventListener("click", () => {
      dialog.close();
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
  };
})();

export default handlers;
