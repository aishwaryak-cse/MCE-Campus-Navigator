// =====================================
// MCE CAMPUS NAVIGATOR V3
// =====================================

const campusData = {

    SA: {
        name: "SA Block",
        floors: {

            "1": {
                name: "First Floor",
                rooms: {
                    "AU101": "Classroom",
                    "AU102": "Classroom"
                }
            },

            "2": {
                name: "Second Floor",
                rooms: {
                    "AU303": "ICT Classroom"
                }
            }
        }
    },

    CRB: {
        name: "CRB Block",
        floors: {

            "1": {
                name: "First Floor",
                rooms: {}
            },

            "2": {
                name: "Second Floor",
                rooms: {}
            }
        }
    },

    ECE: {
        name: "ECE Block",
        floors: {

            "1": {
                name: "First Floor",
                rooms: {}
            },

            "2": {
                name: "Second Floor",
                rooms: {}
            }
        }
    }
};


// =====================================
// LANGUAGE
// =====================================

let currentLanguage = "en";

let currentDestination = null;


// =====================================
// MAP POSITIONS
// Prototype positions
// =====================================

const buildingPositions = {

    SA: {
        x: 13,
        y: 18
    },

    CRB: {
        x: 82,
        y: 18
    },

    ECE: {
        x: 13,
        y: 70
    }

};


// =====================================
// ELEMENTS
// =====================================

const blockSelect =
    document.getElementById("block");

const floorSelect =
    document.getElementById("floor");

const roomSelect =
    document.getElementById("room");

const result =
    document.getElementById("result");

const destinationMarker =
    document.getElementById("destinationMarker");

const routeLine =
    document.getElementById("routeLine");

const directionsText =
    document.getElementById("directionsText");


// =====================================
// BLOCK CHANGE
// =====================================

blockSelect.addEventListener(
    "change",
    function () {

        const block =
            blockSelect.value;

        floorSelect.innerHTML =
            '<option value="">Select a floor</option>';

        roomSelect.innerHTML =
            '<option value="">Select a room</option>';

        roomSelect.disabled = true;

        if (!block) {

            floorSelect.disabled = true;

            return;
        }

        floorSelect.disabled = false;

        const floors =
            campusData[block].floors;

        Object.keys(floors).forEach(
            floorNumber => {

                const option =
                    document.createElement("option");

                option.value =
                    floorNumber;

                option.textContent =
                    floors[floorNumber].name;

                floorSelect.appendChild(option);

            }
        );

    }
);


// =====================================
// FLOOR CHANGE
// =====================================

floorSelect.addEventListener(
    "change",
    function () {

        const block =
            blockSelect.value;

        const floor =
            floorSelect.value;

        roomSelect.innerHTML =
            '<option value="">Select a room</option>';

        if (!block || !floor) {

            roomSelect.disabled = true;

            return;
        }

        roomSelect.disabled = false;

        const rooms =
            campusData[block]
                .floors[floor]
                .rooms;

        Object.keys(rooms).forEach(
            roomNumber => {

                const option =
                    document.createElement("option");

                option.value =
                    roomNumber;

                option.textContent =
                    roomNumber +
                    " — " +
                    rooms[roomNumber];

                roomSelect.appendChild(option);

            }
        );

    }
);


// =====================================
// FIND DESTINATION
// =====================================

function findDestination() {

    const block =
        blockSelect.value;

    const floor =
        floorSelect.value;

    const room =
        roomSelect.value;


    if (!block || !floor || !room) {

        showError();

        return;
    }


    showDestination(
        block,
        floor,
        room
    );
}


// =====================================
// SHOW DESTINATION
// =====================================

function showDestination(
    block,
    floor,
    room
) {

    const building =
        campusData[block];

    const floorData =
        building.floors[floor];

    const roomType =
        floorData.rooms[room];


    currentDestination = {

        block,
        floor,
        room,

        building:
            building.name,

        floorName:
            floorData.name,

        roomType

    };


    // RESULT

    result.style.display =
        "block";

    result.innerHTML =

        "📍 <strong>" +
        room +
        "</strong><br><br>" +

        "🏢 " +
        building.name +
        "<br>" +

        "🏬 " +
        floorData.name +
        "<br>" +

        "🚪 " +
        roomType +
        "<br><br>" +

        "🚶 Follow the highlighted route " +
        "from the Main Gate.";


    // MAP

    selectBuilding(block);

    showMarker(block);

    drawRoute(block);


    // DIRECTIONS

    updateDirections(
        block,
        floor,
        room
    );


    // RECENT

    saveRecent(
        block,
        floor,
        room
    );

}


