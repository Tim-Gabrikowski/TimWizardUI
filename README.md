# TimWizardUI - Dokumentation

## TODO

- Layout elemente
  - vertical
  - horizontal
  - grid
  - schachtelbar
- links (in Text)
- Bilder / Icons


## Nutzung

Importiere die `framework.js` Datei in dein HTML-Code und nutze die Funktionen um deine Widgets zu bauen.

## Widgets

- [Text](#text)
- [Überschriften](#überschriften)
- [Buttons](#button)
- [page](#page)
- [Inputfelder](#input)

### Text

Ein einfaches Element zum Anzeigen von Text.
```javascript
let text = text_create({
    text: "Ich bin ein Text",       // Der Text, der angezeigt wird (default: "text")
    id: "test_text",                // die Id des Elements (default: "text_[6-Bit HEX]")
    classes: "bold green",          // CSS-Klassen zum anhängen
    parent: "#example_page"    // Das Element, in das der Text angehängt werden soll (querySelector)
});
text.change("new Text")             // text ändern
```

### Überschriften

Eine einfache Überschrift.

```javascript
let header = header_create({
	text: "Ich bin eine Überschrift",       // Der Text, der angezeigt wird (default: "text")
	id: "test_header",                      // die Id des Elements (default: "text_[6-Bit HEX]")
	classes: "bold green",                  // CSS-Klassen zum anhängen
	parent: "#example_page"            // Das Element, in das die Überschrift angehängt werden soll (querySelector)
});
header.change("new Header")                 // Überschrift ändern
```

### Button

Ein sehr schön gestylter Button.

```javascript
let button = button_create({
    label: "Ich bin ein Button",            // der Text auf dem Button
	id: "test_header",                      // die Id des Elements (default: "text_[6-Bit HEX]")
	classes: "bold green",                  // CSS-Klassen zum anhängen
	parent: "#example_page",           // Das Element, in das der Button angehängt werden soll (querySelector)
    color: "#ffffff",                       // CSS-Colordefinition für das Element
    onclick: () => {                        // Die Funktion die beim drücken des Buttons aufgerufen wird.
		alert("CLICK!");
    }
})
button.change("New Label");                 // Das Label ändern
button.clone("new_id");                     // Eine Kopie erstellen
```

### Page

Ein Seite, die einzeln angezeigt werden kann. Ist eine Flexbox.

```javascript
let page = page_create({
    id: "test_page",                       // die Id des Elements (default: "text_[6-Bit HEX]")
    parent: "body",                             // Das Element, in das der page angehängt werden soll (querySelector)
    title: "New generated page",           // generate a Header at the top of the page if provided
    center: false,                              // Center the page vertically
    style: {                                    // style Attributes (ALL AVAILABLE CSS ATTRIBUTES)
        height: "500px",                        // (CSS-Property height)
        width: "50%"                            // (CSS-Property width)
    },
    layout: "column",                           // layout [column | column-reverse | row | row-reverse | unset] (default; unset)
    hide: true,                                 // hide the element on create
    childs: [                                    // array of child elements from top to bottom
        create_text({text: "Ich bin ein Text"}) // generator function of child element
    ]
});
```

Um nur einen bestimmten page anzuzeigen die folgende Funktion nutzen:
```javascript
page_show(page);
```

### Input

Inputfeld ...

```javascript
let input = field_create({
    id: "test_input",               // die Id des Elements (default: "text_[6-Bit HEX]")
    className: "",                  // CSS-Klassen zum anhängen
    color: "",                      // CSS-Colordefinition für das Element
    defaultValue: "default",        // Default value for the Input
    placeholder: "Type something",  // placeholder
    parent: "body"                  // Das Element, in das das Inputfeld angehängt werden soll (querySelector)
});
input.change("new Value");          // Value des Input-Elements setzen
```