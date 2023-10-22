const content = document.getElementById("content-countries")
const listCountries = document.getElementById("list-countries")
const languageSelector = document.getElementById("language-select")

function drawListCountry(data) {
    Object.keys(data).forEach((key, i) => {
        drawListMenuInfo(content, listCountries, data[key], params.country == key || i == 0)
    })
}

function getData() {
    const selectedLanguage = localStorage.getItem("selectedLanguage") || "fr"
    get(`public/country/${selectedLanguage}/countries-data.json?v=3`, (res) => {
        if (!res) return
        drawListCountry(res.coutries)
    })
}

document.addEventListener("DOMContentLoaded", () => {
    getData()
})