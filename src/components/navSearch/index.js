import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'

class Header extends Component {
  state = {
    search: true,
    searchValue: '',
  }

  onSearch = () => {
    this.setState(pre => ({search: !pre.search}))
  }

  onSearchInput = event => {
    this.setState({searchValue: event.target.value}, this.updatingInput)
    this.updatingInput()
  }

  updatingInput = () => {
    const {searchValue} = this.state
    const {updateInput} = this.props
    updateInput(searchValue)
  }

  render() {
    const {search} = this.state
    console.log(search)

    return (
      <nav className="nav-header">
        <div className="container-pages">
          <div className="images-movies">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dbzwiigl5/image/upload/v1625823588/Group_7399_zjhuem.png"
                alt="MOVIES"
              />
            </Link>
          </div>
          <ul className="pages-list">
            <li className="pages-cont">
              <Link to="/" className="pages">
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/popular" className="pages">
                Popular
              </Link>
            </li>
          </ul>
        </div>

        <div className="sign-button-cont">
          {search && (
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={this.onSearchInput}
            />
          )}
          <Link to="/search">
            <BsSearch className="search-butn" onClick={this.onSearch} />
          </Link>
          <button type="button" className="button-img">
            <Link to="/account-details">
              <img
                className="button-img"
                src="https://res.cloudinary.com/dbzwiigl5/image/upload/v1626086256/pngarea.com_mexico-png-avatar-5646242_iwkm3x.png"
                alt="signOut"
              />
            </Link>
          </button>
        </div>
      </nav>
    )
  }
}

export default Header
