import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import PopularMovies from '../popular'
import Header from '../navBar'

const apiKey = 'bdeb82385f84755468ab85488a72351c'
class Popular extends Component {
  state = {
    movies: [],
    number: 1,
    lengthData: 1,
    statusPut: 'empty',
  }

  componentDidMount() {
    const {number} = this.state
    this.popularMovies(apiKey, number)
  }

  onIncrementCount = () => {
    const {number, lengthData} = this.state
    if (number >= 20) {
      this.setState({number: lengthData})
      this.popularMovies(apiKey, 20)
    } else {
      this.setState(prevState => ({number: prevState.number + 1}))
      this.popularMovies(apiKey, number + 1)
    }
  }

  onDecrementCount = () => {
    const {number} = this.state
    if (number <= 1) {
      this.setState({number: 1})
      this.popularMovies(apiKey, 1)
    } else {
      this.setState(prevState => ({number: prevState.number - 1}))
      this.popularMovies(apiKey, number - 1)
    }
  }

  popularMovies = async (key, number) => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${number}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.results.map(result => ({
        backdropPath: result.backdrop_path,
        originalTitle: result.original_title || result.original_name,
        posterPath: result.poster_path,
        id: result.id,
      }))
      this.setState({
        movies: updatedData,
        lengthData: data.total_pages,
        statusPut: 'success',
      })
    }
  }

  loaderCreate = () => (
    <div>
      <Header updateInput={this.updateInput} />
      <div className="loader-spin-cont">
        <Loader type="TailSpin" color="#E50014" height="100" width="100" />
      </div>
    </div>
  )

  dataReturn = (searchMoviesData, number, lengthData) => {
    const indicator1 = '<'
    const indicator2 = '>'
    return (
      <div className="container">
        <Header updateInput={this.updateInput} />
        <PopularMovies dataList={searchMoviesData} />
        <div className="buttons-cont">
          <button
            type="button"
            className="button-box"
            onClick={this.onDecrementCount}
          >
            {indicator1}
          </button>
          <p className="pages">{`${number} of ${lengthData}`}</p>
          <button
            type="button"
            className="button-box"
            onClick={this.onIncrementCount}
          >
            {indicator2}
          </button>
        </div>
        <div className="social-cont">
          <img
            alt="social-media"
            src="https://res.cloudinary.com/sahith/image/upload/v1625413241/Group_7395_mruqti.png"
          />
          <p className="pages">Contact Us</p>
        </div>
      </div>
    )
  }

  render() {
    const {movies, number, lengthData, statusPut} = this.state
    switch (statusPut) {
      case 'success': {
        return this.dataReturn(movies, number, lengthData)
      }
      default:
        return this.loaderCreate()
    }
  }
}

export default Popular
