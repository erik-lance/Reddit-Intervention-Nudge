console.log("Black Crows Content Pause is starting...");

// Include SweetAlert 2
// Include SweetAlert 2 using a script tag
const script = document.createElement("script");
script.src = chrome.runtime.getURL("sweetalert2.all.min.js");
document.head.appendChild(script);

// Milliseconds to wait before nudging
// Currently set to 5 minute
const scrollFreezeTimeLimit = 300000;

let scrollingTimer;
let timesNudged = 0;

// Function to freeze scrolling and display a SweetAlert overlay
function freezeScrolling() {
	timesNudged++;

	// Pause any existing scrolling timer
	clearTimeout(scrollingTimer);

	// Freeze scrolling
	document.body.style.overflow = "hidden";

	// Total time reading
	const totalTime = (timesNudged * scrollFreezeTimeLimit) / 60000;

	// Display SweetAlert overlay
	Swal.fire({
		title: "Take a break!",
		text: "You've been scrolling for " + totalTime + " minutes. Take a break!",
		icon: "info",
		showCancelButton: true,
		confirmButtonText: "Resume scrolling",
	}).then((result) => {
		// Resume scrolling if the user confirms
		if (result.isConfirmed) {
			// Allow scrolling again
			document.body.style.overflow = "auto";

			// Restart the scrolling timer
			scrollingTimer = setTimeout(freezeScrolling, scrollFreezeTimeLimit);
		} else {
            // Turn off timer if the user cancels
            clearTimeout(scrollingTimer);

            // Allow scrolling again
            document.body.style.overflow = "auto";
        }
	});
}

// Initialize the scrolling timer
scrollingTimer = setTimeout(freezeScrolling, scrollFreezeTimeLimit);

console.log("Black Crows Content Pause is running!");
