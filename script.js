// =====================================
// MCE CAMPUS NAVIGATOR V2
// =====================================


// =====================================
// CAMPUS DATA
// =====================================

const campusData = {

    SA: {
        name: "SA Block",

        floors: {

            ground: {
                name: "Ground Floor",

                rooms: {
                    SA104: "SA104"
                }
            },

            second: {
                name: "Second Floor",

                rooms: {
                    AU303: "AU303 — ICT Classroom"
                }
            }
        }
    },


    CRB: {
        name: "CRB Block",

        floors: {

            ground: {
                name: "Ground Floor",

                rooms: {
                    CRB1: "CRB1",
                    CRB2: "CRB2"
                }
            },

            first: {
                name: "First Floor",

                rooms: {
                    CRB3: "CRB3",
                    CRB4: "CRB4"
                }
            }
        }
    },


    ECE: {
        name: "ECE Block",

        floors: {

            first: {
                name: "First Floor",

                rooms: {
                    MTECH: "M.Tech Classroom"
                }
            }
        }
    }

};


// =====================================
// CURRENT LANGUAGE
// =====================================

let currentLanguage = "en";


// =====================================
// GET HTML ELEMENTS
// =====================================

const blockSelect =
    document.getElementById("block");

const floorSelect =
    document.getElementById("floor");

const roomSelect =
    document.getElementById("room");


// =====================================
// BLOCK → FLOOR
// =====================================

blockSelect.addEventListener("change", function () {

    const selectedBlock = this.value;


    // Reset floor

    floorSelect.innerHTML =
        '<option value="">Select a floor</option>';


    // Reset room

    roomSelect.innerHTML =
        '<option value="">Select a room</option>';

    roomSelect.disabled = true;


    // No block selected

    if (selectedBlock === "") {

        floorSelect.disabled = true;

        return;
    }


    // Enable floor

    floorSelect.disabled = false;


    const floors =
        campusData[selectedBlock].floors;


    // Add floors

    Object.keys(floors).forEach(function (floorKey) {

        const option =
            document.createElement("option");

        option.value =
            floorKey;

        option.textContent =
            floors[floorKey].name;

        floorSelect.appendChild(option);

    });

});


// =====================================
// FLOOR → ROOM
// =====================================

floorSelect.addEventListener("change", function () {

    const selectedBlock =
        blockSelect.value;

    const selectedFloor =
        this.value;


    // Reset rooms

    roomSelect.innerHTML =
        '<option value="">Select a room</option>';


    // No floor selected

    if (selectedFloor === "") {

        roomSelect.disabled = true;

        return;
    }


    // Enable rooms

    roomSelect.disabled = false;


    const rooms =
        campusData[selectedBlock]
            .floors[selectedFloor]
            .rooms;


    // Add rooms

    Object.keys(rooms).forEach(function (roomKey) {

        const option =
            document.createElement("option");

        option.value =
            roomKey;

        option.textContent =
            rooms[roomKey];

        roomSelect.appendChild(option);

    });

});


// =====================================
// FIND DESTINATION
// =====================================

