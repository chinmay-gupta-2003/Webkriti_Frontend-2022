let fontSize = 240;

const mediaQuery = window.matchMedia("(max-width: 40em)");

if (mediaQuery.matches) {
  // Then trigger an alert
  fontSize = 180;
}

const myTags1 = [
  "Robowar",
  "Quantic",
  "Tryst",
  "Ferocia",
  "Techquiz",
  "JAM",
  "Exodia",
  "Technex",
  "Aavhan",
  "Slush",
  "Tarang",
  "Atrang",
  "Basant",
  "Rhythm",
  "Shecodes",
];

// const myTags2 = [
//   "JS",
//   "HTML",
//   "CSS",
//   "API",
//   "DOM",
//   "Style",
//   "Node.js",
//   "Express",
//   "PSQL",
//   "Event10",
//   "Event9",
//   "Event10",
// ];

var tagCloud = TagCloud(".content--1", myTags1, {
  // radius in px
  radius: fontSize,

  // animation speed
  // slow, normal, fast
  maxSpeed: "fast",
  initSpeed: "normal",

  // 0 = top
  // 90 = left
  // 135 = right-bottom
  direction: 0,

  // interact with cursor move on mouse out
  keep: true,
});

// var tagCloud = TagCloud(".content--2", myTags2, {
//   // radius in px
//   radius: 200,

//   // animation speed
//   // slow, normal, fast
//   maxSpeed: "fast",
//   initSpeed: "fast",

//   // 0 = top
//   // 90 = left
//   // 135 = right-bottom
//   direction: 0,

//   // interact with cursor move on mouse out
//   keep: true,
// });
