function get(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                callback(JSON.parse(this.responseText))
            } catch (error) {
                callback(this.responseText)
            }
        }else{
            callback(null)
        }
    };
    xhttp.open("GET", url, true)
    xhttp.send()
}

document.addEventListener("DOMContentLoaded", () => {
    includeHTML();
    header();
})