function findDestination() {

    const selectedBlock =
        blockSelect.value;

    const selectedFloor =
        floorSelect.value;

    const selectedRoom =
        roomSelect.value;


    const result =
        document.getElementById("result");


    // Check selection

    if (
        selectedBlock === "" ||
        selectedFloor === "" ||
        selectedRoom === ""
    ) {

        result.style.display = "block";

        if (currentLanguage === "en") {

            result.innerHTML =
                "⚠️ Please select a block, floor and room.";

        } else {

            result.innerHTML =
                "⚠️ ದಯವಿಟ್ಟು ಬ್ಲಾಕ್, ಮಹಡಿ ಮತ್ತು ಕೊಠಡಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.";
        }

        return;
    }


    // Get information

    const blockName =
        campusData[selectedBlock].name;

    const floorName =
        campusData[selectedBlock]
            .floors[selectedFloor]
            .name;

    const roomName =
        campusData[selectedBlock]
            .floors[selectedFloor]
            .rooms[selectedRoom];


    // Show result

    result.style.display = "block";


    if (currentLanguage === "en") {

        result.innerHTML =

            "📍 <strong>" +
            roomName +
            "</strong><br><br>" +

            "🏢 <strong>" +
            blockName +
            "</strong><br>" +

            "🏬 " +
            floorName +
            "<br><br>" +

            "🚶 Follow the highlighted route from the Main Gate.";

    } else {

        result.innerHTML =

            "📍 <strong>" +
            roomName +
            "</strong><br><br>" +

            "🏢 <strong>" +
            blockName +
            "</strong><br>" +

            "🏬 " +
            floorName +
            "<br><br>" +

            "🚶 ಮುಖ್ಯ ಗೇಟ್‌ನಿಂದ ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ.";
    }


    // Directions

    const directionsText =
        document.getElementById("directionsText");


    if (currentLanguage === "en") {

        directionsText.innerText =

            "🚶 Start at the Main Gate → " +
            "follow the highlighted route → " +
            "reach " +
            roomName +
            " in " +
            blockName +
            ".";

    } else {

        directionsText.innerText =

            "🚶 ಮುಖ್ಯ ಗೇಟ್‌ನಿಂದ ಪ್ರಾರಂಭಿಸಿ → " +
            "ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ → " +
            blockName +
            " ನ " +
            roomName +
            " ತಲುಪಿ.";
    }


    // Show destination

    showDestinationOnMap(selectedBlock);

}


// =====================================
// SHOW DESTINATION ON MAP
// =====================================

function showDestinationOnMap(block) {

    const destination =
        document.querySelector(
            '[data-block="' + block + '"]'
        );


    const marker =
        document.getElementById(
            "destinationMarker"
        );


    const route =
        document.getElementById(
            "routeLine"
        );


    const mainGate =
        document.getElementById(
            "mainGate"
        );


    // If destination doesn't exist

    if (!destination) {

        marker.style.display = "none";

        route.style.display = "none";

        return;
    }


    // Remove previous selection

    document
        .querySelectorAll(".map-place")
        .forEach(function (element) {

            element.classList.remove("selected");

        });


    // Highlight selected block

    destination.classList.add("selected");


    // Get map position

    const map =
        document.querySelector(
            ".campus-map"
        );


    const mapRect =
        map.getBoundingClientRect();


    const destinationRect =
        destination.getBoundingClientRect();


    const gateRect =
        mainGate.getBoundingClientRect();


    // =================================
    // DESTINATION MARKER
    // =================================

    const destinationX =

        destinationRect.left -
        mapRect.left +
        destinationRect.width / 2;


    const destinationY =

        destinationRect.top -
        mapRect.top;


    marker.style.left =
        destinationX + "px";

    marker.style.top =
        destinationY + "px";

    marker.style.display =
        "block";


    // =================================
    // ROUTE START
    // =================================

    const startX =

        gateRect.left -
        mapRect.left +
        gateRect.width / 2;


    const startY =

        gateRect.top -
        mapRect.top +
        gateRect.height / 2;


    // =================================
    // ROUTE END
    // =================================

    const endX =

        destinationRect.left -
        mapRect.left +
        destinationRect.width / 2;


    const endY =

        destinationRect.top -
        mapRect.top +
        destinationRect.height / 2;


    // =================================
    // CALCULATE ROUTE
    // =================================

    const dx =
        endX - startX;

    const dy =
        endY - startY;


    const distance =
        Math.sqrt(
            (dx * dx) +
            (dy * dy)
        );


    const angle =
        Math.atan2(dy, dx) *
        180 /
        Math.PI;


    // =================================
    // DRAW ROUTE
    // =================================

    route.style.left =
        startX + "px";

    route.style.top =
        startY + "px";

    route.style.width =
        distance + "px";

    route.style.transform =
        "rotate(" + angle + "deg)";

    route.style.display =
        "block";

}


// =====================================
// LANGUAGE SWITCH
// =====================================

