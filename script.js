"use strict";

/* CONTAINER */
function container_create(options) {
	let container = document.createElement("div");
	container.className = "container " + (options.center ? "center " : "") + (options.classes || "");
	container.id = options.id || "container_" + genRanHex(6);

	_handle_styles(container, options);
	container.style.display = options.hide ? "none" : "flex";

	if(options.title && options.title != "") {
		container.appendChild(header_create({text: options.title}));
	}

	if(options.children) {
		options.children.forEach(child => container.appendChild(child));
	}

	_handle_parent(container, options);
	return container;
}

function container_show(container) {
	let containers = document.getElementsByClassName("container");
	for(let c of containers) {
		c.style.display = (c == container) ? "flex" : "none";
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
	input.change = function(newText) {
		this.value = newText;
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
