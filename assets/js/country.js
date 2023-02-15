const content = document.getElementById("content-countries")
const listCountries = document.getElementById("list-countries")

function drawListCountry(data) {
    Object.keys(data).forEach((key, i) => {
        drawListMenuInfo(content, listCountries, data[key],  params.country == key || i == 0)
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