function setLanguage(language) {

    currentLanguage =
        language;


    const title =
        document.getElementById("title");

    const subtitle =
        document.getElementById("subtitle");

    const destinationTitle =
        document.getElementById(
            "destinationTitle"
        );

    const blockLabel =
        document.getElementById(
            "blockLabel"
        );

    const floorLabel =
        document.getElementById(
            "floorLabel"
        );

    const roomLabel =
        document.getElementById(
            "roomLabel"
        );

    const findButton =
        document.getElementById(
            "findButton"
        );

    const mapTitle =
        document.getElementById(
            "mapTitle"
        );

    const mapSubtitle =
        document.getElementById(
            "mapSubtitle"
        );

    const mapNote =
        document.getElementById(
            "mapNote"
        );

    const directionsTitle =
        document.getElementById(
            "directionsTitle"
        );


    // =================================
    // KANNADA
    // =================================

    if (language === "kn") {

        title.innerText =
            "MCE ಕ್ಯಾಂಪಸ್ ನ್ಯಾವಿಗೇಟರ್";

        subtitle.innerText =
            "ನಿಮ್ಮ ಬ್ಲಾಕ್, ಮಹಡಿ ಮತ್ತು ಕೊಠಡಿಯನ್ನು ಹುಡುಕಿ";

        destinationTitle.innerText =
            "🔎 ನಿಮ್ಮ ಗಮ್ಯಸ್ಥಾನವನ್ನು ಹುಡುಕಿ";

        blockLabel.innerText =
            "1. ಬ್ಲಾಕ್ ಆಯ್ಕೆಮಾಡಿ";

        floorLabel.innerText =
            "2. ಮಹಡಿ ಆಯ್ಕೆಮಾಡಿ";

        roomLabel.innerText =
            "3. ಕೊಠಡಿ / ಸೌಲಭ್ಯ ಆಯ್ಕೆಮಾಡಿ";

        findButton.innerText =
            "📍 ಸ್ಥಳವನ್ನು ತೋರಿಸಿ";

        mapTitle.innerText =
            "🗺️ MCE ಕ್ಯಾಂಪಸ್ ನಕ್ಷೆ";

        mapSubtitle.innerText =
            "ಸ್ಥಳವನ್ನು ನೋಡಲು ಕೊಠಡಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.";

        mapNote.innerText =
            "ℹ️ ಕೆಲವು ಕಟ್ಟಡಗಳ ನಿಖರ ಸ್ಥಳಗಳನ್ನು ಅಧಿಕೃತ ಕ್ಯಾಂಪಸ್ ಲೇಔಟ್ ಆಧರಿಸಿ ಮುಂದಿನ ಹಂತದಲ್ಲಿ ನವೀಕರಿಸಲಾಗುತ್ತದೆ.";

        directionsTitle.innerText =
            "🧭 ಮಾರ್ಗದರ್ಶನ";
    }


    // =================================
    // ENGLISH
    // =================================

    else {

        title.innerText =
            "MCE Campus Navigator";

        subtitle.innerText =
            "Find your block, floor and room";

        destinationTitle.innerText =
            "🔎 Find Your Destination";

        blockLabel.innerText =
            "1. Select Block";

        floorLabel.innerText =
            "2. Select Floor";

        roomLabel.innerText =
            "3. Select Room / Facility";

        findButton.innerText =
            "📍 Show Location";

        mapTitle.innerText =
            "🗺️ MCE Campus Map";

        mapSubtitle.innerText =
            "Select a room to see its destination.";

        mapNote.innerText =
            "ℹ️ Some building positions are currently prototype locations and will be updated using the official campus layout.";

        directionsTitle.innerText =
            "🧭 Directions";
    }


    // =================================
    // REFRESH CURRENT DESTINATION
    // =================================

    const selectedBlock =
        blockSelect.value;

    const selectedFloor =
        floorSelect.value;

    const selectedRoom =
        roomSelect.value;


    if (
        selectedBlock !== "" &&
        selectedFloor !== "" &&
        selectedRoom !== ""
    ) {

        findDestination();

    }

}


// =====================================
// WINDOW RESIZE
// =====================================

window.addEventListener(
    "resize",
    function () {

        const selectedBlock =
            blockSelect.value;

        const selectedFloor =
            floorSelect.value;

        const selectedRoom =
            roomSelect.value;


        if (
            selectedBlock !== "" &&
            selectedFloor !== "" &&
            selectedRoom !== ""
        ) {

            showDestinationOnMap(
                selectedBlock
            );

        }

    }
);
