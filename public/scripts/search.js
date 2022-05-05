async function getNews(id) {
    return fetch(`/news/${id}`)
        .then(data => data.json())
        .catch(err => {
            alert("Something went wrong");
            console.error(err);
            return { news: {} };
        });
}

function main() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const newsId = urlSearchParams.get('id');
    getNews(newsId).then(data => data.news).then(({ title, comment, mediaImage }) => {
        const newsContainer = document.getElementById('container');
        newsContainer.className = "topNewsContainer";
        newsContainer.innerHTML = `
                <img class="topStoryImage" src=${mediaImage} alt="">
                <h3>${title}</h3>
                <p>${comment}</p>
            `;

        topStoryContainer.appendChild(newsContainer);
    });
}

main()