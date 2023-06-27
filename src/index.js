import "./style.css";
import printMe from "./print";
// import Icon from "./icon.png";

function component() {
  const element = document.createElement("div");
  element.textContent = "Todo";

  // Add the image to our existing div.
  //   const myIcon = new Image();
  //   myIcon.src = Icon;

  //   element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());
