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

document.body.appendChild(banner());
document.body.appendChild(tabs());
document.querySelector(".tabs").appendChild(tab());
