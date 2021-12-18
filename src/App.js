import {BrowserRouter, Route, Switch} from 'react-router-dom'

import SignInForm from './components/signInFrom'

import HomePage from './components/homePage'

import Popular from './components/popularPage'

import Account from './components/accountDetails'

import SearchBar from './components/SearchBar'

import MovieDetails from './components/movieDetailsPage'

import ProtectedRoute from './components/protectedRoute'

import NotFound from './components/notfound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/signin" component={SignInForm} />
      <ProtectedRoute exact path="/" component={HomePage} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute exact path="/account-details" component={Account} />
      <ProtectedRoute exact path="/search" component={SearchBar} />
      <ProtectedRoute exact path="/specific/:id" component={MovieDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
