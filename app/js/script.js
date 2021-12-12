//variable declarations including the mobile menu animation

const burgerBtn = document.querySelector(".menu-toggle");
const overlay = document.querySelector(".overlay");
const header = document.querySelector("header");
const navContainer = document.querySelector(".nav-container");
const form = document.querySelector(".inbox");
const scrollArea = document.querySelector("#scroll-area");
const bullets = document.querySelectorAll(".bullet");
const inputCont = form.children[0];
const input = inputCont.children[0];
const animation = gsap
  .timeline({
    defaults: {
      duration: 0.5,
      ease: "pow-1",
    },
    reversed: true,
  })
  .to(".overlay", {
    backgroundImage:
      "linear-gradient(to top, rgba(48, 48, 48, 0.85), transparent 95%)",
  })
  .to(".mobile-navlist", { height: "auto", padding: "1rem 0" }, "<0.25");

//what to do whether user clicks on burger button to open or close the mobile nav

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("is-active");

  if (burgerBtn.classList.contains("is-active")) {
    overlay.style.pointerEvents = "auto";
    document.body.style.overflowY = "hidden";
    animation.play();
  } else {
    overlay.style.pointerEvents = "none";
    document.body.style.overflowY = "visible";
    animation.reverse();
  }
});

//the part about navbar being modified on scroll

const options = {
  threshold: 0.75,
};

const observer = new IntersectionObserver(callback, options);

function callback(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      navContainer.id = "scrolling-nav";
    } else {
      navContainer.id = null;
    }
  });
}

observer.observe(header);

//slider

scrollArea.addEventListener("scroll", (e) => {
  let totalScroll = e.target.scrollWidth;
  let scrolled = e.target.scrollLeft;

  let checkPoints = [
    (totalScroll / 4) * 0,
    (totalScroll / 4) * 1,
    (totalScroll / 4) * 2,
    (totalScroll / 4) * 3,
  ];

  if (checkPoints.includes(scrolled)) {
    bullets.forEach((b) => {
      b.classList.remove("active");
      if ((totalScroll / 4) * Number(b.dataset.to) === scrolled) {
        b.classList.add("active");
      }
    });
  }
});

bullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    const scrollOpt = {
      top: 0,
      left: (scrollArea.scrollWidth / 4) * Number(bullet.dataset.to),
      behavior: "smooth",
    };
    scrollArea.scrollTo(scrollOpt);

    bullets.forEach((b) => {
      b.classList.remove("active");
      if (b === bullet) {
        b.classList.add("active");
      }
    });
  });
});

//form validation

form.addEventListener("submit", (e) => {
  if (!input.validity.valid) {
    e.preventDefault();
    inputCont.classList.add("error");
    input.setAttribute("placeholder", "email@example/com");
  }
});

input.addEventListener("input", () => {
  if (input.validity.valid) {
    inputCont.classList.remove("error");
    input.setAttribute("placeholder", "Updates in your inbox…");
  }
});
