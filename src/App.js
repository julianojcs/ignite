//Components and Pages
import Home from './pages/Home'
import Nav from './components/Nav'
//Styles
import GlobalStyles from './components/GlobalStyles'
//router
import { Route } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <GlobalStyles />
      <Nav />
      <Route path={['games/:id', '/']} component={Home} />
    </div>
  )
}

export default App;
