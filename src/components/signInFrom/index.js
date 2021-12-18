import {Component} from 'react'
import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'

import './index.css'

const apiKey = 'bdeb82385f84755468ab85488a72351c'

class SignInForm extends Component {
  state = {
    username: '',
    password: '',
    requestToken: '',
    showSubmitError: false,
    errorMsg: '',
  }

  componentDidMount() {
    this.requestToken(apiKey)
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  setRequest = token => {
    this.setState({requestToken: token})
  }

  requestToken = async key => {
    const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${key}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    this.setRequest(data.request_token)
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password, requestToken} = this.state
    const userDetails = {
      username,
      password,
      request_token: requestToken,
    }
    console.log(userDetails)
    const url = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-type': 'application/json',
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    console.log(data.request_token)
    if (response.ok === true) {
      this.onSubmitSuccess(data.request_token)
    } else {
      this.onSubmitFailure('Please enter a valid Email and  Password')
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)

    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <h1 className="signIn-head">Sign in</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Sign In
          </button>
          {showSubmitError && <p className="error-message">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default SignInForm