// =====================================
// SELECT BUILDING
// =====================================

function selectBuilding(block) {

    document
        .querySelectorAll(".building")
        .forEach(
            building => {

                building.classList.remove(
                    "selected"
                );

            }
        );


    const selected =
        document.querySelector(
            `[data-block="${block}"]`
        );


    if (selected) {

        selected.classList.add(
            "selected"
        );

    }

}


// =====================================
// DESTINATION MARKER
// =====================================

function showMarker(block) {

    const position =
        buildingPositions[block];


    destinationMarker.style.display =
        "block";


    destinationMarker.style.left =
        position.x + "%";


    destinationMarker.style.top =
        position.y + "%";

}


// =====================================
// DRAW ROUTE
// =====================================

function drawRoute(block) {

    const position =
        buildingPositions[block];


    const startX = 10;
    const startY = 88;


    const endX =
        position.x;

    const endY =
        position.y;


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
        Math.atan2(
            dy,
            dx
        ) *
        (180 / Math.PI);


    routeLine.style.display =
        "block";


    routeLine.style.left =
        startX + "%";


    routeLine.style.top =
        startY + "%";


    routeLine.style.width =
        distance + "%";


    routeLine.style.transform =
        "rotate(" +
        angle +
        "deg)";

}


// =====================================
// DIRECTIONS
// =====================================

function updateDirections(
    block,
    floor,
    room
) {

    const building =
        campusData[block].name;

    const floorName =
        campusData[block]
            .floors[floor]
            .name;


    if (currentLanguage === "kn") {

        directionsText.innerText =

            "1️⃣ ಮುಖ್ಯ ಗೇಟ್‌ನಿಂದ ಒಳಗೆ ಬನ್ನಿ.\n" +

            "2️⃣ " +
            building +
            " ಕಡೆಗೆ ಹೋಗಿ.\n" +

            "3️⃣ " +
            floorName +
            " ಗೆ ಹೋಗಿ.\n" +

            "4️⃣ ಕೊಠಡಿ " +
            room +
            " ಅನ್ನು ಹುಡುಕಿ.\n\n" +

            "📍 ನಿಮ್ಮ ಗಮ್ಯಸ್ಥಾನವನ್ನು ನಕ್ಷೆಯಲ್ಲಿ ಗುರುತಿಸಲಾಗಿದೆ.";

    } else {

        directionsText.innerText =

            "1️⃣ Enter through the Main Gate.\n" +

            "2️⃣ Walk towards " +
            building +
            ".\n" +

            "3️⃣ Go to the " +
            floorName +
            ".\n" +

            "4️⃣ Find room " +
            room +
            ".\n\n" +

            "📍 Your destination is marked on the map.";

    }

}


// =====================================
// SEARCH ROOM
// =====================================

function searchRoom() {

    const input =
        document
            .getElementById("roomSearch")
            .value
            .trim()
            .toUpperCase();


    const suggestions =
        document.getElementById(
            "searchSuggestions"
        );


    suggestions.innerHTML = "";


    if (!input) {

        return;
    }


    let found = false;


    Object.keys(campusData)
        .forEach(
            block => {

                const floors =
                    campusData[block].floors;


                Object.keys(floors)
                    .forEach(
                        floor => {

                            const rooms =
                                floors[floor].rooms;


                            Object.keys(rooms)
                                .forEach(
                                    room => {

                                        if (
                                            room.includes(input)
                                        ) {

                                            found = true;


                                            const item =
                                                document.createElement(
                                                    "div"
                                                );

                                            item.className =
                                                "suggestion";


                                            item.innerHTML =

                                                "📍 <strong>" +
                                                room +
                                                "</strong> — " +

                                                campusData[block]
                                                    .name;


                                            item.onclick =
                                                function () {

                                                    selectDestinationFromSearch(
                                                        block,
                                                        floor,
                                                        room
                                                    );

                                                };


                                            suggestions.appendChild(
                                                item
                                            );

                                        }

                                    }
                                );

                        }
                    );

            }
        );


    if (!found) {

        suggestions.innerHTML =
            currentLanguage === "kn"
                ? "❌ ಕೊಠಡಿ ಕಂಡುಬಂದಿಲ್ಲ."
                : "❌ Room not found.";

    }

}


