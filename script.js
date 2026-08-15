// =====================================
// MCE CAMPUS NAVIGATOR
// =====================================

const destinations = {

    CSE: {
        name: "Computer Science & Engineering",
        icon: "💻",

        en:
            "Follow the highlighted route to the Computer Science & Engineering area.",

        kn:
            "ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್ ಮತ್ತು ಎಂಜಿನಿಯರಿಂಗ್ ವಿಭಾಗಕ್ಕೆ ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ."
    },

    CSEAI: {
        name: "CSE (AI & ML)",
        icon: "🤖",

        en:
            "Follow the highlighted route to the CSE Artificial Intelligence & Machine Learning area.",

        kn:
            "CSE ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಮತ್ತು ಮೆಷಿನ್ ಲರ್ನಿಂಗ್ ವಿಭಾಗಕ್ಕೆ ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ."
    },

    CSBS: {
        name: "Computer Science & Business Systems",
        icon: "💼",

        en:
            "Follow the highlighted route to the CSBS area.",

        kn:
            "ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್ ಮತ್ತು ಬಿಸಿನೆಸ್ ಸಿಸ್ಟಮ್ಸ್ ವಿಭಾಗಕ್ಕೆ ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ."
    },

    ECE: {
        name: "Electronics & Communication Engineering",
        icon: "📡",

        en:
            "Follow the highlighted route to the Electronics & Communication Engineering area.",

        kn:
            "ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಮತ್ತು ಕಮ್ಯುನಿಕೇಶನ್ ಎಂಜಿನಿಯರಿಂಗ್ ವಿಭಾಗಕ್ಕೆ ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ."
    },

    EEE: {
        name: "Electrical & Electronics Engineering",
        icon: "⚡",

        en:
            "Follow the highlighted route to the Electrical & Electronics Engineering area.",

        kn:
            "ಎಲೆಕ್ಟ್ರಿಕಲ್ ಮತ್ತು ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಎಂಜಿನಿಯರಿಂಗ್ ವಿಭಾಗಕ್ಕೆ ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ."
    },

    ME: {
        name: "Mechanical Engineering",
        icon: "⚙️",

        en:
            "Follow the highlighted route to the Mechanical Engineering area.",

        kn:
            "ಮೆಕ್ಯಾನಿಕಲ್ ಎಂಜಿನಿಯರಿಂಗ್ ವಿಭಾಗಕ್ಕೆ ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ."
    },

    CE: {
        name: "Civil Engineering",
        icon: "🏗️",

        en:
            "Follow the highlighted route to the Civil Engineering area.",

        kn:
            "ಸಿವಿಲ್ ಎಂಜಿನಿಯರಿಂಗ್ ವಿಭಾಗಕ್ಕೆ ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ."
    },

    RAI: {
        name: "Robotics & Artificial Intelligence",
        icon: "🤖",

        en:
            "Follow the highlighted route to the Robotics & Artificial Intelligence area.",

        kn:
            "ರೋಬೋಟಿಕ್ಸ್ ಮತ್ತು ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ವಿಭಾಗಕ್ಕೆ ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ."
    },

    EC: {
        name: "Electronics & Computer Engineering",
        icon: "💻",

        en:
            "Follow the highlighted route to the Electronics & Computer Engineering area.",

        kn:
            "ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಮತ್ತು ಕಂಪ್ಯೂಟರ್ ಎಂಜಿನಿಯರಿಂಗ್ ವಿಭಾಗಕ್ಕೆ ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ."
    },

    Library: {
        name: "Library",
        icon: "📚",

        en:
            "Follow the highlighted route to the Library.",

        kn:
            "ಗ್ರಂಥಾಲಯಕ್ಕೆ ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ."
    },

    Canteen: {
        name: "Canteen",
        icon: "🍴",

        en:
            "Follow the highlighted route to the Canteen.",

        kn:
            "ಕ್ಯಾಂಟೀನ್‌ಗೆ ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ."
    },

    Auditorium: {
        name: "Auditorium",
        icon: "🎭",

        en:
            "Follow the highlighted route to the Auditorium.",

        kn:
            "ಆಡಿಟೋರಿಯಂಗೆ ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ."
    },

    MainGate: {
        name: "Main Gate",
        icon: "🚪",

        en:
            "You are at the Main Gate.",

        kn:
            "ನೀವು ಮುಖ್ಯ ಗೇಟ್‌ನಲ್ಲಿದ್ದೀರಿ."
    },

    Office: {
        name: "College Office",
        icon: "🏢",

        en:
            "Follow the highlighted route to the College Office.",

        kn:
            "ಕಾಲೇಜು ಕಚೇರಿಗೆ ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ."
    },

    HelpDesk: {
        name: "Help Desk",
        icon: "ℹ️",

        en:
            "Follow the highlighted route to the Help Desk.",

        kn:
            "ಸಹಾಯ ಕೇಂದ್ರಕ್ಕೆ ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ."
    }

};


// =====================================
// CURRENT LANGUAGE
// =====================================

let currentLanguage = "en";


// =====================================
// FIND DESTINATION
// =====================================

function findDestination() {

    const selected =
        document.getElementById("destination").value;


    if (selected === "") {

        const result =
            document.getElementById("result");

        result.style.display = "block";

        result.innerHTML =
            currentLanguage === "en"

                ? "⚠️ Please select a destination first."

                : "⚠️ ದಯವಿಟ್ಟು ಮೊದಲು ಗಮ್ಯಸ್ಥಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ.";

        return;
    }


    selectDestination(selected);
}


