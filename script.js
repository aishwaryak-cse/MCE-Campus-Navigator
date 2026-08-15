alert("MCE JavaScript is working!");

const block = document.getElementById("block");
const floor = document.getElementById("floor");

block.addEventListener("change", function () {

    floor.disabled = false;

    floor.innerHTML = `
        <option value="">Select a floor</option>
        <option value="1">First Floor</option>
        <option value="2">Second Floor</option>
    `;

});
