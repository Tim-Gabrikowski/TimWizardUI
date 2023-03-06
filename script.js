"use strict";

import "./style.css";

let touch_device = (('ontouchstart' in window) ||
	(navigator.maxTouchPoints > 0) ||
	(navigator.msMaxTouchPoints > 0));

/* PAGE */
function page_create(options) {
	let page = document.createElement("div");
	_handle_id(page, options);
	_handle_class(page, "page " + (options.center ? "center " : ""), options);
	_handle_styles(page, options);
	page.style.flexDirection = options.type || "column";
	if(options.title) {
		options.children.unshift(header_create({ text: options.title }));
	}

	_handle_children(page, options);
	document.body.appendChild(page);
	return page;
}

function page_show(current) {
	let pages = document.getElementsByClassName("page");
	for(let page of pages) {
		page.style.display = (page == current) ? "flex" : "none";
	}
}

/* LAYOUT */
function layout_create(options) {
	let layout = document.createElement("div");
	_handle_id(layout, options);
	_handle_class(layout, "layout", options);
	layout.style.flexDirection = options.type || "column";
	_handle_styles(layout, options);
	_handle_children(layout, options);

	_handle_border(layout, options);
	_handle_color(layout, options);
	return layout;
}

/* HEADER */
function header_create(options) {
	let header = document.createElement("p");
	header.innerText = options.text || "HEADER";
	_handle_id(header, options);
	_handle_class(header, "header", options);
	_handle_styles(header, options);
	header.change = function(new_text) {
		this.innerText = new_text;
	}

	return header;
}

/* TEXT */
function text_create(options) {
	let text = document.createElement("div");
	text.innerText = options.text || "TEXT";
	_handle_id(text, options);
	_handle_class(text, "text", options);
	_handle_styles(text, options);
	text.change = function(new_text) {
		this.innerText = new_text;
	}

	return text;
}

/* IMAGE */
function image_create(options) {
	let image = document.createElement("img");
	image.alt = options.alt || "";
	image.src = options.src || "";
	_handle_id(image, options);
	_handle_class(image, "image", options);
	_handle_styles(image, options);
	return image;
}

/* BUTTON */
function button_create(options) {
	let button = document.createElement("button");
	_handle_id(button, options);
	_handle_class(button, "button", options);
	if(options.label) {
		button.innerText = options.label || "BUTTON";
	}
	else {
		_handle_children(button, options);
	}

	_handle_styles(button, options);
	_handle_color(button, options);
	if(touch_device) {
		if(options.onclick) {
			button.onclick = function() {
				setTimeout(options.onclick, 500);
			}
		}
	}
	else {
		if(options.onclick) {
			button.onclick = options.onclick;
		}
	}

	button.change = function(newText) {
		frontSpan.innerText = newText;
	}

	return button;
}

/* FIELD */
function field_create(options) {
	let container = document.createElement("div");
	container.className = "input-container";

	let input = document.createElement("input");
	_handle_id(input, options);
	_handle_class(input, "input", options);
	input.value = options.value || "";
	input.placeholder = options.placeholder || "";
	_handle_color(input, options);

	let label = document.createElement("label");
	label.innerHTML = input.placeholder;
	label.className = "label";
	_handle_color(label, options);

	container.appendChild(input);
	container.appendChild(label);
	container.set = function(new_text) {
		this.children[0].value = new_text;
	}

	container.get = function() {
		return this.children[0].value;
	}

	return container;
}

/* CHART */
function chart_create(options) {
	let chart = document.createElement("canvas");
	chart.height = options.height || 150;
	chart.width = options.width || 300;
	_handle_id(chart, options);
	_handle_class(chart, "chart", options);
	_handle_styles(chart, options);
	return chart;
}

/* UTIL */
function _handle_styles(element, options) {
	if(options.style) {
		for(let property in options.style) {
			element.style[property] = options.style[property];
		}
	}
}

function _handle_id(element, options) {
	if(options.id) {
		element.id = options.id;
	}
}

function _handle_class(element, default_class, options) {
	element.className = default_class + " " + (options.classes || "");
}

function _handle_color(element, options) {
	element.style.setProperty("--clr", options.color || "#FFFFFF");
}

function _handle_children(element, options) {
	if(options.children) {
		options.children.forEach(child => element.appendChild(child));
	}
}
function _handle_border(element, options) {
	if(options.border){
		element.className += " border"
	}
}

document.body.className = "center";

