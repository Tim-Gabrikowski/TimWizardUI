# TimWizardUI - Dokumentation

Find this doc [here](https://tim-gabrikowski.github.io/TimWizardUI/):

## TODO

- Layout elemente
  - vertical
  - horizontal
  - grid
  - schachtelbar
- links (in Text)
- Bilder / Icons
- JSDoc?

## Publish

To publish a new verison call

```bash
node publish [version]
```

this copies the files to the versions subdir

List of all versions can be found [here](#versions).

## Plugins

This Files are the basic framework. It can be expanded with plugins. See here
for [a list of plugins](./plugins/README.md).

## Usage

Add the following to your HTML-file.

```html
<link
	rel="stylesheet"
	href="https://tim-gabrikowski.github.io/TimWizardUI/versions/[version]/style.css"
	type="text/css"
/>
<script
	type="text/javascript"
	src="https://tim-gabrikowski.github.io/TimWizardUI/versions/[version]/script.js"
></script>
```

Then create a script for your layout and use the widgets:

## Routing

The framework also gives a simple Router to navigate to the different Pages.
You can register your Page under a given Route and then access it with this route.

```js
const router = new Router();            // create new router

router.setDefault(mainPage)             // set the default page to the mainPage
router.default();                       // navigate to the default page

router.addRoute("/games", gamesPage);   // register a Route
router.to("/games");                    // navigate to the Route
```

## Widgets

- [Text](#text)
- [Überschriften](#überschriften)
- [Buttons](#button)
- [Page](#page)
- [Inputfelder](#input)
- [Layout](#layout)
- [Images](#images)

### Text

Ein einfaches Element zum Anzeigen von Text.

```javascript
let text = text_create({
	text: "Ich bin ein Text", // Der Text, der angezeigt wird
	id: "test_text", // die Id des Elements
	classes: "bold green", // CSS-Klassen zum anhängen
});
text.change("new Text"); // text ändern
```

### Überschriften

Eine einfache Überschrift.

```javascript
let header = header_create({
	text: "Ich bin eine Überschrift", // Der Text, der angezeigt wird
	id: "test_header", // die Id des Elements
	classes: "bold green", // CSS-Klassen zum anhängen
});
header.change("new Header"); // Überschrift ändern
```

### Button

Ein sehr schön gestylter Button.

```javascript
let button = button_create({
	label: "Ich bin ein Button", // der Text auf dem Button
	id: "test_header", // die Id des Elements
	classes: "bold green", // CSS-Klassen zum anhängen
	color: "#ffffff", // CSS-Colordefinition für das Element
	onclick: () => {
		// Die Funktion die beim drücken des Buttons aufgerufen wird.
		alert("CLICK!");
	},
	plain: false, // Button ohne fancy Border
});
button.change("New Label"); // Das Label ändern
button.clone("new_id"); // Eine Kopie erstellen
```

### Page

Ein Seite, die einzeln angezeigt werden kann. Ist eine Flexbox.

```javascript
let page = page_create({
	id: "test_page", // die Id des Elements
	title: "New generated page", // generate a Header at the top of the page if provided
	center: false, // Center the page vertically
	destroyOnHide: true, // (default: false) => Delete the page on Hide from DOM
	style: {
		// style Attributes (ALL AVAILABLE CSS ATTRIBUTES)
		height: "500px", // (CSS-Property height)
		width: "50%", // (CSS-Property width)
	},
	layout: "column", // layout [column | column-reverse | row | row-reverse | unset] (default; unset)
  hide: true, // hide the element on create
  children: [
    // array of child elements from top to bottom
		create_text({ text: "Ich bin ein Text" }), // generator function of child element
	],
	onshow: function () {}, // Eventhandler when the page is shown
});
```

Um nur einen bestimmten page anzuzeigen die folgende Funktion nutzen:

```javascript
page.show();
```

### Input

Inputfeld ...

```javascript
let input = field_create({
  id: "test_input", // die Id des Elements
  className: "", // CSS-Klassen zum anhängen
  type: "text", // Typ des Input elements
  color: "", // CSS-Colordefinition für das Element
  defaultValue: "default", // Default value for the Input
  placeholder: "Type something", // placeholder
  validators: [
    // each Validator is a function that takes the input as parameter and returns true or false (passed or not)
    (value) => {
      return value !== undefined
    }
  ]
});
input.change("new Value"); // Value des Input-Elements setzen
input.get(); // Value des Input-Elements bekommen
input.valid(); // => true | false
```

If you specified validators and call the `input.valid()` method on an invalid input, an error message will appear.

### Layout

Layout element zum anordnet und sortieren von Elementen.

```javascript
let layout = layout_create({
	id: "test_layout", // die Id des Elements
	className: "", // CSS-Klassen zum anhängen
	type: "column", // [column | column-reverse | row | row-reverse | unset] (default; column)
	childs: [
		// Array of child elements
		create_text({
			// example child element
			text: "Ich bin ein Text",
		}),
	],
});
```

### Images

Ohne Bilder ist eine Internetseite keine Internetseite, oder?

```javascript
let image = image_create({
	id: "test_image", // Die ID des Elements
	classes: "", // CSS-Klassen
	src: "", // Bildurl
	alt: "", // Alternativtext, wenn das Bild nicht da ist
	style: {
		// CSS Style Attribute
		width: "100px",
	},
});
```

### MessageBox

```javascript
let msg = messagebox_create({
  id: "test_msg", // Die ID des Elements
  children: [], // Child Elemente
});
```

Zum Anzeigen/Verstecken: `msg.show()` und `msg.hide()`

## Versions

List of versions and Changes to previous versions

| version | changes                                           |
|:-------:|:--------------------------------------------------|
|   v1    | initial publish                                   |
| v1.1.0  | add a router and the routing property to the page |
| v1.1.1  | fix typo and styling error                        | 

