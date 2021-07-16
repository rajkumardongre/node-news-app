const mainContainer = document.querySelector(".main");

async function generateNews(pageNo) {
  // let url = `https://newsapi.org/v2/top-headlines?page=${pageNo}&pageSize=100&country=in&apiKey=1038dc78bdbb49d29e2c9d8d7df13303`;
  let url = `http://localhost:8000/api`;
  const lst = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data.articles;
    });
  console.log(lst);
  lst.forEach((news) => {
    let html = `
      <div class="news-container" url=${news.url}>
      <img
      src=${news.urlToImage}
      class="news-img" url=${news.url}
      />
      <div class="news-info" url=${news.url}>
      <p class="title" url=${news.url}>
      ${news.title}
      </p>
      <p class="source" url=${news.url}>${news.source.name} . ${new Date(
      news.publishedAt
    ).getHours()}h</p>
        </div>
        </div>
        `;
    mainContainer.insertAdjacentHTML("afterbegin", html);
    const newsContainer = document.querySelector(".news-container");

    newsContainer.addEventListener("click", (e) => {
      // console.log(e.target.className);
      console.log(e.target.getAttribute("url"));
      window.open(e.target.getAttribute("url"));
    });
  });
}
const newsLst = generateNews(1);

console.log("hello world");