// =====================================
// SELECT DESTINATION
// =====================================

function selectDestination(destinationId) {

    const destination =
        destinations[destinationId];


    if (!destination) {
        return;
    }


    // Update dropdown

    document.getElementById("destination").value =
        destinationId;


    // Remove previous selection

    document
        .querySelectorAll(".map-place")
        .forEach(place => {

            place.classList.remove("selected");

        });


    // Find destination on map

    const destinationElement =
        document.querySelector(
            `[data-destination="${destinationId}"]`
        );


    if (destinationElement) {

        destinationElement.classList.add("selected");

    }


    // Update result

    const result =
        document.getElementById("result");

    result.style.display = "block";


    result.innerHTML =

        "📍 <strong>" +
        destination.icon +
        " " +
        destination.name +
        "</strong><br><br>" +

        destination[currentLanguage];


    // Update directions

    const directionsText =
        document.getElementById("directionsText");

    directionsText.innerText =
        destination[currentLanguage];


    // Draw route

    drawRoute(destinationElement);

}


// =====================================
// DRAW ROUTE
// =====================================

function drawRoute(destinationElement) {

    const route =
        document.getElementById("routeLine");

    const entrance =
        document.getElementById("mainGate");


    if (!destinationElement) {

        route.style.display = "none";

        return;
    }


    const map =
        document.querySelector(".campus-map");


    const mapRect =
        map.getBoundingClientRect();


    const entranceRect =
        entrance.getBoundingClientRect();


    const destinationRect =
        destinationElement.getBoundingClientRect();


    const startX =
        entranceRect.left -
        mapRect.left +
        entranceRect.width / 2;


    const startY =
        entranceRect.top -
        mapRect.top +
        entranceRect.height / 2;


    const endX =
        destinationRect.left -
        mapRect.left +
        destinationRect.width / 2;


    const endY =
        destinationRect.top -
        mapRect.top +
        destinationRect.height / 2;


    const dx =
        endX - startX;


    const dy =
        endY - startY;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    const angle =
        Math.atan2(dy, dx) *
        180 /
        Math.PI;


    route.style.display = "block";

    route.style.left =
        startX + "px";

    route.style.top =
        startY + "px";

    route.style.width =
        distance + "px";

    route.style.transform =
        `rotate(${angle}deg)`;

}


// =====================================
// LANGUAGE SWITCH
// =====================================

function setLanguage(language) {

    currentLanguage = language;


    const title =
        document.getElementById("title");

    const subtitle =
        document.getElementById("subtitle");

    const destinationTitle =
        document.getElementById("destinationTitle");

    const destinationLabel =
        document.getElementById("destinationLabel");

    const findButton =
        document.getElementById("findButton");

    const mapTitle =
        document.getElementById("mapTitle");

    const mapSubtitle =
        document.getElementById("mapSubtitle");

    const mapNote =
        document.getElementById("mapNote");

    const directionsTitle =
        document.getElementById("directionsTitle");


    if (language === "kn") {

        title.innerText =
            "MCE ಕ್ಯಾಂಪಸ್ ನ್ಯಾವಿಗೇಟರ್";

        subtitle.innerText =
            "ಮಲ್ನಾಡ್ ಕಾಲೇಜ್ ಆಫ್ ಎಂಜಿನಿಯರಿಂಗ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಮಾರ್ಗವನ್ನು ಹುಡುಕಿ";

        destinationTitle.innerText =
            "🔎 ನಿಮ್ಮ ಗಮ್ಯಸ್ಥಾನವನ್ನು ಹುಡುಕಿ";

        destinationLabel.innerText =
            "ಗಮ್ಯಸ್ಥಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ";

        findButton.innerText =
            "📍 ಸ್ಥಳವನ್ನು ತೋರಿಸಿ";

        mapTitle.innerText =
            "🗺️ ಕ್ಯಾಂಪಸ್ ನಕ್ಷೆ";

        mapSubtitle.innerText =
            "ಸ್ಥಳವನ್ನು ನೋಡಲು ಗಮ್ಯಸ್ಥಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ.";

        mapNote.innerText =
            "⚠️ ಇದು ಪ್ರಸ್ತುತ ಮಾದರಿ ಕ್ಯಾಂಪಸ್ ನಕ್ಷೆಯಾಗಿದೆ. ನಿಖರ ಕಟ್ಟಡಗಳ ಸ್ಥಳಗಳನ್ನು ಅಧಿಕೃತ MCE ಕ್ಯಾಂಪಸ್ ಲೇಔಟ್ ಆಧರಿಸಿ ನವೀಕರಿಸಲಾಗುತ್ತದೆ.";

        directionsTitle.innerText =
            "🧭 ಮಾರ್ಗದರ್ಶನ";

    } else {

        title.innerText =
            "MCE Campus Navigator";

        subtitle.innerText =
            "Find your way around Malnad College of Engineering";

        destinationTitle.innerText =
            "🔎 Find Your Destination";

        destinationLabel.innerText =
            "Select a destination";

        findButton.innerText =
            "📍 Show Location";

        mapTitle.innerText =
            "🗺️ Campus Map";

        mapSubtitle.innerText =
            "Select a destination to see its location.";

        mapNote.innerText =
            "⚠️ Campus layout shown here is a prototype. Exact building positions will be updated using the official MCE campus layout.";

        directionsTitle.innerText =
            "🧭 Directions";

    }


    // Refresh selected destination

    const selected =
        document.getElementById("destination").value;


    if (selected !== "") {

        selectDestination(selected);

    }

                                }
