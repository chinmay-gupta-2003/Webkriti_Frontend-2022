"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnShowModal = document.querySelectorAll(".btn--show-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const modalLogin = document.querySelector(".modal--login");
const overlayLogin = document.querySelector(".overlay--login");
const btnLogin = document.querySelector(".have--login");
const btnCloseLogin = document.querySelector(".btn--close-modal--login");
const signUpForm = document.querySelector(".modal__form");
const btnUser = document.querySelector(".btn--user");
const userEvents = document.querySelector(".user--eve_link");
const signInForm = document.querySelector(".modal__form--login");
const btnSignUp = document.querySelector(".btn--show-modal-cont");
const modalAbout = document.querySelector(".modal--about");
const btnShowAbout = document.querySelectorAll(".about--btn");
const btnCloseAbout = document.querySelector(".btn--close-about");
const modalPrivacy = document.querySelector(".modal--privacy");
const btnShowPrivacy = document.querySelectorAll(".privacy--btn");
const btnClosePrivacy = document.querySelector(".btn--close-privacy");
const modalUse = document.querySelector(".modal--use");
const btnShowUse = document.querySelectorAll(".use--btn");
const btnCloseUse = document.querySelector(".btn--close-use");
const exploreEvent = document.querySelector(".explore--event-popup");
const btnShowEvent = document.querySelectorAll(".btn--explore-event");
const btnCloseEvent = document.querySelector(".btn--close-event");
const modalEnroll = document.querySelector(".modal--enroll");
const btnShowEnroll = document.querySelectorAll(".enroll--btn");
const btnCloseEnroll = document.querySelector(".btn--close-enroll");
const contactUs = document.querySelector(".booking__cont");
const btnShowContact = document.querySelectorAll(".contact-us");
const btnCloseContact = document.querySelector(".btn--close-contact");
const btnLearnMore = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const navLogo = document.querySelector(".nav__logo");
const footerLogo = document.querySelector(".footer__logo");
const navLinksCont = document.querySelector(".nav__links");
const navPane = document.querySelector(".nav");
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
const lazyImages = document.querySelectorAll("img[data-src]");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotsCont = document.querySelector(".dots");
const themes = document.querySelector(".color-themes");
const allthemes = document.querySelectorAll(".theme-icon");
const contactForm = document.querySelector(".contact-us-form");

const navPaneHeight = navPane.getBoundingClientRect().height;
const maxSlide = slides.length - 1;

const userNameCt = document.querySelector(".in-name");
const userEmailCt = document.querySelector(".in-email");
const userPasswordCt = document.querySelector(".in-password");
const userConPassCt = document.querySelector(".in-con--password");
const btnContactUs = document.querySelector(".form_submit--btn");

let i = 0;
let currentSlide = 0;

///////////////////////////////////////
//          Modal window             //
///////////////////////////////////////

const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  userNameCt.value = "";
  userEmailCt.value = "";
  userPasswordCt.value = "";
  userConPassCt.value = "";

  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnShowModal.forEach((btnModal) =>
  btnModal.addEventListener("click", openModal)
);

btnCloseModal.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

overlay.addEventListener("click", function () {
  if (!modal.classList.contains("hidden")) closeModal();
});

///////////////////////////////////////
//         Modal window Login        //
///////////////////////////////////////

const openModalLogin = function (e) {
  e.preventDefault();
  closeModal();
  modalLogin.classList.remove("hidden");
  overlayLogin.classList.remove("hidden");
};

const closeModalLogin = function () {
  modalLogin.classList.add("hidden");
  overlayLogin.classList.add("hidden");
};

btnLogin.addEventListener("click", openModalLogin);
btnCloseLogin.addEventListener("click", closeModalLogin);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalLogin.classList.contains("hidden"))
    closeModalLogin();
});

overlayLogin.addEventListener("click", function () {
  if (!modalLogin.classList.contains("hidden")) closeModalLogin();
});

///////////////////////////////////////
//            Signup Data            //
///////////////////////////////////////

signUpForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const userEmail = userEmailCt.value;
  const userName = userNameCt.value;
  const userPassword = userPasswordCt.value;
  const userConPass = userConPassCt.value;

  if (!(userPassword === userConPass)) return alert("Password Incorrect");

  const signupResponse = await signupUser(userEmail, userName, userPassword);

  console.log(signupResponse);

  if (signupResponse.success) {
    alert(`${userName} Successfully Registered !`);
    openModalLogin(e);
  }
});

///////////////////////////////////////
//            Signin Data            //
///////////////////////////////////////

const signInState = function () {
  btnSignUp.classList.add("hide");
  btnUser.classList.remove("hide");
  userEvents.classList.remove("hide");
};

const signUpState = function () {
  btnSignUp.classList.remove("hide");
  btnUser.classList.add("hide");
  userEvents.classList.add("hide");
};

signInForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  let userInEmail, userInPassword;

  userInEmail = document.querySelector(".sin--email").value;
  userInPassword = document.querySelector(".sin--pass").value;

  const signinResponse = await signInUser(userInEmail, userInPassword);

  if (!signinResponse) {
    console.log("failed to sign in user");
    return;
  }

  console.log("Signed in succesfully!!");

  closeModalLogin();

  signInState();
});

///////////////////////////////////////
//                Logout             //
///////////////////////////////////////

btnUser.addEventListener("click", function () {
  signUpState();
  localStorage.removeItem("access_token");
});

///////////////////////////////////////
//        Modal window About         //
///////////////////////////////////////

const openAbout = function (e) {
  e.preventDefault();
  modalAbout.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeAbout = function () {
  modalAbout.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnShowAbout.forEach((btnModal) =>
  btnModal.addEventListener("click", openAbout)
);

btnCloseAbout.addEventListener("click", closeAbout);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalAbout.classList.contains("hidden"))
    closeAbout();
});

overlay.addEventListener("click", function () {
  if (!modalAbout.classList.contains("hidden")) closeAbout();
});

///////////////////////////////////////
//        Modal window privacy       //
///////////////////////////////////////

const openPrivacy = function (e) {
  e.preventDefault();
  modalPrivacy.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closePrivacy = function () {
  modalPrivacy.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnShowPrivacy.forEach((btnModal) =>
  btnModal.addEventListener("click", openPrivacy)
);

btnClosePrivacy.addEventListener("click", closePrivacy);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalPrivacy.classList.contains("hidden"))
    closePrivacy();
});

overlay.addEventListener("click", function () {
  if (!modalPrivacy.classList.contains("hidden")) closePrivacy();
});

///////////////////////////////////////
//      Modal window term of use     //
///////////////////////////////////////

const openUse = function (e) {
  e.preventDefault();
  modalUse.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeUse = function () {
  modalUse.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnShowUse.forEach((btnModal) => btnModal.addEventListener("click", openUse));

btnCloseUse.addEventListener("click", closeUse);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalUse.classList.contains("hidden")) closeUse();
});

overlay.addEventListener("click", function () {
  if (!modalUse.classList.contains("hidden")) closeUse();
});

///////////////////////////////////////
//       Render Html Event           //
///////////////////////////////////////

const getAllEventsCards = async () => {
  const data = await getAllEvents();
  // assign the events data to global events variable so that later on we can map and filter over events if required
  events = data;

  if (!data) {
    console.error("failed to get events data");
    alert("Failed to get events data Please try refreshing");
    return;
  }

  const eventCardsHtml = data
    .map((event, i) => {
      if (i < 3) {
        return Mustache.render(
          document.getElementById("event-card-template").innerHTML,
          { ...event, directionClass: i % 2 === 0 ? "grid-row-1" : "" }
        );
      }
    })
    .join("");

  document.querySelector(".features").innerHTML = eventCardsHtml;

  document
    .querySelectorAll(".btn--explore-event")
    .forEach((btnModal) => btnModal.addEventListener("click", openEvent));

  document
    .querySelectorAll(".features__img")
    .forEach((btnModal) => btnModal.addEventListener("click", openEvent));
};

const getLocalTime = (time) => {
  const timeObj = new Date(time);
  return timeObj.toLocaleString().split(",")[0];
};

///////////////////////////////////////
//          Open Event               //
///////////////////////////////////////

