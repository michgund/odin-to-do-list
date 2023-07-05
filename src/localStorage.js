const localStorages = (() => {
  function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

  //   if (storageAvailable("localStorage")) {
  //     // Yippee! We can use localStorage awesomeness
  //   } else {
  //     // Too bad, no localStorage for us
  //   }

  function populateStorage(toStore) {
    // console.log(toStore);
    // console.log(toStore.id);
    if (storageAvailable("localStorage")) {
      // console.log(toStore.id);
      if (toStore.id != undefined) {
        // console.log(toStore.id);
        localStorage.setItem(toStore.id, JSON.stringify(toStore));
        // console.log(JSON.parse(localStorage.getItem(toStore.id)));
      } else {
        localStorage.setItem("projects", JSON.stringify(toStore));
      }
    } else return false;
  }

  function retrieveStorage(id) {
    // console.log("hit");
    if (storageAvailable("localStorage") && localStorage.getItem(id) != null) {
      return JSON.parse(localStorage.getItem(id));
    } else return false;
  }

  function retrieveStoredProjects() {
    // console.log("hit");
    if (
      storageAvailable("localStorage") &&
      localStorage.getItem("projects") != null
    ) {
      return JSON.parse(localStorage.getItem("projects"));
    } else return false;
  }

  function editStorageItem(todo) {
    // console.log(todo);
    deleteStorageItem(todo);
    localStorage.setItem(todo.id, JSON.stringify(todo));
    // console.log(JSON.parse(localStorage.getItem(todo.id)));
  }

  function deleteStorageItem(todo) {
    localStorage.removeItem(todo.id);
  }

  function resetStorage() {
    localStorage.removeItem("projects");
    let counter = 0;
    while (localStorage.getItem(counter)) {
      localStorage.removeItem(counter);
      counter++;
    }
    // console.log("all gone");
  }

  return {
    storageAvailable,
    populateStorage,
    retrieveStorage,
    editStorageItem,
    resetStorage,
    retrieveStoredProjects,
    // prePopulateStorage,
  };
})();

export default localStorages;
