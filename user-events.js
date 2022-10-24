"use strict";

const overlay = document.querySelector(".overlay");
const exploreEvent = document.querySelector(".explore--event-popup");
const btnShowEvent = document.querySelectorAll(".btn--explore-event");
const btnCloseEvent = document.querySelector(".btn--close-event");
const modalWithdraw = document.querySelector(".modal--withdraw");
const btnShowWithdraw = document.querySelectorAll(".btn--revoke-event");
const themes = document.querySelector(".color-themes");
const allthemes = document.querySelectorAll(".theme-icon");

var events = null;

///////////////////////////////////////
//          Render Html              //
///////////////////////////////////////

const getAllEventsCards = async () => {
  const data = await getAllUserEvents();

  // assign the events data to global events variable so that later on we can map and filter over events if required
  events = data;

  if (!data) {
    console.error("failed to get events data");
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

  document.querySelector(".features").innerHTML =
    eventCardsHtml !== ""
      ? eventCardsHtml
      : "<span> <a href='./events.html'  style= 'text-decoration:none; display:inline-block; border-bottom:2px solid var(--color-primary-darker); color:var(--color-primary);font-size:2rem;margin-bottom:40vh;letter-spacing:0.84px;font-weight:400'>No events found, please Register !</a></span>";
  document
    .querySelectorAll(".btn--explore-event")
    .forEach((btnModal) => btnModal.addEventListener("click", openEvent));

  document
    .querySelectorAll(".features__img")
    .forEach((btnModal) => btnModal.addEventListener("click", openEvent));

  document.querySelectorAll(".btn--revoke-event").forEach((revokeBtn) => {
    revokeBtn.addEventListener("click", openWithdraw);
  });
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

///////////////////////////////////////
//          Close Event              //
///////////////////////////////////////

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
//        Modal window Withdraw      //
///////////////////////////////////////

const openWithdraw = function (e) {
  e.preventDefault();

  const eventId = parseInt(e.target.getAttribute("data-event-id"));

  modalWithdraw
    .querySelector(".okay--btn-withdraw")
    .replaceWith(
      modalWithdraw.querySelector(".okay--btn-withdraw").cloneNode(true)
    );

  modalWithdraw
    .querySelector(".okay--btn-withdraw")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      const { data, success, message } = await manageUserEventregistration(
        eventId,
        "deregister"
      );
      if (!success) {
        console.log("falied to deregister");
        alert(message);
        closeWithdraw();
        return;
      }
      alert("Successfully deregistered!!");
      getAllEventsCards();
      closeWithdraw();
    });

  modalWithdraw
    .querySelector(".cancel--btn-withdraw")
    .replaceWith(
      modalWithdraw.querySelector(".cancel--btn-withdraw").cloneNode(true)
    );

  modalWithdraw
    .querySelector(".cancel--btn-withdraw")
    .addEventListener("click", async (e) => {
      closeWithdraw();
    });

  modalWithdraw.classList.remove("hidden");
  overlay.classList.remove("hidden");
  closeEvent();
  overlay.classList.remove("hidden");
};

const closeWithdraw = function () {
  modalWithdraw.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnShowWithdraw.forEach((btnModal) => {
  btnModal.addEventListener("click", openWithdraw);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalWithdraw.classList.contains("hidden"))
    closeWithdraw();
});

overlay.addEventListener("click", function () {
  if (!modalWithdraw.classList.contains("hidden")) closeWithdraw();
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

document.querySelector(".back--btn").addEventListener("click", function () {
  window.location = "./index.html";
});

// Call on page load
window.addEventListener("load", () => {
  getAllEventsCards();
});
