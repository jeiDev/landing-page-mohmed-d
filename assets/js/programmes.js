const content = document.getElementById("content-programmes")
const listProgrammes = document.getElementById("list-programmes")

function drawListCountry(data) {
    Object.keys(data).forEach((key, i) => {
        drawListMenuInfo(content, listCountries, data[key],  params.country == key || i == 0)
    })
}

function getData() {
    get("public/programmes/programess.json", (res) => {
        if (!res) return
        drawListCountry(res.programess)
    })
}

document.addEventListener("DOMContentLoaded", () => {
    getData()
})
