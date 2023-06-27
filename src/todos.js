import dom from "./dom";
import handlers from "./handlers";

const todos = (() => {
  function createNewTodo(name, description, priority, dueDate) {
    return {
      name: name,
      description: description,
      priority: priority,
      dueDate: dueDate,
    };
  }

  return {
    createNewTodo,
  };
})();

export default todos;
