const parentProgram = document.getElementById("program")
const parentPropos = document.getElementById("propos")
const titleBanner = document.getElementById("title-banner")
const descriptionBanner = document.getElementById("description-banner")


function drawProgram(data){
    let title = parentProgram.querySelector("h2")
    let description = parentProgram.querySelector("p")
    let button = parentProgram.querySelector(".button-n")

    title.innerText = data.title
    description.innerText = data.description
    button.innerText = data.button.title
}

async function getProgram(){
    get("public/volunteering/program.json", res => {
        if(!res) return 
        drawProgram(res)
    })
}

function drawPropos(data){
    let el = document.createElement("section")

    el.classList.add("about")

    el.innerHTML = `
        <div class="container about-content">
            <div class="row gy-4">
            <div class="col-lg-6 position-relative align-self-start order-lg-last order-first grid-images">
                ${data.images.map(image => (`
                    <img src="${image}" class="img-fluid" alt="">
                `)).join("")}
            </div>
            <div class="col-lg-6 content content-info ${data.position == 'left' ? 'order-last order-lg-first' : 'order-last order-lg-last'}">
                <h6>REJOIGNEZ-NOUS DANS NOTRE MISSION</h6>
                <h3>${data.title}</h3>
                <p>${data.description}</p>
            </div>
            </div>
        </div>
    `

    parentPropos.appendChild(el)
}

function getPropos(){
    get("public/volunteering/propos.json", res => {
        if(!res) return 
        res.forEach(item => (drawPropos(item)))
    })
}

function drawInfoBanner(data){
    titleBanner.innerText = data.title
    descriptionBanner.innerText = data.description
}

function getInfoBanner(){
    get("public/volunteering/banner.json", res => {
        if(!res) return 
        drawInfoBanner(res)
    })
}

document.addEventListener("DOMContentLoaded", () => {
    getProgram()
    getPropos()
    getInfoBanner()
})
