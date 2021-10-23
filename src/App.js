import './App.css';
import { useState, useEffect } from 'react'

function App() {

  let [movieinfo, setMovieinfo] = useState(null);
  let [title, setTitle] = useState('The Avengers');

  useEffect(() => {

    getMovieData();

  }, [])

  function readTitle(value) {
    setTitle(value);
  }
  function renderRating(item){
    return (
     <div className="row "> <p className="col-md-6">{item.Source}</p>
      <p className="col-md-6">{item.Value}</p></div>
    )
  }
  function getMovieData() {
    let url = `http://www.omdbapi.com/?t=${title}&apikey=d1f2b370`;

    fetch(url)
      .then((response) => response.json())
      .then((movie) => {
        console.log(movie)
        setMovieinfo(movie)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="App">

      <div className="container">
        <div className="padd">
          <h1>Movie Search</h1>
          <div className="input-group">
            <input type="text" placeholder="Enter Movie Name" onChange={(event) => { readTitle(event.target.value) }} className="search-field" />
            <button className="btn" onClick={getMovieData}>Get Movie</button>
          </div>

          {
            movieinfo?.Error===undefined?(
          
          <div className="movie">
            <div className="poster">
              <img src={movieinfo?.Poster} alt="Poster" className="img-poster" />
            </div>
            <div className="details">
              <div className="padd" style={{ marginLeft: '30px', marginTop: '0px' }}>
                <h1>{movieinfo?.Title}</h1>
                <p><strong>Genre</strong>: {movieinfo?.Genre}</p>
                <p><strong>Director</strong>: {movieinfo?.Director}</p>
                <p><strong>Plot</strong>: {movieinfo?.Plot}</p>
                <p><strong>Cast</strong>: {movieinfo?.Actors}</p>
                <p><strong>BoxOffice</strong>: {movieinfo?.BoxOffice}</p>
                <p><strong>Language</strong>: {movieinfo?.Language}</p>
                <p><strong>Releaed Date</strong>: {movieinfo?.Released}</p>
                <p><strong>Runtime</strong>: {movieinfo?.Runtime}</p>
                {/* {
                    movieinfo?.Ratings.map((rating,index) => {
                      {console.log(rating)}
                      return (<div>
                        <strong>{rating.Source}</strong>
                        <h3>{rating.Value}</h3>
                      </div>)
                    })
                  } */}
               
                {movieinfo?.Ratings.map(renderRating)}

                {/* <div className="ratings">

                  {
                    movieinfo?.Ratings.map((rating,index) => {
                      {console.log(rating)}
                      <div>
                        <strong>{rating.Source}</strong>
                        <h3>{rating.Value}</h3>
                      </div>
                    })
                  }

                  <div>
                    <strong>{movieinfo?.Ratings[0].Source}</strong>
                    <h3>{movieinfo?.Ratings[0].Value}</h3>  
                  </div>
                  <div style={{marginLeft:'30px'}}>
                    <strong>{movieinfo?.Ratings[1].Source}</strong>
                    <h3>{movieinfo?.Ratings[1].Value}</h3>
                  </div>
                </div>

                </div> */}
              </div>
            </div>
          </div>
            ):
            (
              <h1>Movie Not Found</h1>
            )
            }
        </div>
      </div>
    </div>
  );
}

export default App;
