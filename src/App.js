import NotFound from 'components/NotFound'
import { Redirect, Route, Switch } from 'react-router-dom'
import './App.scss'
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/todos' exact component={Home} />
        <Redirect from='/' to='/todos' exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App
