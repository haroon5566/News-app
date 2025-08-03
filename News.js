import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const capitalizeFirstLetter = (str) => {


    return str[0].toUpperCase() + str.slice(1);
  }
  const updateNews = async () => {


    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=577783ca0b61406dafe198b3c4b810bb&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    props.setProgress(100);
  }
  useEffect( () => {
       document.title = `News Page - ${capitalizeFirstLetter(props.category)}`;
        updateNews();
  },[])

  //  const handlePreviousClick = async () => {
 
  //  setPage(page - 1 )
  //   updateNews();

  // }
  //  const hanldeNextClick = async () => {

  //   setPage(page + 1 )
  //   updateNews()
  // }
   const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=577783ca0b61406dafe198b3c4b810bb&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1 )
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    

  };

  
    return (
      <>
        <h1 className="text-center">News Page - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spiner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spiner />}
        > <div className="conatiner">
            <div className="row">
              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.hanldeNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  
}
News.defaultProps = {

  country: "us",
  pageSize: 5,
  category: "general",
}
News.propTypes = {

  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News;