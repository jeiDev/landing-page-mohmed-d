const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

function get(url, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      try {
        callback(JSON.parse(this.responseText));
      } catch (error) {
        console.log({ error });
        callback(this.responseText);
      }
    } else {
      callback(null);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function drawMenuInfo(parent, data) {
  parent.innerHTML = `
        ${data.image
      ? `
            <img src="${data.image || "assets/img/image-not-found.webp"
      }" alt="" class="img-fluid services-img">
        `
      : ""
    }
        <div>
            <h3>${data.title}</h3>
            <div class="box-list">
                ${data.adresse
      ? `
                    <div>${data.adresse}</div>
                `
      : ""
    }

                ${data.aggreement_year
      ? `
                    <div>${data.aggreement_year}</div>
                `
      : ""
    }
            </div>
        </div>
        <p>${data.description}</p>
        <ul>
            ${Array.isArray(data.items) && data.items.length
      ? data.items
        .map(
          (item) => `
                    <li><i class="bi bi-check-circle"></i> <span>${item}</span></li>
                `
        )
        .join("")
      : ""
    }
            
            ${data.email
      ? `
                <li><strong class="list-strong">Email: </strong><span>${data.email}</span></li>
            `
      : ""
    }
            ${data.bloglink
      ? `
                <a href="${data.bloglink}" target="_blank"><button type='submit'>Consulter les activités et projets dans ce bureau pays</button></a>
            `
      : ""
    }
            
        </ul>
        
    `;
}

function removeActive(listBox) {
  listBox.querySelectorAll("a").forEach((a) => {
    a.classList.remove("active");
  });
}

function drawListMenuInfo(contentBox, listBox, data, active = false) {
  if (active) {
    removeActive(listBox);
  }

  let a = document.createElement("a");

  a.innerText = data.title || "";
  a.style.cursor = "pointer";

  if (active) {
    a.classList.add("active");
    drawMenuInfo(contentBox, data);
  }

  a.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    removeActive(listBox);

    a.classList.add("active");
    drawMenuInfo(contentBox, data);
  };

  listBox.appendChild(a);
}

function getRSS(url, callback) {
  var data = { rss: url };
  $.get(
    `https://api.rss2json.com/v1/api.json?rss_url=${data.rss}`,
    function (data) {
      callback(data);
    }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  includeHTML();
  header();
});
