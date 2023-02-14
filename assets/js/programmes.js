const content = document.getElementById("content-programmes")
const listProgrammes = document.getElementById("list-programmes")

let data = {}

function drawPrograme(key) {
    if (!data[key]) return;

    let select = data[key]

    content.innerHTML = `
        <img src="${select.image}" alt="" class="img-fluid services-img">
        <h3>${select.title}</h3>
        <p>${select.description}</p>
        ${Array.isArray(select.items) && select.items.length ? (`
            <ul>
                ${select.items.map(item => (`
                    <li><i class="bi bi-check-circle"></i> <span>${item}</span></li>
                `)).join("")}    
            </ul>
        `) : ""}
        
    `
}


function drawListPrograme() {
    Object.keys(data).forEach((key, i) => {
        let a = document.createElement("a")

        a.innerText = data[key].title || ""
        a.style.cursor = "pointer"

        if (i == 0) {
            a.classList.add("active")
            drawPrograme(key)
        }

        a.onclick = e => {
            e.preventDefault()
            e.stopPropagation()

            listProgrammes.querySelectorAll("a").forEach(a => {
                a.classList.remove("active")
            })

            a.classList.add("active")
            drawPrograme(key)

        }

        listProgrammes.appendChild(a)
    })
}

function getData() {
    get("public/programmes/programess.json", (res) => {
        if (!res) return
        data = res.coutries
        console.log({ res })
        drawListPrograme()

    })
}

document.addEventListener("DOMContentLoaded", () => {
    getData()
})
