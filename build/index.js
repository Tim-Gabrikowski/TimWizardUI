function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "header_create", () => $650934f729b0bf11$export$2e2f1a8b6d4607c2);
$parcel$export(module.exports, "page_show", () => $650934f729b0bf11$export$49c4650fa4053fe0);
$parcel$export(module.exports, "layout_create", () => $650934f729b0bf11$export$b9180922d13aefb4);
$parcel$export(module.exports, "text_create", () => $650934f729b0bf11$export$370a496c3c46c294);
$parcel$export(module.exports, "image_create", () => $650934f729b0bf11$export$e58f0bd7d775738b);
$parcel$export(module.exports, "button_create", () => $650934f729b0bf11$export$84327131eb86d0b);
$parcel$export(module.exports, "field_create", () => $650934f729b0bf11$export$8d53b56141a9648a);
$parcel$export(module.exports, "chart_create", () => $650934f729b0bf11$export$e05cb23dc8ea8a7);
"use strict";
let $650934f729b0bf11$var$touch_device = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
/* PAGE */ function $650934f729b0bf11$var$page_create(options) {
    let page = document.createElement("div");
    $650934f729b0bf11$var$_handle_id(page, options);
    $650934f729b0bf11$var$_handle_class(page, "page " + (options.center ? "center " : ""), options);
    $650934f729b0bf11$var$_handle_styles(page, options);
    page.style.flexDirection = options.type || "column";
    if (options.title) options.children.unshift($650934f729b0bf11$export$2e2f1a8b6d4607c2({
        text: options.title
    }));
    $650934f729b0bf11$var$_handle_children(page, options);
    document.body.appendChild(page);
    return page;
}
function $650934f729b0bf11$export$49c4650fa4053fe0(current) {
    let pages = document.getElementsByClassName("page");
    for (let page of pages)page.style.display = page == current ? "flex" : "none";
}
function $650934f729b0bf11$export$b9180922d13aefb4(options) {
    let layout = document.createElement("div");
    $650934f729b0bf11$var$_handle_id(layout, options);
    $650934f729b0bf11$var$_handle_class(layout, "layout", options);
    layout.style.flexDirection = options.type || "column";
    $650934f729b0bf11$var$_handle_styles(layout, options);
    $650934f729b0bf11$var$_handle_children(layout, options);
    $650934f729b0bf11$var$_handle_border(layout, options);
    $650934f729b0bf11$var$_handle_color(layout, options);
    return layout;
}
function $650934f729b0bf11$export$2e2f1a8b6d4607c2(options) {
    let header = document.createElement("p");
    header.innerText = options.text || "HEADER";
    $650934f729b0bf11$var$_handle_id(header, options);
    $650934f729b0bf11$var$_handle_class(header, "header", options);
    $650934f729b0bf11$var$_handle_styles(header, options);
    header.change = function(new_text) {
        this.innerText = new_text;
    };
    return header;
}
function $650934f729b0bf11$export$370a496c3c46c294(options) {
    let text = document.createElement("div");
    text.innerText = options.text || "TEXT";
    $650934f729b0bf11$var$_handle_id(text, options);
    $650934f729b0bf11$var$_handle_class(text, "text", options);
    $650934f729b0bf11$var$_handle_styles(text, options);
    text.change = function(new_text) {
        this.innerText = new_text;
    };
    return text;
}
function $650934f729b0bf11$export$e58f0bd7d775738b(options) {
    let image = document.createElement("img");
    image.alt = options.alt || "";
    image.src = options.src || "";
    $650934f729b0bf11$var$_handle_id(image, options);
    $650934f729b0bf11$var$_handle_class(image, "image", options);
    $650934f729b0bf11$var$_handle_styles(image, options);
    return image;
}
function $650934f729b0bf11$export$84327131eb86d0b(options) {
    let button = document.createElement("button");
    $650934f729b0bf11$var$_handle_id(button, options);
    $650934f729b0bf11$var$_handle_class(button, "button", options);
    if (options.label) button.innerText = options.label || "BUTTON";
    else $650934f729b0bf11$var$_handle_children(button, options);
    $650934f729b0bf11$var$_handle_styles(button, options);
    $650934f729b0bf11$var$_handle_color(button, options);
    if ($650934f729b0bf11$var$touch_device) {
        if (options.onclick) button.onclick = function() {
            setTimeout(options.onclick, 500);
        };
    } else if (options.onclick) button.onclick = options.onclick;
    button.change = function(newText) {
        frontSpan.innerText = newText;
    };
    return button;
}
function $650934f729b0bf11$export$8d53b56141a9648a(options) {
    let container = document.createElement("div");
    container.className = "input-container";
    let input = document.createElement("input");
    $650934f729b0bf11$var$_handle_id(input, options);
    $650934f729b0bf11$var$_handle_class(input, "input", options);
    input.value = options.value || "";
    input.placeholder = options.placeholder || "";
    $650934f729b0bf11$var$_handle_color(input, options);
    let label = document.createElement("label");
    label.innerHTML = input.placeholder;
    label.className = "label";
    $650934f729b0bf11$var$_handle_color(label, options);
    container.appendChild(input);
    container.appendChild(label);
    container.set = function(new_text) {
        this.children[0].value = new_text;
    };
    container.get = function() {
        return this.children[0].value;
    };
    return container;
}
function $650934f729b0bf11$export$e05cb23dc8ea8a7(options) {
    let chart = document.createElement("canvas");
    chart.height = options.height || 150;
    chart.width = options.width || 300;
    $650934f729b0bf11$var$_handle_id(chart, options);
    $650934f729b0bf11$var$_handle_class(chart, "chart", options);
    $650934f729b0bf11$var$_handle_styles(chart, options);
    return chart;
}
/* UTIL */ function $650934f729b0bf11$var$_handle_styles(element, options) {
    if (options.style) for(let property in options.style)element.style[property] = options.style[property];
}
function $650934f729b0bf11$var$_handle_id(element, options) {
    if (options.id) element.id = options.id;
}
function $650934f729b0bf11$var$_handle_class(element, default_class, options) {
    element.className = default_class + " " + (options.classes || "");
}
function $650934f729b0bf11$var$_handle_color(element, options) {
    element.style.setProperty("--clr", options.color || "#FFFFFF");
}
function $650934f729b0bf11$var$_handle_children(element, options) {
    if (options.children) options.children.forEach((child)=>element.appendChild(child));
}
function $650934f729b0bf11$var$_handle_border(element, options) {
    if (options.border) element.className += " border";
}
document.body.className = "center";


//# sourceMappingURL=index.js.map
