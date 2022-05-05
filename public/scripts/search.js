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
                <h3>${title}</h3>
                <p>${comment}</p>
                <p>Mumbai: Stepping up his attack on the ruling Shiv Sena in Maharashtra, MNS chief Raj Thackeray on
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
                disturbed by the sound of 'azaan'.

                In the 36-second video tweeted on Wednesday by the MNS chief, Bal Thackeray was seen draped in a
                saffron shawl
                with the Shiv Sena symbol in the background.

                The Sena supremo was seen in the video saying, "The day my government comes to power, praying of
                namaz will be
                stopped because religion should be such that it doesn't create an impediment in national
                development."

                "If our Hindu religion is creating an impediment then tell me, I will take care of it...Loudspeakers
                will be
                removed from masjids," Bal Thackeray said in the old clip.
            </p>
            `;
    });

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


main()