import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class TopHome extends Component {
  render() {
    const {dataList} = this.props
    const {backdropPath, id, originalTitle, overview} = dataList
    return (
      <div
        key={id}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdropPath})`,
          backgroundSize: 'cover',
        }}
        className="container-top"
      >
        <div className="content-cont">
          <h1>{originalTitle}</h1>
          <p>{overview}</p>
          <Link key={id} to={`/specific/${id}`}>
            <button id={id} type="button" className="button-container">
              Play Now
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default TopHome
