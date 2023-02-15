function get(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                callback(JSON.parse(this.responseText))
            } catch (error) {
                callback(this.responseText)
            }
        } else {
            callback(null)
        }
    };
    xhttp.open("GET", url, true)
    xhttp.send()
}

function drawMenuInfo(parent, data) {
    parent.innerHTML = `
        <img src="${data.image || 'assets/img/image-not-found.png'}" alt="" class="img-fluid services-img">
        <div>
            <h3>${data.title}</h3>
            <div class="box-list">
                ${data.adresse ? (`
                    <div>${data.adresse}</div>
                `) : ""}

                ${data.aggreement_year ? (`
                    <div>${data.aggreement_year}</div>
                `) : ""}
            </div>
        </div>
        <p>${data.description}</p>
        <ul>
            ${Array.isArray(data.items) && data.items.length ? (
                data.items.map(item => (`
                    <li><i class="bi bi-check-circle"></i> <span>${item}</span></li>
                `)).join("")
            ) : ""}
            
            ${data.email ? (`
                <li><strong class="list-strong">Email: </strong><span>${data.email}</span></li>
            `) : ""}
            ${data.phone ? (`
                <li><strong class="list-strong">Phone: </strong><span>${data.phone}</span></li>
            `) : ""}
            
        </ul>
        
    `
}


function drawListMenuInfo(contentBox, listBox, data, active = false) {
    let a = document.createElement("a")

    a.innerText = data.title || ""
    a.style.cursor = "pointer"

    if (active) {
        a.classList.add("active")
        drawMenuInfo(contentBox, data)
    }

    a.onclick = e => {
        e.preventDefault()
        e.stopPropagation()

        listBox.querySelectorAll("a").forEach(a => {
            a.classList.remove("active")
        })

        a.classList.add("active")
        drawMenuInfo(contentBox, data)

    }

    listBox.appendChild(a)
}

document.addEventListener("DOMContentLoaded", () => {
    includeHTML();
    header();
})