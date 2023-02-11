import electron from "./../../assets/electron.png";
import medium from "./../../assets/medium.png";

const articleCardContentList = [
	{
		key: 0,
		title: "Cross Platform Desktop Applications With Electron.js : Zero To Hero",
		desc: "Electron.js is a free and open-source framework that enables developers to create cross-platform desktop applications using web technologies.",
		img: medium,
		langImg: electron,
		link: "https://medium.com/@benmishali/cross-platform-desktop-applications-with-electron-js-zero-to-hero-e37c7f3f6359",
	}
];

export function GetArticlesDataList() {
	return articleCardContentList;
}
