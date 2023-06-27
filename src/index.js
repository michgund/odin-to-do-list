import "./style.css";
import printMe from "./print";
// import Icon from "./icon.png";

function banner() {
  const element = document.createElement("div");
  element.classList.add("banner");
  const title = document.createElement("h1");
  title.textContent = "Todo";
  element.appendChild(title);

  return element;
}

function tabs() {
  const element = document.createElement("div");
  element.classList.add("tabs");

  return element;
}

function tab() {
  const element = document.createElement("div");
  element.classList.add("tab");
  element.textContent = "New Project";
  const plus = document.createElement("button");
  plus.classList.add("new-project");
  plus.innerHTML = "+";
  element.appendChild(plus);

  return element;
}

function createModal() {
  const dialog = document.createElement("dialog");
  dialog.setAttribute("id", "favDialog");
  dialog.innerHTML =
    '<form method="dialog"> <p> <label for="project">Project Name:</label><input type="text" name="project" id="project"></p><p> <label for="description">Project Description:</label><textarea name="description" id="description"></textarea></p><p> <label for="priority">Priority</label> <select id="priority" name="priority"> <option>Choose</option> <option>Low</option> <option>Medium</option> <option>High</option> </select> </p> <div> <button id="cancel" type="reset">Cancel</button> <button type="submit">Confirm</button> </div> </form>';
  return dialog;
}

document.body.appendChild(banner());
document.body.appendChild(tabs());
document.body.appendChild(createModal());
document.querySelector(".tabs").appendChild(tab());

document
  .querySelector(".new-project")
  .addEventListener("click", handleNewProjectClick);

function handleNewProjectClick() {
  console.log("loggin");
  const dialog = document.querySelector("#favDialog");
  dialog.showModal();

  document.querySelector("#cancel").addEventListener("click", () => {
    dialog.close();
  });
}
