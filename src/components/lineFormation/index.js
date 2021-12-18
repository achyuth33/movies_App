import {Component} from 'react'
import Slider from 'react-slick'

import {Link} from 'react-router-dom'

import './index.css'

class Responsive extends Component {
  imgContainer = dataList => {
    const {clickImage} = this.props
    return dataList.map(each => (
      <Link key={each.id} to={`/specific/${each.id}`}>
        <div key={each.id} className="cont-size">
          <img
            className="picture"
            id={each.id}
            src={`https://image.tmdb.org/t/p/original/${each.posterPath}`}
            alt={each.originalTitle}
            onClick={v => clickImage(v.target.id)}
          />
        </div>
      </Link>
    ))
  }

  render() {
    const {dataList, heading} = this.props

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 3,
    }
    return (
      <div className="container">
        <h2 className="head"> {heading} </h2>
        <div style={{width: '90%'}}>
          <Slider {...settings}>{this.imgContainer(dataList)}</Slider>
        </div>
      </div>
    )
  }
}

export default Responsive