const openEvent = function (e) {
  e.preventDefault();
  if (!events) {
    alert("Please try reloading, error in fetching the events");
    return;
  }
  const eventTargetId = e.target.getAttribute("data-event-id");

  const eventData = events.find(
    (event) => event.id === parseInt(eventTargetId)
  );

  exploreEvent.innerHTML = Mustache.render(
    document.getElementById("event-popup-template").innerHTML,
    {
      ...eventData,
      startdate: getLocalTime(eventData.startdate),
      enddate: getLocalTime(eventData.enddate),
    }
  );

  exploreEvent.classList.remove("hidden");
  overlay.classList.remove("hidden");

  document
    .querySelector(".btn--close-event")
    .addEventListener("click", closeEvent);
};

const closeEvent = function () {
  exploreEvent.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnShowEvent.forEach((btnModal) =>
  btnModal.addEventListener("click", openEvent)
);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !exploreEvent.classList.contains("hidden"))
    closeEvent();
});

overlay.addEventListener("click", function () {
  if (!exploreEvent.classList.contains("hidden")) closeEvent();
});

///////////////////////////////////////
//     Modal window enroll confirm   //
///////////////////////////////////////

const openEnroll = function (e) {
  e.preventDefault();
  modalEnroll.classList.remove("hidden");
  overlay.classList.remove("hidden");
  closeEvent();
  overlay.classList.remove("hidden");
};

const closeEnroll = function () {
  modalEnroll.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnShowEnroll.forEach((btnModal) =>
  btnModal.addEventListener("click", openEnroll)
);

btnCloseEnroll.addEventListener("click", closeEnroll);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalEnroll.classList.contains("hidden"))
    closeEnroll();
});

overlay.addEventListener("click", function () {
  if (!modalEnroll.classList.contains("hidden")) closeEnroll();
});

///////////////////////////////////////
//          Contact Us               //
///////////////////////////////////////

const openContact = function (e) {
  e.preventDefault();
  contactUs.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeContact = function () {
  contactUs.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnShowContact.forEach((btnModal) =>
  btnModal.addEventListener("click", openContact)
);

btnCloseContact.addEventListener("click", closeContact);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !contactUs.classList.contains("hidden"))
    closeContact();
});

overlay.addEventListener("click", function () {
  if (!contactUs.classList.contains("hidden")) closeContact();
});

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Feedback Sent 💌");
  closeContact();
});

///////////////////////////////////////
//     Smooth scrolling learn more   //
///////////////////////////////////////

btnLearnMore.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////
//          Page navigation          //
///////////////////////////////////////

navLogo.addEventListener("click", function () {
  document.querySelector(".header").scrollIntoView({ behavior: "smooth" });
});

footerLogo.addEventListener("click", function () {
  document.querySelector(".header").scrollIntoView({ behavior: "smooth" });
});

