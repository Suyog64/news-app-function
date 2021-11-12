import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);
    

    
    const capitalizeFirstLetter=(string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    

    const updateNews=async()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json();
        props.setProgress(70);
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `NewsJedi | ${capitalizeFirstLetter(props.category)}`;
        updateNews();
        // eslint-disable-next-line
    }, [])
    

    // const handlePrevClick = async()=> {
    //     setPage(page-1);
    //     updateNews();
    // }
    // const handleNextClick = async()=> {
    //     console.log("Next");
    //     if(page+1 > Math.ceil(articles.totalResults/props.pageSize)){

    //     }
    //      else{
    //         setPage(page+1);
    //         updateNews();
    //     }
    // }

    const fetchMoreData = async() => {
        
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=93c519550f0f4fa5bd5185a7105f2faa&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(articles.concat(parseData.articles));
        setTotalResults(parseData.totalResults);
        
      };

    
        return (
            <>
                <h2 className="text-center" style={{margin : '30px 0px',marginTop:'90px'}}>NewsJedi- Top {capitalizeFirstLetter(props.category)} Headlines</h2>
                {loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                    >
                <div className="container">
                <div className="row mx-3">
                
                {articles.map((element)=>(
                        <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title:""} 
                                description={element.description?element.description.slice(0,88):""} 
                                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                                source={element.source.name}/>
                        </div>
                    ))} 
                </div>
                </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Prev</button>
                    <button disabled={page+1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}

            </>
        )
    
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general' 
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
