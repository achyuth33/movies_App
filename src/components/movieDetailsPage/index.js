import {Component} from 'react'
import {format} from 'date-fns-tz'
import Header from '../navBar'
import PopularMovies from '../popular'

import TopHome from '../movieDetailsTop'

import './index.css'

const apiKey = 'bdeb82385f84755468ab85488a72351c'

class MovieDetails extends Component {
  state = {
    movieData: [],
    genres: [],
    languages: [],
    ratingCount: 0,
    ratingAverage: 0,
    budget: 0,
    releaseDate: undefined,
    movies: [],
  }

  componentDidMount() {
    this.searchMovies()
    this.similarMovies(apiKey)
  }

  searchMovies = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const genre = []
      const lan = []
      data.genres.map(each => genre.push(each.name))
      data.spoken_languages.map(each => lan.push(each.english_name))
      this.setState({
        genres: genre,
        languages: lan,
        ratingCount: (data.vote_count !== undefined && data.vote_count: 0),
        ratingAverage: (data.vote_average !== undefined &&
          data.vote_average: 0),
        budget: (data.budget !== undefined && (data.budget * 64) / 10000000: 0),
        releaseDate: data.releaseDate,
      })
      const updatedData = {
        backdropPath: `${data.backdrop_path}`,
        originalTitle: `${data.original_title}` || `${data.original_name}`,
        posterPath: `${data.poster_path}`,
        overview: data.overview,
        id: `${data.id}`,
      }
      this.setState({movieData: updatedData})
    }
  }

  similarMovies = async key => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${key}&language=en-US&page=1`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(result => ({
        backdropPath: result.backdrop_path,
        originalTitle: result.original_title || result.original_name,
        posterPath: result.poster_path,
        id: result.id,
      }))
      this.setState({movies: updatedData})
    }
  }

  genresShow = (genres, heading) => {
    const value = genres
    return (
      <ul className="list">
        <h1 className="heading">{heading}</h1>
        {value.map(each => (
          <li>{each}</li>
        ))}
      </ul>
    )
  }

  render() {
    const {
      movieData,
      genres,
      languages,
      ratingCount,
      ratingAverage,
      budget,
      releaseDate,
      movies,
    } = this.state
    console.log(
      genres,
      languages,
      ratingCount,
      ratingAverage,
      budget,
      releaseDate,
    )
    const dateRel =
      releaseDate !== undefined
        ? format(Date.parse(releaseDate), 'do MMMM yyyy')
        : 0
    return (
      <div className="bg">
        <Header />
        <TopHome dataList={movieData} />
        <div className="data">
          {genres !== [] && this.genresShow(genres, 'Genres')}

          {languages !== [] && this.genresShow(languages, 'Audio')}
          <div>
            {ratingCount !== 0 && (
              <div>
                <h1 className="heading">Rating Count</h1>
                <p>{ratingCount}</p>
              </div>
            )}
            {(ratingAverage !== 0 || ratingAverage !== undefined) && (
              <div>
                <h1 className="heading">Rating Average</h1>
                <p>{ratingAverage}</p>
              </div>
            )}
          </div>
          <div>
            {budget !== 0 && (
              <div>
                <h1 className="heading">Budget</h1>
                <p>{budget} crores</p>
              </div>
            )}
            {dateRel !== 0 && (
              <div>
                <h1 className="heading">Release Date</h1>
                <p>{releaseDate}</p>
              </div>
            )}
          </div>
        </div>
        <div className="similar-cont">
          <PopularMovies dataList={movies} />
        </div>
      </div>
    )
  }
}

export default MovieDetails
