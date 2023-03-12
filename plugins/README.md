# TimWizardUI - Plugins

This are fully functional components for the framework, that are not used very often or too specific for the general boundle.

## List of Plugins

- [Audioplayer](#audioplayer)

## Plugins

The Documentation of the plugins. You can easily import them via the script and add the stylesheet.

On every plugin Doc you will find the import of all functions ans sheets.

### Audioplayer

This is an simple and styled Audioplayer. It can play audiofiles from file / Url or other sources. It also uses the MediaSession API.

```html
<link
	rel="stylesheet"
	href="https://tim-gabrikowski.github.io/TimWizardUI/plugins/audioplayer/style.css"
	type="text/css"
/>
<script
	type="text/javascript"
	src="https://tim-gabrikowski.github.io/TimWizardUI/plugins/audioplayer/script.js"
></script>
```

```javascript
let audioplayer = audioplayer_create({
	id: "audioplayer",
	className: "audioplayer",
	src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
	songData: {
		title: "SoundHelix Song 1",
		artist: "T. Schürger",
	},
});
// Change the song to play other Song:
audioplayer.change({
	src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
	title: "SoundHelix Song 2",
	artist: "T. Schürger",
});
```
