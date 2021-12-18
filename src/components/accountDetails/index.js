import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../navBar'

const Account = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/signin')
  }
  return (
    <>
      <Header />
      <div className="account-cont">
        <h1>Account</h1>
        <hr />
        <div className="membership-cont">
          <p className="sub-head">Member Ship</p>
          <div className="details">
            <p>saisahith07@gmail.com</p>
            <p className="sub-head">password:*********</p>
          </div>
        </div>
        <hr />
        <div className="plan-cont">
          <p className="sub-head">Plan Details</p>
          <div className="premium-cont details">
            <p>Premium</p>
            <button type="button" className="ultra-button">
              Ultra HD
            </button>
          </div>
        </div>
        <hr />
        <div className="button-cont">
          <button type="button" className="log-out" onClick={onClickLogout}>
            Log Out
          </button>
        </div>
      </div>
    </>
  )
}
export default withRouter(Account)
