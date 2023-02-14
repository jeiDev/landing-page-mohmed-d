const parentTeam = document.getElementById("team-main")
const parentProgram = document.getElementById("program")
const parentPropos = document.getElementById("propos")
const titleBanner = document.getElementById("title-banner")
const descriptionBanner = document.getElementById("description-banner")

/**
 * @typedef {Object} Social
 * @property {('twitter' | 'facebook' | 'instagram' | 'linkedin')} type
 * @property {string} link
 */


/**
 * @typedef {Object} Item
 * @property {string} name
 * @property {string} headline
 * @property {string} image
 * @property {string} description
 * @property {Social[]} socials
 */

/**
 * 
 * @param {Item} item 
 */
function drawTeam(item) {
    let box = document.createElement("div")
    box.setAttribute("class", "col-lg-4 col-md-6 d-flex")

    box.innerHTML = `
        <div class="member">
            <img src="${item.image}" class="img-fluid" alt="">
            <div class="member-content">
            <h4>${item.name}</h4>
            <span>${item.headline}</span>
            <p>${item.description}</p>
            <div class="social">
                ${item.socials.map(social => (
                    `<a href="${social.link}"><i class="bi bi-${social.type}"></i></a>`
                )).join("")}
            </div>
            </div>
        </div>
    `

    parentTeam.appendChild(box)

}



async function getTeam(){
    get("public/about/team.json", res => {
        if(!res) return
        res.forEach(item => (drawTeam(item)))
    })
}


function drawProgram(data){
    let title = parentProgram.querySelector("h2")
    let description = parentProgram.querySelector("p")
    let button = parentProgram.querySelector(".button-n")

    title.innerText = data.title
    description.innerText = data.description
    button.innerText = data.button.title
}

async function getProgram(){
    get("public/about/program.json", res => {
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
            <div class="col-lg-6 position-relative align-self-start order-lg-last order-first">
                <img src="${data.image}" class="img-fluid" alt="">
            </div>
            <div class="col-lg-6 content content-info ${data.position == 'left' ? 'order-last order-lg-first' : 'order-last order-lg-last'}">
                <h6>À PROPOS</h6>
                <h3>${data.title}</h3>
                <p>${data.description}</p>
                <a href="${data.button.link}" class="readmore stretched-link">
                <span>${data.button.title}</span>
                <i class="bi bi-arrow-right"></i>
                </a>
                ${data.items ? (`
                    <ul>
                       ${data.items.map(item => (`
                        <li><i class="bi bi-check"></i> ${item}</li>
                       `)).join("")}
                    </ul>
                `) : ""}
                
            </div>
            </div>
        </div>
    `

    parentPropos.appendChild(el)
}

function getPropos(){
    get("public/about/propos.json", res => {
        if(!res) return 
        res.forEach(item => (drawPropos(item)))
    })
}

function drawInfoBanner(data){
    titleBanner.innerText = data.title
    descriptionBanner.innerText = data.description
}

function getInfoBanner(){
    get("public/about/banner.json", res => {
        if(!res) return 
        drawInfoBanner(res)
    })
}

document.addEventListener("DOMContentLoaded", () => {
    getTeam()
    getProgram()
    getPropos()
    getInfoBanner()
})
