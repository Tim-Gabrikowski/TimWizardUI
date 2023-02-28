"use strict";

/* page */
function page_create(options) {
	let page = document.createElement("div");
	page.className = "page " + (options.center ? "center " : "") + (options.classes || "");
	page.id = options.id || "page_" + genRanHex(6);

	_handle_styles(page, options);
	page.style.display = options.hide ? "none" : "flex";
	page.style.flexDirection = options.layout || "unset";

	if(options.title && options.title != "") {
		page.appendChild(header_create({text: options.title}));
	}

	if(options.children) {
		options.children.forEach(child => page.appendChild(child));
	}

	_handle_parent(page, options);
	return page;
}

function page_show(page) {
	let pages = document.getElementsByClassName("page");
	for(let c of pages) {
		c.style.display = (c == page) ? "flex" : "none";
	}
}

/* HEADER */
function header_create(options) {
	let header = document.createElement("p");
	header.innerText = options.text || "HEADER TEXT";
	header.className = "header" + (options.classes || "");
	header.id = options.id || "header_" + genRanHex(6);

	_handle_styles(header, options);
	_handle_parent(header, options);
	header.change = function(newText) {
		this.innerText = newText;
	}

	return header;
}

/* TEXT */
function text_create(options) {
	let text = document.createElement("p");
	text.innerHTML = options.text || "text";
	text.id = options.id || "text_" + genRanHex(6);
	text.className = options.classes || "";

	_handle_styles(text, options);
	_handle_parent(text, options);
	text.change = function(newText) {
		this.innerText = newText;
	}

	return text;
}

/* BUTTON */
function button_create(options) {
	let button = document.createElement("button");
	button.id = options.id || "btn_" + genRanHex(6);
	button.className = "button " + (options.classes || "");
	button.innerText = options.label || "BUTTON TEXT";

	_handle_styles(button, options);
	button.style.setProperty("--clr", options.color || "hsl(335deg 100% 47%)");
	_handle_parent(button, options);

	if(options.onclick) {
		button.onclick = options.onclick;
	}

	button.change = function(newText) {
		frontSpan.innerText = newText;
	}

	return button;
}

/* FIELD */
function field_create(options) {
	let ranhex = genRanHex(6);
	let cont = document.createElement("div");
	cont.className = "icont";

	let input = document.createElement("input");
	input.id = options.id || "input_" + ranhex;
	input.className = "input " + (options.classes || "");
	input.value = options.defaultValue || "";
	input.placeholder = options.placeholder || "";
	input.style.setProperty("--clr", options.color || "hsl(335deg 100% 47%)");

	let label = document.createElement("label");
	input.id = options.id || "label_" + ranhex;
	label.for = input.id;
	label.innerHTML = input.placeholder;
	label.className = "label";
	label.style.setProperty("--clr", options.color || "hsl(335deg 100% 47%)");


	_handle_parent(cont, options);

	cont.appendChild(input);
	cont.appendChild(label);
	cont.change = function(newText) {
		this.children[0].value = newText;
	}
	cont.get = function () {
		return this.children[0].value
	}

	return cont;
}

/* UTIL */
/* Generate random hex string of length */
const genRanHex = size => [...Array(size)]
	.map(() => Math.floor(Math.random() * 16).toString(16))
	.join('');

function _handle_styles(elem, options) {
	if(options.style) {
		for(let property in options.style) {
			elem.style[property] = options.style[property];
		}
	}
}

function _handle_parent(elem, options) {
	if(options.parent) {
		document.querySelector(options.parent).appendChild(elem);
	}
}