// =====================================
// SEARCH RESULT SELECT
// =====================================

function selectDestinationFromSearch(
    block,
    floor,
    room
) {

    blockSelect.value =
        block;


    blockSelect.dispatchEvent(
        new Event("change")
    );


    floorSelect.value =
        floor;


    floorSelect.dispatchEvent(
        new Event("change")
    );


    roomSelect.value =
        room;


    document.getElementById(
        "roomSearch"
    ).value =
        room;


    document.getElementById(
        "searchSuggestions"
    ).innerHTML = "";


    showDestination(
        block,
        floor,
        room
    );

}


// =====================================
// VOICE DIRECTIONS
// =====================================

function speakDirections() {

    if (!currentDestination) {

        const message =
            currentLanguage === "kn"
                ? "ದಯವಿಟ್ಟು ಮೊದಲು ಒಂದು ಕೊಠಡಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ."
                : "Please select a destination first.";

        speak(message);

        return;
    }


    const data =
        currentDestination;


    let message;


    if (currentLanguage === "kn") {

        message =

            "ಮುಖ್ಯ ಗೇಟ್‌ನಿಂದ ಒಳಗೆ ಬನ್ನಿ. " +

            data.building +
            " ಕಡೆಗೆ ಹೋಗಿ. " +

            data.floorName +
            " ಗೆ ಹೋಗಿ. " +

            data.room +
            " ಕೊಠಡಿಯನ್ನು ಹುಡುಕಿ.";

    } else {

        message =

            "Enter through the main gate. " +

            "Walk towards " +
            data.building +
            ". " +

            "Go to the " +
            data.floorName +
            ". " +

            "Find room " +
            data.room +
            ".";

    }


    speak(message);

}


// =====================================
// TEXT TO SPEECH
// =====================================

function speak(text) {

    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Voice guidance is not supported by this browser."
        );

        return;
    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(text);


    speech.lang =
        currentLanguage === "kn"
            ? "kn-IN"
            : "en-IN";


    speech.rate = 0.9;


    window.speechSynthesis.speak(
        speech
    );

}


// =====================================
// RECENT DESTINATIONS
// =====================================

function saveRecent(
    block,
    floor,
    room
) {

    let recent =
        JSON.parse(
            localStorage.getItem(
                "mceRecent"
            )
        ) || [];


    const item = {

        block,
        floor,
        room

    };


    recent =
        recent.filter(
            destination =>
                !(
                    destination.block === block &&
                    destination.floor === floor &&
                    destination.room === room
                )
        );


    recent.unshift(item);


    recent =
        recent.slice(0, 5);


    localStorage.setItem(
        "mceRecent",
        JSON.stringify(recent)
    );


    displayRecent();

}


// =====================================
// DISPLAY RECENT
// =====================================

function displayRecent() {

    const container =
        document.getElementById(
            "recentDestinations"
        );


    let recent =
        JSON.parse(
            localStorage.getItem(
                "mceRecent"
            )
        ) || [];


    if (recent.length === 0) {

        container.innerHTML =
            "<p>No recent destinations yet.</p>";

        return;
    }


    container.innerHTML = "";


    recent.forEach(
        destination => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "recent-item";


            item.innerHTML =

                "<span>" +

                "📍 " +
                destination.room +

                " — " +

                campusData[
                    destination.block
                ].name +

                "</span>" +


                "<button>Open</button>";


            item
                .querySelector("button")
                .onclick =
                function () {

                    selectDestinationFromSearch(
                        destination.block,
                        destination.floor,
                        destination.room
                    );

                };


            container.appendChild(
                item
            );

        }
    );

}


// =====================================
// LANGUAGE
// =====================================

