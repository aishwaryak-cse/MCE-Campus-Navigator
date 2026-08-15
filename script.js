// =====================================
// MCE CAMPUS NAVIGATOR V2
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
// LANGUAGE
// =====================================

let currentLanguage = "en";


// =====================================
// ELEMENTS
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

    const block = this.value;

    floorSelect.innerHTML =
        '<option value="">Select a floor</option>';

    roomSelect.innerHTML =
        '<option value="">Select a room</option>';

    roomSelect.disabled = true;


    if (block === "") {

        floorSelect.disabled = true;

        return;
    }


    floorSelect.disabled = false;


    const floors =
        campusData[block].floors;


    Object.keys(floors).forEach(function (floor) {

        const option =
            document.createElement("option");

        option.value = floor;

        option.textContent =
            floors[floor].name;

        floorSelect.appendChild(option);

    });

});


// =====================================
// FLOOR → ROOM
// =====================================

floorSelect.addEventListener("change", function () {

    const block =
        blockSelect.value;

    const floor =
        this.value;


    roomSelect.innerHTML =
        '<option value="">Select a room</option>';


    if (floor === "") {

        roomSelect.disabled = true;

        return;
    }


    roomSelect.disabled = false;


    const rooms =
        campusData[block]
            .floors[floor]
            .rooms;


    Object.keys(rooms).forEach(function (room) {

        const option =
            document.createElement("option");

        option.value = room;

        option.textContent =
            rooms[room];

        roomSelect.appendChild(option);

    });

});


// =====================================
// SHOW LOCATION
// =====================================

function findDestination() {

    const block =
        blockSelect.value;

    const floor =
        floorSelect.value;

    const room =
        roomSelect.value;


    const result =
        document.getElementById("result");


    if (!block || !floor || !room) {

        result.style.display = "block";

        result.innerHTML =
            currentLanguage === "en"

                ? "⚠️ Please select a block, floor and room."

                : "⚠️ ದಯವಿಟ್ಟು ಬ್ಲಾಕ್, ಮಹಡಿ ಮತ್ತು ಕೊಠಡಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.";

        return;
    }


    const blockName =
        campusData[block].name;

    const floorName =
        campusData[block]
            .floors[floor]
            .name;

    const roomName =
        campusData[block]
            .floors[floor]
            .rooms[room];


    result.style.display = "block";


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

        (
            currentLanguage === "en"
                ? "Follow the highlighted route from the Main Gate."
                : "ಮುಖ್ಯ ಗೇಟ್‌ನಿಂದ ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ."
        );


    // Update directions

    const directions =
        document.getElementById("directionsText");

    directions.innerText =

        currentLanguage === "en"

            ? "🚶 Start at the Main Gate → follow the highlighted route → reach " +
              roomName +
              " in " +
              blockName +
              "."

            : "🚶 ಮುಖ್ಯ ಗೇಟ್‌ನಿಂದ ಪ್ರಾರಂಭಿಸಿ → ಹೈಲೈಟ್ ಮಾಡಿರುವ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ → " +
              blockName +
              " ನ " +
              roomName +
              " ತಲುಪಿ.";


    showDestinationOnMap(block);

}


// =====================================
// MAP DESTINATION
// =====================================

function showDestinationOnMap(block) {

    const marker =
        document.getElementById("destinationMarker");

    const route =
        document.getElementById("routeLine");


    const gate =
        document.getElementById("mainGate");


    const destination =
        document.querySelector(
            `[data-block="${block}"]`
        );


    if (!destination) {

        marker.style.display = "none";

        route.style.display = "none";

        return;
    }


    // Remove previous highlight

    document
        .querySelectorAll(".map-place")
        .forEach(function (element) {

            element.classList.remove("selected");

        });


    destination.classList.add("selected");


    const map =
        document.querySelector(".campus-map");


    const mapRect =
        map.getBoundingClientRect();

    const gateRect =
        gate.getBoundingClientRect();

    const destinationRect =
        destination.getBoundingClientRect();


    // Destination marker

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


    // Route start

    const startX =
        gateRect.left -
        mapRect.left +
        gateRect.width / 2;

    const startY =
        gateRect.top -
        mapRect.top +
        gateRect.height / 2;


    // Route end

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


    route.style.left =
        startX + "px";

    route.style.top =
        startY + "px";

    route.style.width =
        distance + "px";

    route.style.transform =
        `rotate(${angle}deg)`;

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
        document.getElementById("destinationTitle");

    const blockLabel =
        document.getElementById("blockLabel");

    const floorLabel =
        document.getElementById("floorLabel");

    const roomLabel =
        document.getElementById("roomLabel");

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
            "ℹ️ ಕೆಲವು ಕಟ್ಟಡಗಳ ನಿಖರ ಭೌಗೋಳಿಕ ಸ್ಥಾನಗಳನ್ನು ಅಧಿಕೃತ ಕ್ಯಾಂಪಸ್ ಲೇಔಟ್ ಆಧರಿಸಿ ಮುಂದಿನ ಹಂತದಲ್ಲಿ ನವೀಕರಿಸಲಾಗುತ್ತದೆ.";

        directionsTitle.innerText =
            "🧭 ಮಾರ್ಗದರ್ಶನ";

    } else {

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

}
