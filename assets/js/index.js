function tally() {
  let condt = 0;
  for (let i = 1; i <= 6; i++) {
    const truthy = localStorage.getItem("step" + i) === "true";
    if (truthy) {
      condt += Math.pow(2, i - 1);
    }
  }
  return condt;
}

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  let i = 0;
  function createParticleWithDelay() {
    if (i < 20) {
      createParticle(i % 2 === 0);
      i++;
      setTimeout(createParticleWithDelay, 300);
    }
  }

  createParticleWithDelay();

  function createParticle(isStar = false) {
    const particle = document.createElement("div");
    particle.classList.add("particles");
    if (isStar) {
      particle.classList.add("star");
    }
    particle.style.left = Math.random() * (window.innerWidth - 20) + "px";
    particle.style.top = Math.random() * (header.offsetHeight - 20) + "px";
    header.appendChild(particle);

    // setTimeout(() => {
    //   particle.remove();
    // }, 5000);
  }
  let correctGuesses = localStorage.getItem("correctGuesses");
  let incorrectGuess = localStorage.getItem("incorrectGuess");
  let totalAttempts = localStorage.getItem("totalAttempts");
  const splashScreen = document.getElementById("splash-screen");
  const userNameInput = document.getElementById("user-name-input");
  const submitButton = document.getElementById("submit-name");
  const backgroundMusic = new Audio("../assets/bgm/sgm.mp3");
  const userName = localStorage.getItem("userName");
  submitButton.addEventListener("click", function () {
    const userName = userNameInput.value;

    if (userName) {
      localStorage.setItem("userName", userName);
      splashScreen.style.display = "none";
      backgroundMusic.play();
      location.reload();
    }
  });

  const savedName = localStorage.getItem("userName");

  if (!savedName) {
    splashScreen.style.display = "block";
  }

  const statistikList = document.getElementById("statistik-list");
  statistikList.innerHTML = `
        <li>Ditebak Benar   : ${correctGuesses || 0}</li>
        <li>Ditebak Salah   : ${incorrectGuess || 0}</li>
        <li>Total Percobaan : ${totalAttempts || 0}</li>
    `;

  const aside1 = document.querySelector(".aside1");
  aside1.style.background = "#08070D";
  aside1.style.color = "#fff";
  aside1.style.textAlign = "left";

  const statistikListItems = statistikList.querySelectorAll("li");
  statistikListItems.forEach((item) => {
    item.style.display = "flex";
    item.style.justifyContent = "space-between";
  });

  const avatarElement = document.getElementById("profile-avatar");
  avatarElement.src = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${userName}`;

  const profilNameElement = document.getElementById("profile-name");
  if (userName) {
    profilNameElement.textContent = `${userName}`;
  }

  const aside2 = document.querySelector(".aside2");
  aside2.style.background = "#7C3B7A";
  aside2.style.color = "#fff";
  aside2.style.textAlign = "center";

  const arrays = [
    [
      1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 39, 41,
      43, 45, 47, 49,
    ],
    [
      2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31, 34, 35, 38,
      39, 42, 43, 46, 47, 50,
    ],
    [
      4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38,
      39, 44, 45, 46, 47,
    ],
    [
      8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31, 40, 57, 58,
      59, 60, 61, 62, 63,
    ],
    [
      16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 48, 49,
      50,
    ],
    [
      32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      50,
    ],
    [],
  ];

  const startButton = document.querySelector(".start-button");
  const artikel = document.getElementById("beranda");
  let currentIndex = 0;

  startButton.addEventListener("click", function () {
    showArticle(currentIndex);
    currentIndex++;
    if (currentIndex >= arrays.length) {
      startButton.disabled = true;
    }
  });

  function showArticle(index) {
    artikel.innerHTML = "";

    const articleContainer = document.createElement("div");
    articleContainer.classList.add("article");

    if (index < arrays.length - 1) {
      const magicianImg = document.createElement("img");
      magicianImg.classList.add("magician-img");
      magicianImg.src = "assets/images/guessing.png";
      magicianImg.alt = "Magician";

      articleContainer.appendChild(magicianImg);
    }

    if (index < arrays.length - 1) {
      const step = document.createElement("div");
      step.classList.add("chip");
      step.innerHTML = arrays[index].map((num) => `<div>${num}</div>`).join("");

      articleContainer.appendChild(step);

      const question = document.createElement("p");
      question.textContent =
        "Apakah angka yang anda fikirkan ada dalam deret angka diatas ?";
      articleContainer.appendChild(question);

      const yesButton = document.createElement("button");
      yesButton.classList.add("button-yes");
      yesButton.textContent = "Ya";
      yesButton.addEventListener("click", function () {
        saveToLocalStorage(`step${index + 1}`, true);
        showNextArticle();
      });

      const noButton = document.createElement("button");
      noButton.classList.add("button-no");
      noButton.textContent = "Tidak";
      noButton.addEventListener("click", function () {
        saveToLocalStorage(`step${index + 1}`, false);
        showNextArticle();
      });

      articleContainer.appendChild(yesButton);
      articleContainer.appendChild(noButton);
    } else {
      const answerImg = document.createElement("img");
answerImg.src = "assets/images/answer-tr.png";
answerImg.alt = "Answer";
answerImg.classList.add("answer-img");

const resultText = document.createElement("h1");
resultText.textContent = tally();
resultText.classList.add("answer-text");

const splashText = document.createElement("p");
splashText.classList.add("splash-text");
splashText.textContent = "Apakah tebakan saya benar ?";

const startAgainButtonY = document.createElement("button");
startAgainButtonY.classList.add("button-yes");
startAgainButtonY.textContent = "Ya";
startAgainButtonY.addEventListener("click", function () {
  // Perbarui nilai dalam variabel dan simpan dalam localStorage
  correctGuesses = (+correctGuesses || 0) + 1;
  totalAttempts = (+totalAttempts || 0) + 1;
  saveToLocalStorage("correctGuesses", correctGuesses);
  saveToLocalStorage("totalAttempts", totalAttempts);
  location.reload();
});

const startAgainButtonN = document.createElement("button");
startAgainButtonN.classList.add("button-no");
startAgainButtonN.textContent = "Tidak";
startAgainButtonN.addEventListener("click", function () {
  // Perbarui nilai dalam variabel dan simpan dalam localStorage
  incorrectGuess = (+incorrectGuess || 0) + 1;
  totalAttempts = (+totalAttempts || 0) + 1;
  saveToLocalStorage("incorrectGuess", +incorrectGuess);
  saveToLocalStorage("totalAttempts", +totalAttempts);
  location.reload();
});

articleContainer.appendChild(answerImg); // Menambahkan img terlebih dahulu
articleContainer.appendChild(resultText); // Kemudian menambahkan h1
articleContainer.appendChild(splashText);
articleContainer.appendChild(startAgainButtonY);
articleContainer.appendChild(startAgainButtonN);

    }

    artikel.appendChild(articleContainer);
  }

  function showNextArticle() {
    if (currentIndex < arrays.length) {
      showArticle(currentIndex);
      currentIndex++;
      if (currentIndex >= arrays.length) {
        startButton.disabled = true;
      }
    } else {
      currentIndex = 0;
      startButton.disabled = false;
    }
  }

  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }
});
