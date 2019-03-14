(function() {
  "use strict";

  function Filters(props) {
    function updateCategory(evt) {
      props.updateCategoryState(evt.target.value);
    }

    return (
      <form action="" id="directory-filters" className="filters-class">
        <div>
          <label htmlFor="select-category">Sort by: </label>
          <select name="select_category" id="select-category" value={props.currentCategory} onChange={updateCategory}>
            <option value="">- Category -</option>
            <option value="now-playing" key="now-playing">Now Playing</option>
            <option value="popular" key="popular">Popular</option>
            <option value="top-rated" key="top-rated">Top Rated</option>
          </select>
        </div>
      </form>
    );
  }

  class List extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        listItems: '',
        currentCategory: ''
      };

      this.updateCategoryState = this.updateCategoryState.bind(this);

      this.sortByTopRated = this.sortByTopRated.bind(this);
      this.sortByPopularity = this.sortByPopularity.bind(this);
      this.sortByNowPlaying = this.sortByNowPlaying.bind(this);


      this.getList();


    }

    updateCategoryState(value) {
      this.setState(
        {currentCategory: value}, function() {
          if (this.state.currentCategory == "top-rated") {
            this.sortByTopRated();
          } else if (this.state.currentCategory == "popular") {
            this.sortByPopularity();
          } else if (this.state.currentCategory == "now-playing") {
            this.sortByNowPlaying();
          }
        }
      );
    }



    getList() {
      var rootURL = 'https://api.themoviedb.org/3/discover/movie?api_key=';
      var key = '2403c0693916992487dd5abda2003c5f';
      var lang = '&language=en-US';
      var excludeAdult = '&include_adult=false';
      var excludeVideo = '&include_video=false';
      var page = '&page=1';
      var date = moment().format('YYYY');
      var primaryYear = '&primary_release_year=' + date;

        var requestURL = "".concat(rootURL, key, lang, excludeAdult, excludeVideo, page, primaryYear);
        fetch(requestURL)
        .then(function(data) {
          return data.json();
        })
        .then(function(dataset) {
          var movies = dataset.results;
          var movieList = [];
          movies.forEach(function(movieElement) {
            var movieListItem = (
              <React.Fragment>
                <tr className="external">
                  <td>
                    {movieElement.title}
                  </td>
                  <td>
                    {movieElement.release_date}
                  </td>
                  <td>
                    {movieElement.vote_average}
                  </td>
                  <td>
                    {movieElement.popularity}
                  </td>
                </tr>
                <tr className="internal">
                  <td>
                    <img src={"https://image.tmdb.org/t/p/w92" + movieElement.poster_path} alt="movie poster" />
                  </td>
                  <td colSpan={3}>
                    {movieElement.overview}
                  </td>
                </tr>

              </React.Fragment>
            )
            movieList.push(movieListItem);
          })

          this.setState({listItems: movieList});

          {console.log("Internal row was rendered")
            $(function() {
              $("tr.external").on("click", function() {
                $(this).toggleClass("expand").next(".internal").toggleClass("expand");
              });
            });
          }
        }.bind(this))
    }

    // sort movie list by top rated
    sortByTopRated() {
      var rootURL = 'https://api.themoviedb.org/3/discover/movie?api_key=';
      var key = '2403c0693916992487dd5abda2003c5f';
      var lang = '&language=en-US';
      var sortBy = '&sort_by=vote_average.desc';
      var excludeAdult = '&include_adult=false';
      var excludeVideo = '&include_video=false';
      var page = '&page=1';
      var date = moment().format('YYYY');
      var primaryYear = '&primary_release_year=' + date;

      var requestURL = "".concat(rootURL, key, lang, sortBy, excludeAdult, excludeVideo, page, primaryYear);
      fetch(requestURL)
      .then(function(data) {
          return data.json();
      })
      .then(function(dataset) {
      var topRatedMovies = dataset.results;

      var movieListTopRated = [];
      topRatedMovies.forEach(function(movieElement) {
        var movieListItem = (
            <React.Fragment>
              <tr className="external">
                <td>
                  {movieElement.title}
                </td>
                <td>
                  {movieElement.release_date}
                </td>
                <td>
                  {movieElement.vote_average}
                </td>
                <td>
                  {movieElement.popularity}
                </td>
              </tr>
              <tr className="internal">
                <td>
                  <img src={"https://image.tmdb.org/t/p/w92" + movieElement.poster_path} alt="movie poster" />
                </td>
                <td colSpan={3}>
                  {movieElement.overview}
                </td>
              </tr>
            </React.Fragment>
        )
        movieListTopRated.push(movieListItem);
      })

      this.setState({listItems: movieListTopRated});

    }.bind(this))
  }

  // sort movie list by popularity
  sortByPopularity() {
    var rootURL = 'https://api.themoviedb.org/3/discover/movie?api_key=';
    var key = '2403c0693916992487dd5abda2003c5f';
    var lang = '&language=en-US';
    var sortBy = '&sort_by=popularity.desc';
    var excludeAdult = '&include_adult=false';
    var excludeVideo = '&include_video=false';
    var page = '&page=1';
    var date = moment().format('YYYY');
    var primaryYear = '&primary_release_year=' + date;

    var requestURL = "".concat(rootURL, key, lang, sortBy, excludeAdult, excludeVideo, page, primaryYear);
    fetch(requestURL)
    .then(function(data) {
        return data.json();
    })
    .then(function(dataset) {
    var popularMovies = dataset.results;

    var movieListPopular = [];
    popularMovies.forEach(function(movieElement) {
      var movieListItem = (
          <React.Fragment>
            <tr className="external">
              <td>
                {movieElement.title}
              </td>
              <td>
                {movieElement.release_date}
              </td>
              <td>
                {movieElement.vote_average}
              </td>
              <td>
                {movieElement.popularity}
              </td>
            </tr>
            <tr className="internal">
              <td>
                <img src={"https://image.tmdb.org/t/p/w92" + movieElement.poster_path} alt="movie poster" />
              </td>
              <td colSpan={3}>
                {movieElement.overview}
              </td>
            </tr>
          </React.Fragment>
      )
      movieListPopular.push(movieListItem);
    })

    this.setState({listItems: movieListPopular});

  }.bind(this))
}

  // sort movie list by now playing
  sortByNowPlaying() {
    var rootURL = 'https://api.themoviedb.org/3/discover/movie?api_key=';
    var key = '2403c0693916992487dd5abda2003c5f';
    var lang = '&language=en-US';
    var region = '&region=US';
    var excludeAdult = '&include_adult=false';
    var excludeVideo = '&include_video=false';
    var page = '&page=1';
    var date = moment();
    var maxDate = date.format('YYYY-MM-DD');
    var minDate = date.subtract(28, 'days').format('YYYY-MM-DD');
    var primaryReleaseDateMin = '&primary_release_date.gte=' + minDate;
    var primaryReleaseDateMax = '&primary_release_date.lte=' + maxDate;
    var withReleaseType = '&with_release_type=3';

    var requestURL = "".concat(rootURL, key, lang, region, excludeAdult, excludeVideo, page, primaryReleaseDateMin, primaryReleaseDateMax, withReleaseType);
    fetch(requestURL)
    .then(function(data) {
        return data.json();
    })
    .then(function(dataset) {
    var nowPlayingMovies = dataset.results;

    var movieListNowPlaying = [];
    nowPlayingMovies.forEach(function(movieElement) {
      var movieListItem = (
          <React.Fragment>
            <tr className="external">
              <td>
                {movieElement.title}
              </td>
              <td>
                {movieElement.release_date}
              </td>
              <td>
                {movieElement.vote_average}
              </td>
              <td>
                {movieElement.popularity}
              </td>
            </tr>
            <tr className="internal">
              <td>
                <img src={"https://image.tmdb.org/t/p/w92" + movieElement.poster_path} alt="movie poster" />
              </td>
              <td colSpan={3}>
                {movieElement.overview}
              </td>
            </tr>
          </React.Fragment>
      )
      movieListNowPlaying.push(movieListItem);
    })

    this.setState({listItems: movieListNowPlaying});

  }.bind(this))
}



    render() {
      return (
        <div className="movie-list">
          <div className="select-class">
            <p className="instructions">Sort movies by Now Playing, Popular, and Top Rated using the menu to select a category.</p>

            <Filters currentCategory={this.state.currentCategory} updateCategoryState={this.updateCategoryState} />
          </div>

          <table className="collapsible-table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Release Date</th>
                <th scope="col">Vote Average</th>
                <th scope="col">Popularity</th>
              </tr>
            </thead>
            <tbody>{this.state.listItems}</tbody>
          </table>
        </div>
      );
    }
  }

  ReactDOM.render(<List />, document.getElementById('movie-root'));


})();
