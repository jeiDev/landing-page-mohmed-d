const ciaudFeedBox = document.getElementById("ciaudFeedBox")

function drawCiaudFeed() {
    if (!ciaudFeedBox) return

    getRSS("https://blog.ciaud.ca/feed", (data) => {
        if (data.status != "ok" || !Array.isArray(data.items)) return

        ciaudFeedBox.innerHTML = data.items.map(item => (`
            <li class="carouselTicker__item item-feed">
                <a href="">
                    <p>${item.title}<span>${new Date(item.pubDate).toDateString()}</span></p>
                </a>
            </li>
        `)).join("")
        console.log({data})
        $("#carouselTicker").carouselTicker();
    })

}

(function ($, undefined) {
    $(window).on("load", function () {
        drawCiaudFeed()
    });
})(jQuery);
