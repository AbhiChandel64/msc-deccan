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

function main() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const newsId = urlSearchParams.get('id');
    await getNewsById(newsId).then(data => data.news).then(({ title, comment, mediaImage }) => {
        const newsContainer = document.getElementById('container');
        newsContainer.className = "topNewsContainer";
        newsContainer.innerHTML = `
                <img class="topStoryImage" src=${mediaImage} alt="">
                <h3>${title}</h3>
                <p>${comment}</p>
            `;

        topStoryContainer.appendChild(newsContainer);
    });
    await getNews(({ MID }) => {
        const midContainer = document.getElementById('mid');
        console.log(MID)
        midContainer.innerHTML = `
        <h1>&nbsp;</h1>
    `;
        MID.forEach(({ mediaImage, comment, _id: id }) => {
            const newsContainer = document.createElement('div');
            newsContainer.className = "midNewsContainer";
            newsContainer.onclick = redirect(id);
            newsContainer.innerHTML = `
                <img class="midImage" src=${mediaImage} alt="">
                <p>${comment}</p>
            `;

            midContainer.appendChild(newsContainer);
        });
    })

}


main()