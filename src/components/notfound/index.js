import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notFount-cont">
    <h1>Lost Your Way!</h1>
    <p>
      Sorry, we can’t find that page. You’ll find lots to explore on the home
      page
    </p>
    <Link to="/">
      <button type="button">Home</button>
    </Link>
    <p>
      Error Code <span>NSES-404</span>
    </p>
  </div>
)
export default NotFound
