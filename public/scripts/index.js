async function getNews() {
    return fetch("/news")
        .then(data => data.json())
        .catch(err => {
            alert("Something went wrong");
            console.error(err);
            return { news: {} };
        });
}

function redirect(id) {
    return function () {
        window.location.href = `search.html?id=${id}`;
    }
}

function renderElement(news) {
    const { TOP_STORY, MOST_POPULAR, MID } = news;

    const topStoryContainer = document.getElementById('top-story');
    topStoryContainer.innerHTML = `
        <h1>Top Stories</h1>
    `;
    TOP_STORY.forEach(({ title, mediaImage, comment, _id: id }) => {
        const newsContainer = document.createElement('div');
        newsContainer.className = "topNewsContainer";
        newsContainer.onclick = redirect(id);
        newsContainer.innerHTML = `
            <img class="topStoryImage" src=${mediaImage} alt="">
            <h3>${title}</h3>
            <p>${comment}</p>
        `;

        topStoryContainer.appendChild(newsContainer);
    });

    const mostPopularStoryContainer = document.getElementById('most-popular');
    mostPopularStoryContainer.innerHTML = `
        <h1>Most Popular</h1>
    `;
    MOST_POPULAR.forEach(({ title, mediaImage, _id: id }) => {
        const newsContainer = document.createElement('div');
        newsContainer.className = "mostPopularNewsContainer";
        newsContainer.onclick = redirect(id);

        newsContainer.innerHTML = `
            <img class="mostPopularImage" src=${mediaImage} alt="">
            <h3>${title}</h3>
        `;

        mostPopularStoryContainer.appendChild(newsContainer);
    });

    const midContainer = document.getElementById('mid');
    console.log(MID)
    midContainer.innerHTML = `
    <h2>&nbsp;</h2>
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
}

async function main() {
    const { news } = await getNews();
    renderElement(news);
}

main()