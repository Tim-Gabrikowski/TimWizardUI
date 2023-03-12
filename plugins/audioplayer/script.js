/* Implementation of the presentation of the audio player */
import lottieWeb from "https://cdn.skypack.dev/lottie-web";
import sheet from "./style.css";
document.adoptedStyleSheets = [sheet];

/**
 *
 * @param {object} options Das Optionsobjekt
 * @param {string} options.id ID des Elements
 * @param {string} options.className Klassen zum anhängen
 * @param {string} options.src Die Audioquelle
 * @param {string} options.color Primäre Farbe des Players (CSS-Color-Selectoren)
 * @param {object} options.songData Daten zum abgespielten Titel
 * @param {string} options.songData.title Titel des abgespielten Songs
 * @param {string} options.songData.artist Künstler/Sänger des Titels
 */
export function audioplayer_create(options) {
	if (options == undefined || options == null) return;

	const playIconContainer = document.createElement("button");
	playIconContainer.className = "play-icon ap-btn";
	playIconContainer.style.setProperty("--clr", options.color || "#FFFFFF");

	const audioPlayerContainer = document.createElement("div");
	audioPlayerContainer.className = "audio-player-container";
	if (options.className !== undefined) {
		audioPlayerContainer.className += " " + options.className;
	}
	audioPlayerContainer.id = options.id || "";
	audioPlayerContainer.style.setProperty("--clr", options.color || "#FFFFFF");

	const infoText = document.createElement("p");
	infoText.className = "audiolabel";
	infoText.style.setProperty("--clr", options.color || "#FFFFFF");

	if (options.songData !== undefined) {
		infoText.innerText = `${options.songData.artist || "unknown artist"} - ${
			options.songData.title || "unknown title"
		}`;
	}

	if (options.src == undefined) {
		infoText.innerText = "no song selected";
	}

	const seekSlider = document.createElement("input");
	seekSlider.className = "seek-slider";
	seekSlider.type = "range";
	seekSlider.max = 100;
	seekSlider.value = 0;
	seekSlider.style.setProperty("--clr", options.color || "#FFFFFF");

	const volumeSlider = document.createElement("input");
	volumeSlider.className = "volume-slider";
	volumeSlider.type = "range";
	volumeSlider.max = 100;
	volumeSlider.value = 100;
	volumeSlider.style.setProperty("--clr", options.color || "#FFFFFF");

	const muteIconContainer = document.createElement("button");
	muteIconContainer.className = "mute-icon ap-btn";
	muteIconContainer.style.setProperty("--clr", options.color || "#FFFFFF");

	let playState = "play";
	let muteState = "unmute";

	const playAnimation = lottieWeb.loadAnimation({
		container: playIconContainer,
		path: "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json",
		renderer: "svg",
		loop: false,
		autoplay: false,
		name: "Play Animation",
	});

	const muteAnimation = lottieWeb.loadAnimation({
		container: muteIconContainer,
		path: "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json",
		renderer: "svg",
		loop: false,
		autoplay: false,
		name: "Mute Animation",
	});

	playAnimation.goToAndStop(14, true);

	playIconContainer.addEventListener("click", () => {
		if (playState === "play") {
			audio.play();
			playAnimation.playSegments([14, 27], true);
			requestAnimationFrame(whilePlaying);
			playState = "pause";
		} else {
			audio.pause();
			playAnimation.playSegments([0, 14], true);
			cancelAnimationFrame(raf);
			playState = "play";
		}
	});

	muteIconContainer.addEventListener("click", () => {
		if (muteState === "unmute") {
			muteAnimation.playSegments([0, 15], true);
			audio.muted = true;
			muteState = "mute";
		} else {
			muteAnimation.playSegments([15, 25], true);
			audio.muted = false;
			muteState = "unmute";
		}
	});

	const showRangeProgress = (rangeInput) => {
		if (rangeInput === seekSlider)
			audioPlayerContainer.style.setProperty(
				"--seek-before-width",
				(rangeInput.value / rangeInput.max) * 100 + "%"
			);
		else
			audioPlayerContainer.style.setProperty(
				"--volume-before-width",
				(rangeInput.value / rangeInput.max) * 100 + "%"
			);
	};

	seekSlider.addEventListener("input", (e) => {
		showRangeProgress(e.target);
	});
	volumeSlider.addEventListener("input", (e) => {
		showRangeProgress(e.target);
	});

	/* Implementation of the functionality of the audio player */

	const audio = document.createElement("audio");
	audio.src = options.src;

	const durationContainer = document.createElement("span");
	durationContainer.className = "duration time";
	durationContainer.innerText = "0:00";
	durationContainer.style.setProperty("--clr", options.color || "#FFFFFF");

	const currentTimeContainer = document.createElement("span");
	currentTimeContainer.className = "current-time time";
	currentTimeContainer.innerText = "0:00";
	currentTimeContainer.style.setProperty("--clr", options.color || "#FFFFFF");

	const outputContainer = document.createElement("output");
	outputContainer.className = "volume-output";
	outputContainer.innerText = "100";
	outputContainer.style.setProperty("--clr", options.color || "#FFFFFF");

	let raf = null;

	const calculateTime = (secs) => {
		const minutes = Math.floor(secs / 60);
		const seconds = Math.floor(secs % 60);
		const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
		return `${minutes}:${returnedSeconds}`;
	};

	const displayDuration = () => {
		durationContainer.textContent = calculateTime(audio.duration);
	};

	const setSliderMax = () => {
		seekSlider.max = Math.floor(audio.duration);
	};

	const displayBufferedAmount = () => {
		const bufferedAmount = Math.floor(
			audio.buffered.end(audio.buffered.length - 1)
		);
		audioPlayerContainer.style.setProperty(
			"--buffered-width",
			`${(bufferedAmount / seekSlider.max) * 100}%`
		);
	};

	const whilePlaying = () => {
		seekSlider.value = Math.floor(audio.currentTime);
		currentTimeContainer.textContent = calculateTime(seekSlider.value);
		audioPlayerContainer.style.setProperty(
			"--seek-before-width",
			`${(seekSlider.value / seekSlider.max) * 100}%`
		);
		raf = requestAnimationFrame(whilePlaying);
	};

	if (audio.readyState > 0) {
		displayDuration();
		setSliderMax();
		displayBufferedAmount();
	} else {
		audio.addEventListener("loadedmetadata", () => {
			displayDuration();
			setSliderMax();
			displayBufferedAmount();
		});
	}

	audio.addEventListener("progress", displayBufferedAmount);

	seekSlider.addEventListener("input", () => {
		currentTimeContainer.textContent = calculateTime(seekSlider.value);
		if (!audio.paused) {
			cancelAnimationFrame(raf);
		}
	});

	seekSlider.addEventListener("change", () => {
		audio.currentTime = seekSlider.value;
		if (!audio.paused) {
			requestAnimationFrame(whilePlaying);
		}
	});

	volumeSlider.addEventListener("input", (e) => {
		const value = e.target.value;

		outputContainer.textContent = value;
		audio.volume = value / 100;
	});

	/* Implementation of the Media Session API */
	if ("mediaSession" in navigator) {
		if (options.songData == undefined) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: "unknown title",
				artist: "unknown artist",
			});
		} else {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: options.songData.title,
				artist: options.songData.artist,
			});
		}
		navigator.mediaSession.setActionHandler("play", () => {
			if (playState === "play") {
				audio.play();
				playAnimation.playSegments([14, 27], true);
				requestAnimationFrame(whilePlaying);
				playState = "pause";
			} else {
				audio.pause();
				playAnimation.playSegments([0, 14], true);
				cancelAnimationFrame(raf);
				playState = "play";
			}
		});
		navigator.mediaSession.setActionHandler("pause", () => {
			if (playState === "play") {
				audio.play();
				playAnimation.playSegments([14, 27], true);
				requestAnimationFrame(whilePlaying);
				playState = "pause";
			} else {
				audio.pause();
				playAnimation.playSegments([0, 14], true);
				cancelAnimationFrame(raf);
				playState = "play";
			}
		});
		navigator.mediaSession.setActionHandler("seekbackward", (details) => {
			audio.currentTime = audio.currentTime - (details.seekOffset || 10);
		});
		navigator.mediaSession.setActionHandler("seekforward", (details) => {
			audio.currentTime = audio.currentTime + (details.seekOffset || 10);
		});
		navigator.mediaSession.setActionHandler("seekto", (details) => {
			if (details.fastSeek && "fastSeek" in audio) {
				audio.fastSeek(details.seekTime);
				return;
			}
			audio.currentTime = details.seekTime;
		});
		navigator.mediaSession.setActionHandler("stop", () => {
			audio.currentTime = 0;
			seekSlider.value = 0;
			audioPlayerContainer.style.setProperty("--seek-before-width", "0%");
			currentTimeContainer.textContent = "0:00";
			if (playState === "pause") {
				playAnimation.playSegments([0, 14], true);
				cancelAnimationFrame(raf);
				playState = "play";
			}
		});
	}

	audioPlayerContainer.appendChild(audio);
	audioPlayerContainer.appendChild(infoText);
	audioPlayerContainer.appendChild(playIconContainer);
	audioPlayerContainer.appendChild(currentTimeContainer);
	audioPlayerContainer.appendChild(seekSlider);
	audioPlayerContainer.appendChild(durationContainer);
	audioPlayerContainer.appendChild(outputContainer);
	audioPlayerContainer.appendChild(volumeSlider);
	audioPlayerContainer.appendChild(muteIconContainer);

	audioPlayerContainer.changeSource = function (newSrc) {
		audio.src = newSrc;
	};
	audioPlayerContainer.change = function (newSong) {
		audio.src = newSong.src;
		navigator.mediaSession.metadata = new MediaMetadata({
			title: newSong.title || "unknown title",
			artist: newSong.artist || "unknown artist",
		});
		infoText.innerText = `${newSong.artist || "unknown artist"} - ${
			newSong.title || "unknown title"
		}`;
		playState = "play";
		playIconContainer.dispatchEvent(new Event("click"));
		audio.play();
	};

	return audioPlayerContainer;
}
