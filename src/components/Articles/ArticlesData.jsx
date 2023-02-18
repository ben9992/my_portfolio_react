import electron from "./../../assets/electron.png";
import medium from "./../../assets/medium.png";
import jest from "./../../assets/jest.png";

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
];

export function GetArticlesDataList() {
  return articleCardContentList;
}
