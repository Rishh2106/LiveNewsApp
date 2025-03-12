import { useEffect, useState } from 'react';
import './App.css';
import News from './News';

function App() {
  let [articles, setArticles] = useState([]);
  let [category, setCategory] = useState("apple");
  let [fetchNews, setFetchNews] = useState(false); // State to control fetching

  // Get yesterday's date in yyyy-mm-dd format
  let today = new Date();
  today.setDate(today.getDate() - 1);
  let yyyy = today.getFullYear();
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let dd = String(today.getDate()).padStart(2, '0');

  useEffect(() => {
    if (!fetchNews) return; // Prevents useEffect from running until button is clicked

    const fetchLatestNews = async () => {
      try {
        console.log(`Fetching news for category: ${category.toLowerCase()}`);

        let response = await fetch(
          `https://newsapi.org/v2/everything?q=${category.toLowerCase()}&from=${yyyy}-${mm}-${dd}&sortBy=publishedAt&apiKey=298d679f0b5e4f628ff0c269a52262f7`
        );

        let news = await response.json();
        console.log("API Response:", news);

        if (news.status === "ok" && news.articles?.length > 0) {
          console.log(`Fetched ${news.articles.length} articles`);
          setArticles(news.articles);
        } else {
          console.warn("No articles found.");
          setArticles([]);
        }
      } catch (err) {
        console.error("Network Error:", err);
      }
    };

    fetchLatestNews();
    setFetchNews(false); // Reset fetch trigger after fetching
  }, [fetchNews]); // useEffect runs only when fetchNews state changes

  return (
    <div className="App">
      <header className='header'>
        <h1>SpoofyMedia</h1>
        <div className='searchingarea'>
        <input type='text' placeholder='Search news...' onChange={(event) => {
            const newCategory = event.target.value.trim() || "apple";
            setCategory(newCategory);
          }}
        />
        <button onClick={() => setFetchNews(true)}>Fetch News</button>
        </div>
      </header>
      <section className='news-articles'>
        {
          articles.length > 0 ? 
          articles.map((article, index) => <News key={index} article={article} />) :
          <h3>No news found for the searched term.</h3>
        }
      </section>
    </div>
  );
}

export default App;
