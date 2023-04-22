import electron from "./../../assets/electron.png";
import medium from "./../../assets/medium.png";
import jest from "./../../assets/jest.png";
import node from "./../../assets/node.png";
import angular_react_vue from "./../../assets/angular_react_vue.png";
import kpis from "./../../assets/kpis.png";

const articleCardContentList = [
  {
    key: 0,
    title:
      "Cross Platform Desktop Applications With Electron.js : Zero To Hero",
    desc: "Electron.js is a free and open-source framework that enables developers to create cross-platform desktop applications using web technologies.",
    img: medium,
    langImg: electron,
    link: "https://medium.com/@benmishali/cross-platform-desktop-applications-with-electron-js-zero-to-hero-e37c7f3f6359",
  },
  {
    key: 1,
    title: "Node.js Unit Testing with Jest",
    desc: "Jest is a testing framework for JavaScript that was developed by Facebook.",
    img: medium,
    langImg: jest,
    link: "https://medium.com/@ben.dev.io/node-js-unit-testing-with-jest-b7042d7c2ad0",
  },
  {
    key: 2,
    title: "Design Patterns in Node.js",
    desc: "Design patterns are reusable solutions to common programming problems that have been identified and documented over time by experienced programmers.",
    img: medium,
    langImg: node,
    link: "https://medium.com/@ben.dev.io/design-patterns-in-node-js-227673162879",
  },
  {
    key: 3,
    title: "Node.js for Real-Time Communication",
    desc: "In this article, we’ll explore why Node.js is the ideal choice for real-time communication and how to implement it.",
    img: medium,
    langImg: node,
    link: "https://medium.com/@ben.dev.io/node-js-for-real-time-communication-cf71f985f983",
  },
  {
    key: 4,
    title: "Clean Architecture in Node.js",
    desc: "In this article, we will discuss Clean Architecture in Node.js, and explore how to implement it in your Node.js projects with code samples and how applying the concepts on them.",
    img: medium,
    langImg: node,
    link: "https://medium.com/@ben.dev.io/clean-architecture-in-node-js-39c3358d46f3",
  },
  {
    key: 5,
    title:
      "Angular React Vue: Which Framework to Pick for Front-end Development?",
    desc: "Three of the most popular ones are Angular, React, and Vue.js. These frameworks are highly efficient, and they have their own set of strengths and weaknesses.",
    img: medium,
    langImg: angular_react_vue,
    link: "https://medium.com/@ben.dev.io/angular-react-vue-which-framework-to-pick-for-front-end-development-e7c0579fedf8",
  },
  {
    key: 6,
    title: "Best Practices for Building Large-Scale Node.js Applications",
    desc: "In this article, we’ll explore some of the most common challenges and outline best practices for overcoming them.",
    img: medium,
    langImg: node,
    link: "https://medium.com/@ben.dev.io/best-practices-for-building-large-scale-node-js-applications-b45ab29b757a",
  },
  {
    key: 7,
    title: "Distributed Architecture using Node.js",
    desc: "Distributed architecture refers to the design and implementation of software systems that are composed of multiple interconnected components.",
    img: medium,
    langImg: node,
    link: "https://medium.com/@ben.dev.io/distributed-architecture-using-node-js-6931d30424a9",
  },
  {
    key: 8,
    title: "KPIs For Software Development",
    desc: "In this article, we will explore why KPIs are essential for software development, the best KPIs to track includes use cases and some MUST tools to measure them effectively.",
    img: medium,
    langImg: kpis,
    link: "https://medium.com/@ben.dev.io/kpis-for-software-development-d1b52e585b5e",
  },
];

export function GetArticlesDataList() {
  return articleCardContentList;
}
