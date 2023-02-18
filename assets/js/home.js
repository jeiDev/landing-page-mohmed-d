const ciaudFeedBox = document.getElementById("ciaudFeedBox")

function drawCiaudFeed() {
    if (!ciaudFeedBox) return

    getRSS("https://blog.ciaud.ca/feed", (data) => {
        if (data.status != "ok" || !Array.isArray(data.items)) return

        ciaudFeedBox.innerHTML = data.items.map(item => (`
            <li class="carouselTicker__item item-feed">
                <a href="${item.link}" target="_blank">
                    <p>${item.title}<span>${new Date(item.pubDate).toDateString()}</span></p>
                </a>
            </li>
        `)).join("")

        $("#carouselTicker").carouselTicker();
    })

}

function chartMap() {
    get("public/home/map.json", (res) => {
        if(!res) return
        console.log({res})

        am5.ready(function () {
    
            var root = am5.Root.new("chartMap");
    
            root.setThemes([
                am5themes_Animated.new(root)
            ]);
    
            var chart = root.container.children.push(am5map.MapChart.new(root, {
                // panX: "rotateX",
                axis: 'horizontal',
                projection: am5map.geoNaturalEarth1(),
                maxZoomLevel: 1,
                scrollWheelZoom: false
            }));

            // chart.ctx.canvas.removeEventListener('wheel', chart._wheelHandler);
    
            var polygonSeries = chart.series.push(
                am5map.MapPolygonSeries.new(root, {
                    geoJSON: am5geodata_worldLow,
                    exclude: ["AQ"],
                    fill: "#d1dbdd",
                    stroke: am5.color(0x000000),
                    strokeWidth: 2,
                    wheelable: true
                })
            );
    
            var polygonTemplate = polygonSeries.mapPolygons.template;
            // polygonTemplate.
            polygonTemplate.setAll({
                tooltipText: "{name}",
                templateField: "polygonSettings",
                wheelable: false
            });
            
            if(Array.isArray(res.data) && res.leyends){
                polygonSeries.data.setAll(res.data.map(item => ({
                    ...item,
                    polygonSettings: res.leyends && res.leyends[item.leyend] ? {
                        fill: am5.color(res.leyends[item.leyend].color)
                    } : {}
                })))
            }

            
            chart.appear(1000, 100);
        });
    })

}


(function ($, undefined) {
    $(window).on("load", function () {
        drawCiaudFeed()
        chartMap()
    });
})(jQuery);
