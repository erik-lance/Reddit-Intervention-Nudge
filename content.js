console.log("Black Crows Content Pause is starting...");

// Include SweetAlert 2
// Include SweetAlert 2 using a script tag
const script = document.createElement("script");
script.src = chrome.extension.getURL("sweetalert2.all.min.js");
document.head.appendChild(script);

// Set your preferred time limit for scrolling in milliseconds
const scrollFreezeTimeLimit = 10000; // 10 seconds

let scrollingTimer;

// Function to freeze scrolling and display a SweetAlert overlay
function freezeScrolling() {
	// Pause any existing scrolling timer
	clearTimeout(scrollingTimer);

	// Freeze scrolling
	document.body.style.overflow = "hidden";

	// Display SweetAlert overlay
	Swal.fire({
		title: "Take a break!",
		text: "You've been scrolling for a while. Take a moment to reflect.",
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
