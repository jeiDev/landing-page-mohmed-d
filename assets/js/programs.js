const content = document.getElementById("content-programs")
const listPrograms = document.getElementById("list-programs")
const languageSelector = document.getElementById("language-select");


function drawListCountry(data) {
    Object.keys(data).forEach((key, i) => {
        drawListMenuInfo(content, listPrograms, data[key], params.program == key || i == 0)
    })
}

function getData() {
    const selectedLanguage = localStorage.getItem("selectedLanguage") || "fr";

    get(`public/programs/${selectedLanguage}/programs.json`, (res) => {
        if (!res) return;
        drawListCountry(res.programs);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    getData()
})
