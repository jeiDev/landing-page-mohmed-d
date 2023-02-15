const content = document.getElementById("content-programmes")
const listProgrammes = document.getElementById("list-programmes")

function drawListCountry(data) {
    Object.keys(data).forEach((key, i) => {
        drawListMenuInfo(content, listProgrammes, data[key], i == 0)
    })
}

function getData() {
    get("public/country/countries-data.json", (res) => {
        if (!res) return
        drawListCountry(res.coutries)
    })
}

document.addEventListener("DOMContentLoaded", () => {
    getData()
})
