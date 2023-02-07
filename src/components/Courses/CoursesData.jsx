import coursera from "./../../assets/coursera.png";
import python from "./../../assets/python.png";
import udemy from "./../../assets/udemy.png";
import angular from "./../../assets/angular.png";
import react from "./../../assets/react.png";
import redux from "./../../assets/redux.png";
import mean from "./../../assets/mean.png";
import qt from "./../../assets/qt.png";
import arch from "./../../assets/architecture.png";
import pluralsight from "./../../assets/pluralsight.png";

const courseCardContentList = [
	{
		key: 0,
		title: "Getting Started with Python",
		desc: "The basics of how one constructs a program from a series of simple instructions in Python",
		img: coursera,
		langImg: python,
		link: "https://www.coursera.org/learn/python",
	},
	{
		key: 1,
		title: "Angular - The Complete Guide (2022 Edition)",
		desc: "Master Angular 13 and build awesome, reactive web apps with the successor of Angular.js",
		img: udemy,
		langImg: angular,
		link: "https://www.udemy.com/course/the-complete-guide-to-angular-2/",
	},
	{
		key: 2,
		title: "Angular & NodeJS - The MEAN Stack Guide [2022 Edition]",
		desc: "Learn how to connect your Angular Frontend to a NodeJS & Express & MongoDB Backend by building a real Application",
		img: udemy,
		langImg: mean,
		link: "https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/",
	},
	{
		key: 4,
		title: "Clean Architecture: Patterns, Practices, and Principles",
		desc: "Learn a set of modern patterns, practices, and principles for creating software architecture that is flexible, testable, and maintainable.",
		img: pluralsight,
		langImg: arch,
		link: "https://app.pluralsight.com/library/courses/clean-architecture-patterns-practices-principles/table-of-contents",
	},
	{
		key: 5,
		title: "React 17: Getting Started",
		desc: "Learn the React way to build rich interactive UIs using both class and function components with React Hooks.",
		img: pluralsight,
		langImg: react,
		link: "https://app.pluralsight.com/library/courses/react-js-getting-started/table-of-contents",
	},
	{
		key: 6,
		title: "Building Applications with React 17 and Redux",
		desc: "Learn how to use React, Redux, React Router, and modern JavaScript to build an app with React.",
		img: pluralsight,
		langImg: redux,
		link: "https://app.pluralsight.com/library/courses/react-redux-react-router-es6/table-of-contents",
	},
	{
		key: 7,
		title: "Integrating Qt Quick 5 with C++",
		desc: "Learn how to integrate your C++ back-end code with your beautiful QML-based Qt Quick GUI",
		img: pluralsight,
		langImg: qt,
		link: "https://app.pluralsight.com/library/courses/integrating-qt-quick-cpp/table-of-contents",
	},
	{
		key: 8,
		title: "Introduction to Qt 5.2 - A C++ Cross Platform Application Framework",
		desc: "This course will get you up to speed quickly on the C++ Qt Framework. Be envious of Java and .NET no more",
		img: pluralsight,
		langImg: qt,
		link: "https://app.pluralsight.com/library/courses/introduction-qt-cplusplus-framework/table-of-contents",
	},
	{
		key: 9,
		title: "Qt Quick 5 Fundamentals",
		desc: "Learn to use Qt Quick to create a modern, fluid, user interface suitable for both mobile and desktop devices",
		img: pluralsight,
		langImg: qt,
		link: "https://app.pluralsight.com/library/courses/qt-quick-fundamentals/table-of-contents",
	},
];

export function GetCoursesDataList() {
	return courseCardContentList;
}
