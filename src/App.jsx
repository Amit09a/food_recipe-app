import './App.css'
import Navbar from './components/Navbar.jsx'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Favourites from './pages/Favourites.jsx'
function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/Favorites" element={<Favourites />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/recipe/:id' element={<RecipeDetail/>}/>
      </Routes>
    </div>

  )
}

export default App
