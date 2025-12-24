import './App.css'
import Signup from './Signup'
import {Routes,Route} from "react-router-dom"
import Login from './Login'
import ExpenseDashboard from './Expences'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/dashboard' element={<ExpenseDashboard />}></Route>

    </Routes>
   
  )
}

export default App
