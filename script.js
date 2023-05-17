"use strict";

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

	if (options.title !== undefined) {
		let header = header_create({text: options.title});
		options.children.unshift(header);
		page.changeTitle = function (new_text) {
			header.change(new_text);
		}
	}

	if (options.routing !== undefined) {
		if (options.routing.router !== undefined && options.routing.route !== undefined) {
			options.routing.router.addRoute(options.routing.route);
		}
	}

	page.onshow = options.onshow || null;
	_handle_children(page, options);
	document.body.appendChild(page);
	page.show = function () {
		let pages = document.getElementsByClassName("page");
		for (let p of pages) {
			if (p == page) {

				page.style.display = "flex";
				if (page.onshow) {
					page.onshow();
				}
			} else {
				p.style.display = "none";
				if (options.destroyOnHide === true) {
					p.remove();
				}
			}
		}

		page.style.display = "flex";
	}
	return page;
}

/* MESSAGE BOX */
function messagebox_create(options) {
	let overlay = document.createElement("div");
	overlay.className = "overlay center";
	let messagebox = document.createElement("div");
	messagebox.className = "messagebox center";
	_handle_children(messagebox, options);
	overlay.appendChild(messagebox);
	document.body.appendChild(overlay);
	_handle_show_hide(overlay);

	return overlay;
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
	_handle_show_hide(layout);
	return layout;
}

/* HEADER */
function header_create(options) {
	let header = document.createElement("p");
	header.innerText = options.text || "";
	_handle_id(header, options);
	_handle_class(header, "header", options);
	_handle_styles(header, options);
	header.change = function(new_text) {
		this.innerText = new_text;
	}
	_handle_show_hide(header, "block");

	return header;
}

/* TEXT */
function text_create(options) {
	let text = document.createElement("div");
	if(options.text) {
		text.innerText = options.text;
	}

	_handle_id(text, options);
	_handle_class(text, "text", options);
	_handle_styles(text, options);
	text.change = function(new_text) {
		this.innerText = new_text;
	}
	_handle_show_hide(text, "block");
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
	_handle_show_hide(image, "block");
	return image;
}

/* BUTTON */
function button_create(options) {
	let button = document.createElement("button");
	_handle_id(button, options);
	_handle_class(button, options.plain ? "button-plain" : "button", options);

	if(options.label) {
		button.innerText = options.label;
	}
	else {
		_handle_children(button, options);
	}

	_handle_styles(button, options);
	_handle_color(button, options);
	_handle_show_hide(button, "block");
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
	input.type = options.type || "text";
	_handle_color(input, options);
	_handle_show_hide(input, "block");

	let label = document.createElement("label");
	label.innerHTML = input.placeholder;
	label.className = "label";
	_handle_color(label, options);

	let error = document.createElement("span");
	error.innerHTML = "validation failed";
	error.className = "error";
	error.style.display = "none";
	_handle_color(error, options);
	_handle_show_hide(error, "block");

	container.appendChild(input);
	container.appendChild(label);
	container.appendChild(error);

	container.set = function(new_text) {
		this.children[0].value = new_text;
	}

	container.get = function() {
		return this.children[0].value;
	}
	container.valid = function () {
		var value = this.children[0].value;
		let valid = true;

		if (options.validators !== undefined) {
			options.validators.forEach(validator => {
				if (!validator(value)) {
					valid = false;
				}
			});
		}

		if (!valid) {
			error.style.display = "flex";
			error.innerHTML = "Validation failed";
		} else {
			error.style.display = "none";
		}
		return valid;
	}

	return container;
}

class Router {
	constructor() {
	}

	setDefault(defaultPage) {
		this.defaultPage = defaultPage;
	}

	routes = [];

	default() {
		if (this.defaultPage === undefined || this.defaultPage === null) return;
		this.defaultPage.show();
	}

	addRoute(route, pageElement) {
		this.routes.push({route: route, page: pageElement});
	}

	to(route) {
		let page = this.routes.filter(r => r.route === route)[0];
		page.show();
	}
}

/* CHART */
function chart_create(options) {
	let chart = document.createElement("canvas");
	chart.height = options.height || 150;
	chart.width = options.width || 300;
	_handle_id(chart, options);
	_handle_class(chart, "chart", options);
	_handle_styles(chart, options);
	_handle_show_hide(chart, "block");
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
	if(options.border) {
		element.className += " border"
	}
}
function _handle_show_hide(element, defaultShow = "flex") {
	element.show = function() {
		element.style.display = defaultShow;
	}
	element.hide = function() {
		element.style.display = "none";
	}
}

