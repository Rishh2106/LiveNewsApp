import { useEffect, useState } from 'react';
import './App.css';
import News from './News';
import DateSearch from './DateSearch';

function App() {
  let [articles, setArticles] = useState([]);
  let [category, setCategory] = useState("apple");
  let [fetchNews, setFetchNews] = useState(false); // State to control fetching
  let [date, setDate] = useState(""); // State for selected date
  let [darkMode, setDarkMode] = useState(false); // State for dark mode
  let [error, setError] = useState(""); // State for error message

  // Get yesterday's date in yyyy-mm-dd format
  let today = new Date();
  today.setDate(today.getDate() - 1);
  let yyyy = today.getFullYear();
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let dd = String(today.getDate()).padStart(2, '0');
  let defaultDate = `${yyyy}-${mm}-${dd}`;

  useEffect(() => {
    if (!fetchNews) return; // Prevents useEffect from running until button is clicked

    const fetchLatestNews = async () => {
      try {
        console.log(`Fetching news for category: ${category.toLowerCase()}`);

        let url = `https://newsapi.org/v2/everything?q=${category.toLowerCase()}&from=${date || defaultDate}&to=${date || defaultDate}&sortBy=publishedAt&apiKey=298d679f0b5e4f628ff0c269a52262f7`;

        let response = await fetch(url);

        let news = await response.json();
        console.log("API Response:", news);

        if (news.status === "ok" && news.articles?.length > 0) {
          console.log(`Fetched ${news.articles.length} articles`);
          setArticles(news.articles);
          setError("");
        } else if (news.status === "ok" && news.articles?.length === 0) {
          setError("No news found for the searched term.");
          setArticles([]);
        } else {
          setError("Invalid topic or category.");
          setArticles([]);
        }
      } catch (err) {
        console.error("Network Error:", err);
        setError("Network error, please try again later.");
      }
    };

    fetchLatestNews();
    setFetchNews(false); // Reset fetch trigger after fetching
  }, [fetchNews]); // useEffect runs only when fetchNews state changes

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header className='header'>
        <h1>SpoofyMedia</h1>
        <div className='searchingarea'>
          <input type='text' placeholder='Enter category...' onChange={(event) => {
            const newCategory = event.target.value.trim() || "apple";
            setCategory(newCategory);
          }}
          />
          <button onClick={() => setFetchNews(true)}>Fetch News</button>
        </div>
        <DateSearch setDate={setDate} />
        <button className='toggle-dark-mode' onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      </header>
      <section className='news-articles'>
        {error && <h3>{error}</h3>}
        {
          articles.length > 0 ?
            articles.map((article, index) => <News key={index} article={article} />) :
            !error && <h3>No news found for the searched term.</h3>
        }
      </section>
    </div>
  );
}

export default App;
