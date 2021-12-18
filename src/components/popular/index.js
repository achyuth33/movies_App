import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

import './index.css'

class PopularMovies extends Component {
  redirectPage = id => <Redirect to={`/specific/${id}`} />

  imgContainer = dataList =>
    dataList.map(each => (
      <Link key={each.id} to={`/specific/${each.id}`}>
        <div key={each.id} className="cont-size">
          <img
            className="picture"
            id={each.id}
            src={`https://image.tmdb.org/t/p/original/${each.posterPath}`}
            alt={each.originalTitle}
            onClick={this.redirectPage(each.id)}
          />
        </div>
      </Link>
    ))

  render() {
    const {dataList} = this.props

    return <div className="cont-pop">{this.imgContainer(dataList)}</div>
  }
}

export default PopularMovies
