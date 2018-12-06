"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  "use strict";

  function Filters(props) {
    function updateCategory(evt) {
      props.updateCategoryState(evt.target.value);
    }

    return React.createElement(
      "form",
      { action: "", id: "directory-filters", className: "filters-class" },
      React.createElement(
        "div",
        null,
        React.createElement(
          "label",
          { htmlFor: "select-category" },
          "Sort by: "
        ),
        React.createElement(
          "select",
          { name: "select_category", id: "select-category", value: props.currentCategory, onChange: updateCategory },
          React.createElement(
            "option",
            { value: "" },
            "- Category -"
          ),
          React.createElement(
            "option",
            { value: "now-playing", key: "now-playing" },
            "Now Playing"
          ),
          React.createElement(
            "option",
            { value: "popular", key: "popular" },
            "Popular"
          ),
          React.createElement(
            "option",
            { value: "top-rated", key: "top-rated" },
            "Top Rated"
          )
        )
      )
    );
  }

  var List = function (_React$Component) {
    _inherits(List, _React$Component);

    function List(props) {
      _classCallCheck(this, List);

      var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

      _this.state = {
        listItems: '',
        currentCategory: ''
      };

      _this.updateCategoryState = _this.updateCategoryState.bind(_this);

      _this.sortByTopRated = _this.sortByTopRated.bind(_this);
      _this.sortByPopularity = _this.sortByPopularity.bind(_this);
      _this.sortByNowPlaying = _this.sortByNowPlaying.bind(_this);

      $(function () {
        $(".collapsible-table tr.external").on("click", function () {
          $(this).toggleClass("expand").next(".internal").toggleClass("expand");
        });
      });
      _this.getList();
      return _this;
    }

    _createClass(List, [{
      key: "updateCategoryState",
      value: function updateCategoryState(value) {
        this.setState({ currentCategory: value }, function () {
          if (this.state.currentCategory == "top-rated") {
            this.sortByTopRated();
          } else if (this.state.currentCategory == "popular") {
            this.sortByPopularity();
          } else if (this.state.currentCategory == "now-playing") {
            this.sortByNowPlaying();
          }
        });
      }
    }, {
      key: "getList",
      value: function getList() {
        var rootURL = 'https://api.themoviedb.org/3/discover/movie?api_key=';
        var key = '2403c0693916992487dd5abda2003c5f';
        var lang = '&language=en-US';
        var excludeAdult = '&include_adult=false';
        var excludeVideo = '&include_video=false';
        var page = '&page=1';
        var primaryYear = '&primary_release_year=2018';

        var requestURL = "".concat(rootURL, key, lang, excludeAdult, excludeVideo, page, primaryYear);
        fetch(requestURL).then(function (data) {
          return data.json();
        }).then(function (dataset) {
          var movies = dataset.results;
          var movieList = [];
          movies.forEach(function (movieElement) {
            var movieListItem = React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "tr",
                { className: "external" },
                React.createElement(
                  "td",
                  null,
                  movieElement.title
                ),
                React.createElement(
                  "td",
                  null,
                  movieElement.release_date
                ),
                React.createElement(
                  "td",
                  null,
                  movieElement.vote_average
                ),
                React.createElement(
                  "td",
                  null,
                  movieElement.popularity
                )
              ),
              React.createElement(
                "tr",
                { className: "internal" },
                React.createElement(
                  "td",
                  null,
                  React.createElement("img", { src: "https://image.tmdb.org/t/p/w92" + movieElement.poster_path, alt: "movie poster" })
                ),
                React.createElement(
                  "td",
                  { colSpan: 3 },
                  movieElement.overview
                )
              )
            );
            movieList.push(movieListItem);
          });

          this.setState({ listItems: movieList });
        }.bind(this));
      }

      // sort movie list by top rated

    }, {
      key: "sortByTopRated",
      value: function sortByTopRated() {
        var rootURL = 'https://api.themoviedb.org/3/discover/movie?api_key=';
        var key = '2403c0693916992487dd5abda2003c5f';
        var lang = '&language=en-US';
        var sortBy = '&sort_by=vote_average.desc';
        var excludeAdult = '&include_adult=false';
        var excludeVideo = '&include_video=false';
        var page = '&page=1';
        var primaryYear = '&primary_release_year=2018';

        var requestURL = "".concat(rootURL, key, lang, sortBy, excludeAdult, excludeVideo, page, primaryYear);
        fetch(requestURL).then(function (data) {
          return data.json();
        }).then(function (dataset) {
          var topRatedMovies = dataset.results;

          var movieListTopRated = [];
          topRatedMovies.forEach(function (movieElement) {
            var movieListItem = React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "tr",
                { className: "external" },
                React.createElement(
                  "td",
                  null,
                  movieElement.title
                ),
                React.createElement(
                  "td",
                  null,
                  movieElement.release_date
                ),
                React.createElement(
                  "td",
                  null,
                  movieElement.vote_average
                ),
                React.createElement(
                  "td",
                  null,
                  movieElement.popularity
                )
              ),
              React.createElement(
                "tr",
                { className: "internal" },
                React.createElement(
                  "td",
                  null,
                  React.createElement("img", { src: "https://image.tmdb.org/t/p/w92" + movieElement.poster_path, alt: "movie poster" })
                ),
                React.createElement(
                  "td",
                  { colSpan: 3 },
                  movieElement.overview
                )
              )
            );
            movieListTopRated.push(movieListItem);
          });

          this.setState({ listItems: movieListTopRated });
        }.bind(this));
      }

      // sort movie list by popularity

    }, {
      key: "sortByPopularity",
      value: function sortByPopularity() {
        var rootURL = 'https://api.themoviedb.org/3/discover/movie?api_key=';
        var key = '2403c0693916992487dd5abda2003c5f';
        var lang = '&language=en-US';
        var sortBy = '&sort_by=popularity.desc';
        var excludeAdult = '&include_adult=false';
        var excludeVideo = '&include_video=false';
        var page = '&page=1';
        var primaryYear = '&primary_release_year=2018';

        var requestURL = "".concat(rootURL, key, lang, sortBy, excludeAdult, excludeVideo, page, primaryYear);
        fetch(requestURL).then(function (data) {
          return data.json();
        }).then(function (dataset) {
          var popularMovies = dataset.results;

          var movieListPopular = [];
          popularMovies.forEach(function (movieElement) {
            var movieListItem = React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "tr",
                { className: "external" },
                React.createElement(
                  "td",
                  null,
                  movieElement.title
                ),
                React.createElement(
                  "td",
                  null,
                  movieElement.release_date
                ),
                React.createElement(
                  "td",
                  null,
                  movieElement.vote_average
                ),
                React.createElement(
                  "td",
                  null,
                  movieElement.popularity
                )
              ),
              React.createElement(
                "tr",
                { className: "internal" },
                React.createElement(
                  "td",
                  null,
                  React.createElement("img", { src: "https://image.tmdb.org/t/p/w92" + movieElement.poster_path, alt: "movie poster" })
                ),
                React.createElement(
                  "td",
                  { colSpan: 3 },
                  movieElement.overview
                )
              )
            );
            movieListPopular.push(movieListItem);
          });

          this.setState({ listItems: movieListPopular });
        }.bind(this));
      }

      // sort movie list by now playing

    }, {
      key: "sortByNowPlaying",
      value: function sortByNowPlaying() {
        var rootURL = 'https://api.themoviedb.org/3/discover/movie?api_key=';
        var key = '2403c0693916992487dd5abda2003c5f';
        var lang = '&language=en-US';
        var region = '&region=US';
        var excludeAdult = '&include_adult=false';
        var excludeVideo = '&include_video=false';
        var page = '&page=1';
        var primaryReleaseDateMin = '&primary_release_date.gte=2018-11-07';
        var primaryReleaseDateMax = '&primary_release_date.lte=2018-12-05';
        var withReleaseType = '&with_release_type=3';

        var requestURL = "".concat(rootURL, key, lang, region, excludeAdult, excludeVideo, page, primaryReleaseDateMin, primaryReleaseDateMax, withReleaseType);
        fetch(requestURL).then(function (data) {
          return data.json();
        }).then(function (dataset) {
          var nowPlayingMovies = dataset.results;

          var movieListNowPlaying = [];
          nowPlayingMovies.forEach(function (movieElement) {
            var movieListItem = React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "tr",
                { className: "external" },
                React.createElement(
                  "td",
                  null,
                  movieElement.title
                ),
                React.createElement(
                  "td",
                  null,
                  movieElement.release_date
                ),
                React.createElement(
                  "td",
                  null,
                  movieElement.vote_average
                ),
                React.createElement(
                  "td",
                  null,
                  movieElement.popularity
                )
              ),
              React.createElement(
                "tr",
                { className: "internal" },
                React.createElement(
                  "td",
                  null,
                  React.createElement("img", { src: "https://image.tmdb.org/t/p/w92" + movieElement.poster_path, alt: "movie poster" })
                ),
                React.createElement(
                  "td",
                  { colSpan: 3 },
                  movieElement.overview
                )
              )
            );
            movieListNowPlaying.push(movieListItem);
          });

          this.setState({ listItems: movieListNowPlaying });
        }.bind(this));
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          { className: "movie-list" },
          React.createElement(
            "div",
            { className: "select-class" },
            React.createElement(
              "p",
              { className: "instructions" },
              "Sort movies by Now Playing, Popular, and Top Rated using the menu to select a category."
            ),
            React.createElement(Filters, { currentCategory: this.state.currentCategory, updateCategoryState: this.updateCategoryState })
          ),
          React.createElement(
            "table",
            { className: "collapsible-table" },
            React.createElement(
              "thead",
              null,
              React.createElement(
                "tr",
                null,
                React.createElement(
                  "th",
                  { scope: "col" },
                  "Title"
                ),
                React.createElement(
                  "th",
                  { scope: "col" },
                  "Release Date"
                ),
                React.createElement(
                  "th",
                  { scope: "col" },
                  "Vote Average"
                ),
                React.createElement(
                  "th",
                  { scope: "col" },
                  "Popularity"
                )
              )
            ),
            React.createElement(
              "tbody",
              null,
              this.state.listItems
            )
          )
        );
      }
    }]);

    return List;
  }(React.Component);

  ReactDOM.render(React.createElement(List, null), document.getElementById('movie-root'));
})();
//# sourceMappingURL=directory-dist.js.map