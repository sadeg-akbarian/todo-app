const allButton = document.querySelector("#allButton");
const openButton = document.querySelector("#openButton");
const doneButton = document.querySelector("#doneButton");
const allRadioButtons = document.querySelectorAll(".radio");
const removeButton = document.querySelector("#removeTodos");
const inputTodo = document.querySelector("#inputTodo");
const addTodoButton = document.querySelector("#addTodoButton");
const todoList = document.querySelector("#todoList");
const toDoCheckboxes = todoList.querySelector("li");

function initialState() {
  localStorage.clear();
  const updateStateRadioButtons = {
    allButton: true,
    openButton: false,
    doneButton: false,
  };
  const addedTodos = {};

  localStorage.setItem(
    "StatusOfRadioButtons",
    JSON.stringify(updateStateRadioButtons)
  );
  localStorage.setItem("addedTodos", JSON.stringify(addedTodos));
}

initialState();

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function changeRadioButtonStatus(xxx) {
  const statusOfRadioButtons = JSON.parse(
    localStorage.getItem("StatusOfRadioButtons")
  );
  for (const radioButton in statusOfRadioButtons) {
    if (radioButton === xxx) {
      statusOfRadioButtons[radioButton] = true;
    } else {
      statusOfRadioButtons[radioButton] = false;
    }
  }
  localStorage.setItem(
    "StatusOfRadioButtons",
    JSON.stringify(statusOfRadioButtons)
  );
}

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function renderState() {
  const statusOfRadioButtons = JSON.parse(
    localStorage.getItem("StatusOfRadioButtons")
  );
  allButton.checked = statusOfRadioButtons.allButton;
  openButton.checked = statusOfRadioButtons.openButton;
  doneButton.checked = statusOfRadioButtons.doneButton;
  todoList.innerHTML = "";
  const addedTodos = JSON.parse(localStorage.getItem("addedTodos"));
  console.log(addedTodos);
  for (const toDo in addedTodos) {
    console.log(addedTodos[toDo]);
    const newElement = document.createElement("li");
    const newTextNode = document.createTextNode(
      addedTodos[toDo].description + " "
    );
    newElement.appendChild(newTextNode);
    console.log(newElement.innerText);
    newElement.id = addedTodos[toDo].id;
    console.log(newElement.id);
    const newInput = document.createElement("input");
    newInput.type = "checkbox";
    newElement.appendChild(newInput);
    newInput.checked = addedTodos[toDo].done;
    console.log(newInput.checked);
    todoList.appendChild(newElement);
  }

  for (const toDo in addedTodos) {
    console.log(addedTodos[toDo]);
    if (openButton.checked) {
      if (addedTodos[toDo].done === true) {
        const currentToDo = todoList.querySelector("#" + addedTodos[toDo].id);
        console.log(currentToDo);
        currentToDo.classList.add("hideToDo");
      }
    } else if (doneButton.checked) {
      if (addedTodos[toDo].done === false) {
        const currentToDo = todoList.querySelector("#" + addedTodos[toDo].id);
        console.log(currentToDo);
        currentToDo.classList.add("hideToDo");
      }
    }
  }
}

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

allButton.addEventListener("click", function (event) {
  changeRadioButtonStatus(event.target.id);
  renderState();
});

openButton.addEventListener("click", function (event) {
  changeRadioButtonStatus(event.target.id);
  renderState();
});

doneButton.addEventListener("click", function (event) {
  changeRadioButtonStatus(event.target.id);
  renderState();
});

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

addTodoButton.addEventListener("click", function () {
  console.log(inputTodo.value);
  const trimedInput = inputTodo.value.trim();
  console.log(trimedInput.length);
  console.log(trimedInput);
  if (trimedInput.length >= 5) {
    const addedTodos = JSON.parse(localStorage.getItem("addedTodos"));
    const newID = Date.now().toString(36);
    addedTodos[newID] = { description: trimedInput, id: newID, done: false };
    console.log(addedTodos);
    localStorage.setItem("addedTodos", JSON.stringify(addedTodos));
  }
  inputTodo.value = "";
  renderState();
});

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

todoList.addEventListener("click", function (event) {
  const clickedCheckbox = event.target;
  if (
    clickedCheckbox.tagName === "INPUT" &&
    clickedCheckbox.type === "checkbox"
  ) {
    const currentID = event.target.parentElement.id;
    const checkboxDone = event.target.checked;
    console.log(event.target.parentElement.id);
    console.log(checkboxDone);
    const addedTodos = JSON.parse(localStorage.getItem("addedTodos"));
    console.log(addedTodos);
    console.log(addedTodos[currentID]);
    console.log(addedTodos[currentID].done);
    addedTodos[currentID].done = checkboxDone;
    console.log(addedTodos[currentID]);
    localStorage.setItem("addedTodos", JSON.stringify(addedTodos));
  }
  renderState();
});
