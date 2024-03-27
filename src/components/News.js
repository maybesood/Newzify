import React, { useEffect, useState, useSyncExternalStore} from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News =(props)=> {

  
  const [articles,setArticles]=useState([]);
  const [loading,setLoading]=useState(false);
  const [page,setPage]=useState(1);
  const [totalResults,setTotalResults]=useState(0);

  const updateNews = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=340396d9fa3d45078914386c2200266b&page=${page+1}`;
    let response = await fetch(url);
    let data = await response.json();
    // Check if data.articles is an array
    const articles = Array.isArray(data.articles) ? data.articles : [];

    setArticles(articles)
    setLoading(false);

    setTotalResults(articles.totalResults);
  }


  useEffect(()=>{
    updateNews();
  },[])



  const fetchMoreData=async()=>{
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=340396d9fa3d45078914386c2200266b&page=${page+1}`;
    let response = await fetch(url);
    let data = await response.json();
    // Check if data.articles is an array
    const articles = Array.isArray(data.articles) ? data.articles : [];

    setArticles(articles.concat(articles));
    setLoading(false);

    setTotalResults(articles.totalResults);
    
  }

    return (
      <>
        <h1 class="text-center" style={{marginTop:'100px'}}>NewsMonkey - Top Headlines</h1>
        <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        
        >

          <div class="container">
        <div className="row">
          {articles.map((element, index) => (
            <div key={index} className="col-md-4">
              <Newsitem
                key={element.url}
                title={element.title}
                description={element.description}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
              />
            </div>
           
          ))}

        </div>

        </div>
        </InfiniteScroll>


        {/* <div className="d-flex justify-content-between">
        <button disabled={page<=1} type="button" class="btn btn-primary" onClick={handlePrevButton}>Previous</button>
        <button type="button" class="btn btn-primary" onClick={handleNextButton}>Next</button>
        </div> */}

      </>
      
    );
  
}

News.defaultProps={
  country:'in',
  category:'general',
}

News.propTypes={
  name:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}

  // const handleNextButton = async ()=>{
  //   setPage({page:page+1});
  //   updateNews();
  // }
  
  // const handlePrevButton= async ()=>{
  //   setPage({page:page-1});
  //   updateNews();
  // }

export default News