function setLanguage(language) {

    currentLanguage =
        language;


    if (language === "kn") {

        document.getElementById(
            "title"
        ).innerText =
            "MCE ಕ್ಯಾಂಪಸ್ ನ್ಯಾವಿಗೇಟರ್";


        document.getElementById(
            "subtitle"
        ).innerText =
            "ನಿಮ್ಮ ಬ್ಲಾಕ್, ಮಹಡಿ ಮತ್ತು ಕೊಠಡಿಯನ್ನು ಹುಡುಕಿ";


        document.getElementById(
            "searchTitle"
        ).innerText =
            "🔎 ತ್ವರಿತ ಹುಡುಕಾಟ";


        document.getElementById(
            "searchSubtitle"
        ).innerText =
            "ಕೊಠಡಿ ಸಂಖ್ಯೆಯನ್ನು ನೇರವಾಗಿ ನಮೂದಿಸಿ";


        document.getElementById(
            "searchButton"
        ).innerText =
            "ಹುಡುಕಿ";


        document.getElementById(
            "destinationTitle"
        ).innerText =
            "🔎 ನಿಮ್ಮ ಗಮ್ಯಸ್ಥಾನವನ್ನು ಹುಡುಕಿ";


        document.getElementById(
            "blockLabel"
        ).innerText =
            "1. ಬ್ಲಾಕ್ ಆಯ್ಕೆಮಾಡಿ";


        document.getElementById(
            "floorLabel"
        ).innerText =
            "2. ಮಹಡಿ ಆಯ್ಕೆಮಾಡಿ";


        document.getElementById(
            "roomLabel"
        ).innerText =
            "3. ಕೊಠಡಿ / ಸೌಲಭ್ಯ ಆಯ್ಕೆಮಾಡಿ";


        document.getElementById(
            "findButton"
        ).innerText =
            "📍 ಸ್ಥಳ ತೋರಿಸಿ";


        document.getElementById(
            "mapTitle"
        ).innerText =
            "🗺️ MCE ಕ್ಯಾಂಪಸ್ ನಕ್ಷೆ";


        document.getElementById(
            "directionsTitle"
        ).innerText =
            "🧭 ಮಾರ್ಗ";


        document.getElementById(
            "voiceButton"
        ).innerText =
            "🔊 ಮಾರ್ಗದರ್ಶನ ಕೇಳಿ";


        if (currentDestination) {

            updateDirections(
                currentDestination.block,
                currentDestination.floor,
                currentDestination.room
            );

        }

    } else {

        document.getElementById(
            "title"
        ).innerText =
            "MCE Campus Navigator";


        document.getElementById(
            "subtitle"
        ).innerText =
            "Find your block, floor and room";


        document.getElementById(
            "searchTitle"
        ).innerText =
            "🔎 Quick Search";


        document.getElementById(
            "searchSubtitle"
        ).innerText =
            "Enter a room number directly";


        document.getElementById(
            "searchButton"
        ).innerText =
            "Search";


        document.getElementById(
            "destinationTitle"
        ).innerText =
            "🔎 Find Your Destination";


        document.getElementById(
            "blockLabel"
        ).innerText =
            "1. Select Block";


        document.getElementById(
            "floorLabel"
        ).innerText =
            "2. Select Floor";


        document.getElementById(
            "roomLabel"
        ).innerText =
            "3. Select Room / Facility";


        document.getElementById(
            "findButton"
        ).innerText =
            "📍 Show Location";


        document.getElementById(
            "mapTitle"
        ).innerText =
            "🗺️ MCE Campus Map";


        document.getElementById(
            "directionsTitle"
        ).innerText =
            "🧭 Directions";


        document.getElementById(
            "voiceButton"
        ).innerText =
            "🔊 Hear Directions";


        if (currentDestination) {

            updateDirections(
                currentDestination.block,
                currentDestination.floor,
                currentDestination.room
            );

        }

    }

}


// =====================================
// ENTER KEY SEARCH
// =====================================

document
    .getElementById("roomSearch")
    .addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                searchRoom();

            }

        }
    );


// =====================================
// MAP BUILDING CLICK
// =====================================

document
    .querySelectorAll(".building")
    .forEach(
        building => {

            building.addEventListener(
                "click",
                function () {

                    const block =
                        this.dataset.block;

                    blockSelect.value =
                        block;

                    blockSelect.dispatchEvent(
                        new Event("change")
                    );

                    window.scrollTo({

                        top:
                            document
                                .querySelector(
                                    ".navigation-card"
                                )
                                .offsetTop,

                        behavior:
                            "smooth"

                    });

                }
            );

        }
    );


// =====================================
// ERROR MESSAGE
// =====================================

function showError() {

    result.style.display =
        "block";


    result.innerHTML =

        currentLanguage === "kn"

            ? "⚠️ ದಯವಿಟ್ಟು ಬ್ಲಾಕ್, ಮಹಡಿ ಮತ್ತು ಕೊಠಡಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ."

            : "⚠️ Please select a block, floor and room first.";

}


// =====================================
// INITIAL LOAD
// =====================================

displayRecent();