navLinksCont.addEventListener("click", function (e) {
  const target = e.target;

  if (
    e.target.classList.contains("nav__link--btn") ||
    e.target.classList.contains("user-eve-link") ||
    e.target.classList.contains("all-events")
  )
    return;

  e.preventDefault();

  if (target.classList.contains("nav__link")) {
    const id = target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////////////////////////////////
//        Navigation Fade            //
///////////////////////////////////////

const navHoverFade = function (e, opacity) {
  const navLink = e.target;

  if (navLink.classList.contains("nav__link")) {
    const siblings = navLink.closest(".nav").querySelectorAll(".nav__link");

    siblings.forEach((link) => {
      if (link !== navLink) link.style.opacity = opacity;
    });

    document.querySelector("#logo").style.opacity = opacity;
  }
};

navPane.addEventListener("mouseover", function (e) {
  navHoverFade(e, 0.64);
});
navPane.addEventListener("mouseout", function (e) {
  navHoverFade(e, 1);
});

///////////////////////////////////////
//        Sticky Navigation          //
///////////////////////////////////////

const stickyCallBack = function (entries) {
  const entry = entries[0];

  if (!entry.isIntersecting) navPane.classList.add("sticky");
  else navPane.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyCallBack, {
  root: null,
  threshold: 0,
  rootMargin: `-${navPaneHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
//         Revealing Sections        //
///////////////////////////////////////

const sectionCallBack = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");

  if (entry.target.querySelectorAll("h3")) {
    entry.target
      .querySelectorAll("h3")
      .forEach(
        (item) =>
          (item.style.animation = `move-to-${
            i % 2 === 0 ? "right" : "left"
          } 0.7s ease-out 0.28s backwards`)
      );
  }

  if (entry.target.querySelectorAll("h2")) {
    entry.target
      .querySelectorAll("h2")
      .forEach(
        (item) =>
          (item.style.animation = `move-to-${
            i % 2 === 0 ? "left" : "right"
          } 0.7s ease-out 0.28s backwards`)
      );
  }

  if (entry.target.querySelector(".appear--animation-2")) {
    entry.target.querySelector(".appear--animation-2").style.animation =
      "appear 0.7s ease-out 0.64s backwards";
  }

  i++;

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionCallBack, {
  root: null,
  threshold: 0.2,
});

allSections.forEach((section) => {
  section.classList.add("section--hidden");
  sectionObserver.observe(section);
});

///////////////////////////////////////
//            Lazy Loading           //
///////////////////////////////////////

const imgCallBack = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const lazyImgObserver = new IntersectionObserver(imgCallBack, {
  root: null,
  threshold: 0,
  rootMargin: "100px",
});

lazyImages.forEach((img) => lazyImgObserver.observe(img));

///////////////////////////////////////
//         Tabbed Components         //
///////////////////////////////////////

tabsContainer.addEventListener("click", function (e) {
  const tabClicked = e.target.closest(".operations__tab");

  if (!tabClicked) return;

  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabClicked.classList.add("operations__tab--active");

  const tabNumberActive = tabClicked.getAttribute("data-tab");
  const tabDataActive = document.querySelector(
    `.operations__content--${tabNumberActive}`
  );

  tabsContent.forEach((tab) =>
    tab.classList.remove("operations__content--active")
  );
  tabDataActive.classList.add("operations__content--active");
});

///////////////////////////////////////
//             Slider                //
///////////////////////////////////////

const goToSlide = function (slidePass) {
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - slidePass)}%)`)
  );
};

const createDots = function () {
  slides.forEach((_, i) => {
    dotsCont.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot dots__dot--active" data-slide="${i}"></button>`
    );
  });
};

const activateDots = function (dotActive) {
  const allDots = document.querySelectorAll(".dots__dot");

  allDots.forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${dotActive}"]`)
    .classList.add("dots__dot--active");
};

const nextSlide = function () {
  if (currentSlide === maxSlide) currentSlide = 0;
  else currentSlide++;

  goToSlide(currentSlide);
  activateDots(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) currentSlide = maxSlide;
  else currentSlide--;

  goToSlide(currentSlide);
  activateDots(currentSlide);
};

goToSlide(currentSlide);
createDots();
activateDots(currentSlide);

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", previousSlide);

dotsCont.addEventListener("click", function (e) {
  if (!e.target.classList.contains("dots__dot")) return;

  const slideActive = e.target.dataset.slide;

  goToSlide(slideActive);
  activateDots(slideActive);
});

///////////////////////////////////////
//            Color Themes           //
///////////////////////////////////////

themes.addEventListener("click", function (e) {
  e.preventDefault();

  if (!e.target.classList.contains("theme-icon")) return;

  const target = e.target;

  const color = target.dataset.theme;

  allthemes.forEach((element) => element.classList.remove("theme-active"));
  target.classList.add("theme-active");

  document.querySelector("html").setAttribute("data-theme", color);

  navLogo.setAttribute("src", `./img/${color}.png`);

  footerLogo.setAttribute("src", `./img/${color}.png`);
});

document
  .querySelector(".btn--explore-all-events")
  .addEventListener("click", function () {
    window.location = "./events.html";
  });

document.querySelector(".user-eve-link").addEventListener("click", function () {
  window.location = "./user-events.html";
});

window.addEventListener("load", async () => {
  document.querySelector(".loader-container").style.display = "none";

  getAllEventsCards();

  if (await isAccessToken()) signInState();
});
