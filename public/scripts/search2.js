async function getNewsById(id) {
    return fetch(`/news/${id}`)
        .then(data => data.json())
        .catch(err => {
            alert("Something went wrong");
            console.error(err);
            return { news: {} };
        });
}

async function getNews() {
    return fetch("/news")
        .then(data => data.json())
        .then(data => data.news)
        .catch(err => {
            alert("Something went wrong");
            console.error(err);
            return { news: {} };
        });
}

async function main() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const newsId = urlSearchParams.get('id');
    getNewsById(newsId).then(data => data.news).then(({ title, comment, mediaImage }) => {
        const newsContainer = document.getElementById('container');
        newsContainer.className = "topNewsContainer";
        newsContainer.innerHTML = `
                <img class="searchTopStoryImage" src=${mediaImage} alt="">
                <h2>${title}</h2>
                <p class="change">${comment}</p>
                <p id="space">Mumbai: Stepping up his attack on the ruling Shiv Sena in Maharashtra, MNS chief Raj Thackeray on
                Wednesday
                tweeted an old video of late Sena founder Bal Thackeray in which the latter was seen saying the day
                his party
                comes to power, praying of namaz on roads will be stopped and loudspeakers from mosques will be
                removed.

                Raj Thackeray had on Tuesday urged people to play Hanuman Chalisa on loudspeakers on Wednesday
                wherever they
                hear loudspeakers "blaring azaan (Islamic prayer call)

                In an open letter, the MNS leader had asked people to lodge complaint with police by dialling 100 if
                they are
                disturbed by the sound of 'azaan'.<br>

                In the 36-second video tweeted on Wednesday by the MNS chief, Bal Thackeray was seen draped in a
                saffron shawl
                with the Shiv Sena symbol in the background.

                The Sena supremo was seen in the video saying, "The day my government comes to power, praying of
                namaz will be
                stopped because religion should be such that it doesn't create an impediment in national
                development."<br>

                "If our Hindu religion is creating an impediment then tell me, I will take care of it...Loudspeakers
                will be
                removed from masjids," Bal Thackeray said in the old clip.<br>
                <br>
                A joint statement on Thursday said: “India and France expressed serious concern at the ongoing conflict and humanitarian crisis in Ukraine. 
                They unequivocally condemned the civilian deaths in Ukraine and called for an immediate cessation of hostilities to bring parties together to promote dialogue and diplomacy to find an immediate end to the suffering of the people.
                 Both countries underlined the need to respect the UN Charter, international law and the sovereignty and territorial integrity of states. 
                 The two leaders discussed the regional and global implications of the conflict in Ukraine and agreed to intensify coordination on the issue.”
            </p>
            `;
    });
    function redirect(id) {
        return function () {
            window.location.href = `search.html?id=${id}`;
        }
    }

    getNews().then(({ MID }) => {
        const midContainer = document.getElementById('mid');
        MID.forEach(({ mediaImage, comment }) => {
            const newsContainer = document.createElement('div');
            newsContainer.className = "searchMidNewsContainer";
            newsContainer.innerHTML = `
                <img class="searchMidImage" src=${mediaImage} alt="">
                <p>${comment}</p>
            `;

            midContainer.appendChild(newsContainer);
        });
    })

}
async function main() {
    const { news } = await getNews();
    renderElement(news);
}


main()