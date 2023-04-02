const fs = require("fs");
const path = require("path");

let version = process.argv[2] || "latest";

console.log("Publish version:", version);

if (!fs.existsSync(path.join(__dirname, "versions"))) {
	fs.mkdirSync(path.join(__dirname, "versions"));
}
if (!fs.existsSync(path.join(__dirname, "./versions/" + version))) {
	console.log("Create folder...");
	fs.mkdirSync(path.join(__dirname, "./versions/" + version));
} else {
	console.log("version already exist");
}

console.log("copy js file...");
fs.copyFileSync(
	path.join(__dirname, "./script.js"),
	path.join(__dirname, "versions", version, "script.js")
);

console.log("copy css file...");
fs.copyFileSync(
	path.join(__dirname, "./style.css"),
	path.join(__dirname, "versions", version, "style.css")
);

console.log("copy README.md file");
fs.copyFileSync(
	path.join(__dirname, "./README.md"),
	path.join(__dirname, "versions", version, "README.md")
);
