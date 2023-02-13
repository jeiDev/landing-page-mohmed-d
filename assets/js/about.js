const parentTeam = document.getElementById("team-main")
const parentProgram = document.getElementById("program")

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

function getTeam(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           try {
                JSON.parse(this.responseText).forEach(item => {
                    drawTeam(item)
                })
           } catch (error) {
                console.error("Could not parse data", error)
           }
        }
    };
    xhttp.open("GET", "public/about/team.json", true)
    xhttp.send()
}


function drawProgram(data){
    let title = parentProgram.querySelector("h2")
    let description = parentProgram.querySelector("p")
    let button = parentProgram.querySelector(".button-n")

    title.innerText = data.title
    description.innerText = data.description
    button.innerText = data.button.title
}

function getProgram(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           try {
                drawProgram(JSON.parse(this.responseText))
           } catch (error) {
                console.error("Could not parse data", error)
           }
        }
    };
    xhttp.open("GET", "public/about/program.json", true)
    xhttp.send()
}

document.addEventListener("DOMContentLoaded", () => {
    getTeam()
    getProgram()
})
