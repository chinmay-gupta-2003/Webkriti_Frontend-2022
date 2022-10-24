"use strict";

const overlay = document.querySelector(".overlay");
const exploreEvent = document.querySelector(".explore--event-popup");
const btnShowEvent = document.querySelectorAll(".btn--explore-event");
const enrollEvent = document.querySelectorAll(".enroll--btn");
const themes = document.querySelector(".color-themes");
const allthemes = document.querySelectorAll(".theme-icon");
const modalEnroll = document.querySelector(".modal--enroll");
const btnShowEnroll = document.querySelectorAll(".enroll--btn");
const btnCloseEnroll = document.querySelector(".btn--close-enroll");

var events = null;

///////////////////////////////////////
//          Render Html              //
///////////////////////////////////////

const getAllEventsCards = async () => {
  const data = await getAllEvents();
  // assign the events data to global events variable so that later on we can map and filter over events if required
  events = data;

  if (!data) {
    console.error("Failed to get events data");
    alert("Failed to get events data Please try refreshing");

    return;
  }

  const eventCardsHtml = data
    .map((event, i) => {
      return Mustache.render(
        document.getElementById("event-card-template").innerHTML,
        { ...event, directionClass: i % 2 === 0 ? "grid-row-1" : "" }
      );
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

  exploreEvent
    .querySelector(".enroll--btn")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      const eventId = parseInt(e.target.getAttribute("data-event-id"));
      openEnroll(e, eventId, "register");
    });
};

///////////////////////////////////////
//          Close Event              //
///////////////////////////////////////

const closeEvent = function () {
  exploreEvent.classList.add("hidden");
  overlay.classList.add("hidden");
};

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !exploreEvent.classList.contains("hidden"))
    closeEvent();
});

overlay.addEventListener("click", function () {
  if (!exploreEvent.classList.contains("hidden")) closeEvent();
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

///////////////////////////////////////
//     Modal window enroll confirm   //
///////////////////////////////////////

const openEnroll = function (e, eventId, operation) {
  e.preventDefault();
  modalEnroll
    .querySelector(".okay--btn")
    .replaceWith(modalEnroll.querySelector(".okay--btn").cloneNode(true));

  modalEnroll
    .querySelector(".okay--btn")
    .addEventListener("click", async (e) => {
      e.preventDefault();

      const { data, message, success } = await manageUserEventregistration(
        eventId,
        operation
      );

      if (!success) {
        alert(message || "Failed to enroll in event");
        closeEnroll();
        return;
      }

      alert("Successfully registered!!");
      closeEnroll();
    });

  modalEnroll
    .querySelector(".cancel--btn")
    .replaceWith(modalEnroll.querySelector(".cancel--btn").cloneNode(true));

  modalEnroll
    .querySelector(".cancel--btn")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      closeEnroll();
    });

  modalEnroll.classList.remove("hidden");
  overlay.classList.remove("hidden");
  closeEvent();
  overlay.classList.remove("hidden");
};

const closeEnroll = function () {
  modalEnroll.classList.add("hidden");
  overlay.classList.add("hidden");
};

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalEnroll.classList.contains("hidden"))
    closeEnroll();
});

overlay.addEventListener("click", function () {
  if (!modalEnroll.classList.contains("hidden")) closeEnroll();
});

document.querySelector(".back--btn").addEventListener("click", function () {
  window.location = "./index.html";
});

// Call on page load

window.addEventListener("load", () => {
  document.querySelector(".loader-container").style.display = "none";
  getAllEventsCards();
});
