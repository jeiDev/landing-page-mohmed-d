const ciaudFeedBox = document.getElementById("ciaudFeedBox")

function drawCiaudFeed(){
    if(!ciaudFeedBox) return 

    getRSS("https://blog.ciaud.ca/feed", (data) => {
        if(data.status != "ok" || !Array.isArray(data.items)) return


        ciaudFeedBox.innerHTML = data.items.slice(0, 4).map(item => (`
        
        `))
        console.log({data})
    })
   
}

document.addEventListener("DOMContentLoaded", () => {
    drawCiaudFeed()
})