import './App.css';
function News(props){
return (

    <div className="news">
        <div className='news-img'>
            <img src={props.article.urlToImage} alt='https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg'/>
        </div>

        <h1>{props.article.title}</h1>
        <p>{props.article.description?.substring(0,100).concat("...")}<a href={props.article.url} target='_blank'>Read more</a></p>      
        <div className='source'>
            <p>Author : {props.article.author}</p>
            <p>{props.article.source.name}</p>
        </div>
    </div>
)

}


export default News;