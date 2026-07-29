const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".main-nav");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const counters = document.querySelectorAll("[data-count]");
let countersStarted = false;

const statsObserver = new IntersectionObserver(
  (entries) => {
    if (!entries[0].isIntersecting || countersStarted) return;
    countersStarted = true;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.count);
      const duration = 1300;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(target * eased).toLocaleString("sv-SE");

        if (progress < 1) requestAnimationFrame(updateCounter);
        else {
          counter.textContent =
            target === 2500 ? "2 500+" :
            target === 98 ? "98" :
            target === 10 ? "10+" :
            "6";
        }
      };

      requestAnimationFrame(updateCounter);
    });

    statsObserver.disconnect();
  },
  { threshold: 0.35 }
);

const statsSection = document.querySelector(".stats");
if (statsSection) statsObserver.observe(statsSection);

const bookingForm = document.querySelector("#bookingForm");
const formMessage = document.querySelector("#formMessage");

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = new FormData(bookingForm).get("name").trim();
  formMessage.textContent = `Tack ${name}! Din fÃ¶rfrÃ¥gan Ã¤r registrerad i demon.`;
  bookingForm.reset();

  setTimeout(() => {
    formMessage.textContent = "";
  }, 6000);
});

