import dom from "./dom";
import projects from "./projects";

const handlers = (() => {
  function handleNewProjectClick() {
    const dialog = document.querySelector("#favDialog");
    // dialog.close();
    dialog.showModal();

    document.querySelector("#cancel").addEventListener("click", () => {
      dialog.close();
    });
  }

  function handleNewProjectSubmit() {
    const form = document.querySelector("#favDialog>form");
    form.addEventListener("submit", () => {
      projects.addProject(projects.createNewProject(project.value));
      dom.populateTabBar(project.value);
    });
  }

  return {
    handleNewProjectClick,
    handleNewProjectSubmit,
  };
})();

export default handlers;
