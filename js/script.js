const form = document.getElementById("form");
const input = document.getElementById("form-add");
const listItems = document.getElementById("list-items");
const button = document.querySelector(".btn");
const check = document.querySelectorAll('input[type="checkbox"]');

const warning = document.querySelector(".warning");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const vl = input.value;

  try {
    createEl(vl);
    removeEl();
  } catch (error) {
    showError(error.message);
  } finally {
    reset();
  }
});

function createEl(value) {
  let regEx = /^[a-zA-Z]+$/;

  if (value === "" || typeof value === "undefined" || typeof value === null) {
    throw new Error("Digite algum caracter");
  } else if (!regEx.test(value)) {
    throw new Error("Digite apenas letras");
  } else {
    const li = document.createElement("li");
    li.setAttribute("class", "item");

    const label = document.createElement("label");
    label.setAttribute("class", "content-label");

    const inputCheck = document.createElement("input");
    inputCheck.setAttribute("type", "Checkbox");

    const spanContent = document.createElement("span");
    spanContent.setAttribute("class", "content");
    spanContent.textContent = value;
    label.append(inputCheck, spanContent);

    const deleteImg = document.createElement("span");
    const img = document.createElement("img");
    img.setAttribute("class", "delete-img");
    img.setAttribute("src", "./assets/icons/Frame-3.svg");

    deleteImg.appendChild(img);

    li.append(label, deleteImg);
    listItems.appendChild(li);
  }
}

function removeEl() {
  const delImg = document.querySelectorAll(".delete-img");

  for (let i = 0; i < delImg.length; i++) {
    delImg[i].addEventListener("click", () => {
      //   listItems.removeChild(delImg[i].parentElement.parentElement);

      delImg[i].parentNode.parentNode.remove();
      showError();
    });
  }
}

function reset() {
  input.value = "";
}

function showError(msg = "O item foi removido da lista") {
  const closeError = document.querySelector(".close-error");
  const warningDesc = document.querySelector(".warning-desc");
  warningDesc.textContent = msg;
  warning.style.opacity = 1;

  setTimeout(() => {
    warning.style.opacity = 0;
  }, 2500);

  closeError.addEventListener("click", () => {
    warning.style.opacity = 0;
  });
}
