import {Component} from 'react'

import './index.css'

class listDesign extends Component {
  imgContainer = dataList => dataList.map(each => <li>{each}</li>)

  render() {
    const {name, dataList} = this.props

    return (
      <div className="cont-pop">
        <h1>{name}</h1>
        <ul>{this.imgContainer(dataList)}</ul>
      </div>
    )
  }
}

export default listDesign
