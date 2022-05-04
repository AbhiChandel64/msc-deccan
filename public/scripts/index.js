async function getNews() {
    return fetch("/news")
        .then(data => data.json())
        .catch(err => {
            alert("Something went wrong");
            console.error(err);
            return { news: {} };
        });
}

function redirect(url) {
    window.location.href = url;
}

function renderElement(elementId, news) {
    const container = document.getElementById(elementId);
    Object.keys(news).map(category => {
        const allNews = news[category];
        const box = document.createElement('div');

        const heading = document.createElement('h1');
        heading.textContent = category;

        const newsContainer = document.createElement('div');
        allNews.map(({ title, mediaImage, url }) => {
            const newsC = document.createElement('div');
            newsC.className = "news";
            newsC.innerHTML = `
                <img class="topStoryImage" src=${mediaImage} alt="">
                <h3>${title}</h3>
            `;
            newsC.onclick = () => redirect(url);

            newsContainer.appendChild(newsC);
        });


        box.appendChild(heading);
        box.appendChild(newsContainer);
        container.appendChild(box);

    });
}

async function main() {
    const { news } = await getNews();
    renderElement('container', news);
}

main()