const titleBanner = document.getElementById("title-banner")
const descriptionBanner = document.getElementById("description-banner")
const languageSelector = document.getElementById("language-select")


function drawInfoBanner(data) {
    titleBanner.innerText = data.title
    descriptionBanner.innerText = data.description
}

function getInfoBanner() {
    const selectedLanguage = localStorage.getItem("selectedLanguage") || "fr"
    get(`public/career/${selectedLanguage}/banner.json`, res => {
        if (!res) return
        drawInfoBanner(res)
    })
}

document.addEventListener("DOMContentLoaded", () => {
    getInfoBanner()
})
