function tally() {
  let condt = 0;
  for (let i = 1; i <= 6; i++) {
    if (document.guicheck["Item" + i].checked) {
      condt += Math.pow(2, i - 1);
    }
  }

  let output = "Angka yang Anda pikirkan adalah " + condt;
  document.guicheck.output.value = output;
}

function changeImage(imageId, newImage) {
  document.getElementById(imageId).innerHTML =
    '<img src="/assets/images/' + newImage + '" />';
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
      particle.classList.add("star"); // Menandai partikel sebagai bintang kecil
    }
    particle.style.left = Math.random() * (window.innerWidth - 20) + "px";
    particle.style.top = Math.random() * (header.offsetHeight - 20) + "px";
    header.appendChild(particle);

    // setTimeout(() => {
    //   particle.remove();
    // }, 5000);
  }

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

  // Periksa apakah nama pengguna sudah disimpan di localStorage
  const savedName = localStorage.getItem("userName");

  // Jika nama pengguna belum ada, tampilkan splash screen
  if (!savedName) {
    splashScreen.style.display = "block";
  }

  // Mengambil data dari localStorage
  const statistikData = JSON.parse(localStorage.getItem("statistikData")) || {
    ditebakBenar: 0,
    ditebakSalah: 0,
    totalPercobaan: 0,
  };

  // Menampilkan data statistik ke dalam elemen ul
  const statistikList = document.getElementById("statistik-list");
  statistikList.innerHTML = `
        <li>Ditebak Benar   : ${statistikData.ditebakBenar}</li>
        <li>Ditebak Salah   : ${statistikData.ditebakSalah}</li>
        <li>Total Percobaan : ${statistikData.totalPercobaan}</li>
    `;

  // Mengatur tampilan aside1
  const aside1 = document.querySelector(".aside1");
  aside1.style.background = "#08070D";
  aside1.style.color = "#fff";
  aside1.style.textAlign = "left"; // Menyusun teks ke kiri

  // CSS untuk mengatur ":" pada satu garis
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

  // Mengatur tampilan aside2
  const aside2 = document.querySelector(".aside2");
  aside2.style.background = "#7C3B7A";
  aside2.style.color = "#fff";
  aside2.style.textAlign = "center"; // Menyusun teks ke kiri
});
