const addbutton = document.querySelector(".add-button")
const mainBox = document.querySelector(".main-box")
const input = document.querySelector(".input")

DisplayTodos()

function setCokie(name, value) {
    const expires = new Date();
    expires.setMonth(expires.getMonth() + 1);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
}

function getCokie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
}

function deleteTodoFromCookie(name) {
    let cokieValues = JSON.parse(getCokie("todos")) || [];
    cokieValues = cokieValues.filter((item) => item.name !== name);
    setCokie("todos", JSON.stringify(cokieValues));
}

function addClassToCookie(text, className) {
    let cokieValues = JSON.parse(getCokie("todos")) || [];
    cokieValues.forEach((item) => {
        if (item.name === text) {
            item.className = className;
        }
    });
    setCokie("todos", JSON.stringify(cokieValues));
}

function DisplayTodos() {
    const cokieValues = JSON.parse(getCokie("todos")) || [];
    cokieValues.forEach((item) => {
        const box = document.createElement("div");
        box.classList.add("box");
        mainBox.appendChild(box);

        const span = document.createElement("span");
        span.classList.add("span");
        if (item.className) {
            span.classList.add(item.className); // Применяем сохранённый класс
        }
        span.textContent = item.name;
        box.appendChild(span);

        const donebutton = document.createElement("button");
        donebutton.classList.add("done-button");
        donebutton.textContent = "Done";
        box.appendChild(donebutton);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("remove-button");
        deleteButton.textContent = "Remove";
        box.appendChild(deleteButton);
    });
}

addbutton.addEventListener("click", () => {
    if (input.value.trim() !== "") {
        const box = document.createElement("div");
        box.classList.add("box");
        mainBox.appendChild(box);

        const span = document.createElement("span");
        span.classList.add("span");
        span.textContent = input.value;
        box.appendChild(span);

        const donebutton = document.createElement("button");
        donebutton.classList.add("done-button");
        donebutton.textContent = "Done";
        box.appendChild(donebutton);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("remove-button");
        deleteButton.textContent = "Remove";
        box.appendChild(deleteButton);

        input.classList.remove("error-input");
        input.placeholder = "Enter your todo...";

        const TodoTexts = getCokie("todos");
        let cokieValues = TodoTexts ? JSON.parse(TodoTexts) : [];
        cokieValues.push({ name: input.value, className: "" });
        setCokie("todos", JSON.stringify(cokieValues));

        input.value = "";
    } else {
        input.classList.add("error-input");
        input.placeholder = "Enter todo!!!";
    }
});

mainBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-button")) {
        const box = e.target.closest(".box");
        deleteTodoFromCookie(box.children[0].textContent);
        box.remove();
    }

    if (e.target.classList.contains("done-button")) {
        const anotherBox = e.target.closest(".box");
        const todoText = anotherBox.children[0];
        addClassToCookie(todoText.textContent, "line");
        todoText.classList.add("line");
    }
});
