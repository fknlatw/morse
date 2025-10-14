import {letters, encryptedLetters} from "./constants.js";
let theme = localStorage.getItem("theme") || "light";
const doc = document;
const inputElement = doc.querySelector(".word");
const decodedElement = doc.querySelector(".decoded");
const themeButton = doc.querySelector(".theme__button");

const debounce = (func, delay) => {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout (() => {
      func(...args);
    }, delay);
  }
}
function handleInput (value) {
  let encrypted = "";
  if(value){
    for(const letter in value){
      for(const lettr in letters) {
        if(value[letter].toUpperCase() === letters[lettr]){
          encrypted += `${encryptedLetters[lettr]} `;
        }
      }
    }

    write(encrypted);
  }
}

const debouncedHandleInput = debounce(handleInput, 1000);

const write = (script) => {
  let text = "";
  let index = 0;
  decodedElement.classList.remove("hide");
  inputElement.disabled = true;

  const type = () => {
    if(index < script.length) {
      text += script.charAt(index);
      index++;
      decodedElement.innerHTML = `${text}`;
      decodedElement.style.height = decodedElement.scrollHeight + "px";
      setTimeout(type, 50);
    }
  }
  
  type();
  inputElement.disabled = false;
}

inputElement.addEventListener("input", async (e) => {
  decodedElement.classList.add("hide");
  decodedElement.innerHTML = ``;
  debouncedHandleInput(e.target.value);
});

themeButton.addEventListener("click", () => {
  if(theme === "light"){
    theme = "dark";
  } else {
    theme = "light";
  }
  setTheme();
});

const setTheme = () => {
  const icon = themeButton.querySelector(".fa");
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
  icon.classList = `fa ${theme === "light"? "fa-moon-o": "fa-sun-o"}`;
}

window.addEventListener("DOMContentLoaded", () => {
  setTheme();
});

window.addEventListener("resize", () => {
  decodedElement.style.height = "auto";
});
