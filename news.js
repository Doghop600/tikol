const newsArr = []
const closeBtn = document.querySelector('#closeBtn')
const formAddNews = document.querySelector('#formAddNews')
const btnNews = document.querySelector('#news-btn')
btnNews.addEventListener('click', function () {
    formAddNews.style.display = 'flex'
})

function drawNews(data) {
    
}

formAddNews.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(formAddNews);
        const news = Object.fromEntries(formData);

        newsArr.push(news)
        console.log(news);
        console.log(newsArr)
})

closeBtn.addEventListener('click', function() {
    formAddNews.style.display = 'none'
})
