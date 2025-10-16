import { letters, encryptedLetters } from "./constants.js";
let theme = localStorage.getItem("theme") || "light";
let type = "incrypt";
const doc = document;
const inputElement = doc.querySelector(".word");
const decodedElement = doc.querySelector(".decoded");
const themeButton = doc.querySelector(".theme__button");
const switcher = doc.querySelector(".switcher");

switcher.addEventListener("click", () => {
  const types = switcher.querySelectorAll(".type");

  if (
    types[0].classList.contains("active") &&
    types[0].dataset.type === "incrypt"
  ) {
    types[0].classList.remove("active");
    type = types[1].dataset.type;
    types[1].classList.add("active");
  } else {
    types[1].classList.remove("active");
    type = types[0].dataset.type;
    types[0].classList.add("active");
  }
});

const debounce = (func, delay) => {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
function handleInput(value) {
  let crypted = "";

  if (value) {
    if (type === "decrypt") {
      const splittedWords = value.split("/");

      splittedWords.map((word, index) => {
        const splittedLetters = word.split(" ");

        if (index > 0) {
          crypted += " ";
        }

        splittedLetters.map((letter) => {
          if (letter === "") {
            return;
          }

          const letterIndex = encryptedLetters.indexOf(letter);

          if (letterIndex !== -1) {
            crypted += `${letters[letterIndex]}`;
          }
        });
      });
    } else {
      for (const letter in value) {
        for (const lettr in letters) {
          if (value[letter].toUpperCase() === letters[lettr]) {
            crypted += `${encryptedLetters[lettr]} `;
          }
        }
      }
    }

    write(crypted);
    inputElement.value = "";
  }
}

const debouncedHandleInput = debounce(handleInput, 3000);

const write = (script) => {
  let text = "";
  let index = 0;
  decodedElement.classList.remove("hide");
  inputElement.disabled = true;

  const type = () => {
    if (index < script.length) {
      text += script.charAt(index);
      index++;
      decodedElement.innerHTML = `${text}`;
      decodedElement.style.height = decodedElement.scrollHeight + "px";
      setTimeout(type, 50);
    }
  };

  type();
  inputElement.disabled = false;
};

inputElement.addEventListener("input", async (e) => {
  decodedElement.classList.add("hide");
  decodedElement.innerHTML = ``;
  debouncedHandleInput(e.target.value);
});

themeButton.addEventListener("click", () => {
  if (theme === "light") {
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
  icon.classList = `fa ${theme === "light" ? "fa-moon-o" : "fa-sun-o"}`;
};

window.addEventListener("DOMContentLoaded", () => {
  setTheme();
});

window.addEventListener("resize", () => {
  decodedElement.style.height = "auto";
});
