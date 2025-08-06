import { Link } from 'react-router-dom';

function navbar() {
  return (
        <nav className="bg-zinc-900 shadow-md px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-500">
          🍽️ RecipeBook
        </Link>

        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-green-500">
            Home
          </Link>
          <Link to="/favorites" className="text-white hover:text-green-500">
            Favorites
          </Link>
          <Link to="/login" className="text-white hover:text-green-500">
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default navbar