import electron from "./../../assets/electron.png";
import medium from "./../../assets/medium.png";
import jest from "./../../assets/jest.png";
import node from "./../../assets/node.png";

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
];

export function GetArticlesDataList() {
  return articleCardContentList;
}
