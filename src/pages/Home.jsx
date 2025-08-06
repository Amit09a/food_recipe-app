import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import { useAuth } from "../contexts/AuthContext"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function Home() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef()
  const bottomRef = useRef()
  const [query, setQuery] = useState("")

  const { user } = useAuth() 

  const fetchRecipes = async (queryStr = query, pageNum = page) => {
    if (loading) return
    setLoading(true)
    setError(null)
// Replace the API key with yours
    const endpoint = `https://api.spoonacular.com/recipes/complexSearch?query=${queryStr}&number=12&offset=${(pageNum - 1) * 12}&addRecipeInformation=true&apiKey=${import.meta.env.VITE_API_KEY}`

    try {
      const res = await fetch(endpoint)
      const data = await res.json()

      const newRecipes = data.results || []

      if (newRecipes.length === 0) {
        setHasMore(false)
      } else {
        setRecipes((prev) => [...prev, ...newRecipes])
      }

    } catch (err) {
      setError("Failed to fetch recipes")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToFavorites = async (recipe) => {
  const user = auth.currentUser;
  if (!user) {
    alert("Please login to save favorites.");
    return;
  }

  try {
    const docRef = doc(db, "favorites", user.uid);
    const docSnap = await getDoc(docRef);

    let existingFavorites = [];
    if (docSnap.exists()) {
      existingFavorites = docSnap.data().recipes || [];
    }

    // Check if recipe already exists
    const alreadySaved = existingFavorites.some((r) => r.id === recipe.id);
    if (alreadySaved) {
      alert("Recipe is already in favorites.");
      return;
    }

    const updatedFavorites = [...existingFavorites, recipe];

    await setDoc(docRef, { recipes: updatedFavorites }, { merge: true });

    alert("Recipe added to favorites!");
  } catch (error) {
    console.error("Error saving favorite:", error);
    alert("Failed to add to favorites.");
  }
};

  // Reset for new search
  const handleSearch = (newQuery) => {
    setQuery(newQuery)
    setPage(1)
    setRecipes([])
    setHasMore(true)
  }

  useEffect(() => {
    fetchRecipes(query, 1)
  }, [query])

  // Infinite scroll observer
  useEffect(() => {
    if (loading || !hasMore) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1)
      }
    })

    if (bottomRef.current) {
      observer.current.observe(bottomRef.current)
    }

  }, [loading, hasMore])

  // Fetch next page
  useEffect(() => {
    if (page === 1) return
    fetchRecipes(query, page)
  }, [page])

  return (
    <div className="bg-zinc-700 min-h-screen">
  <SearchBar onSearch={handleSearch} />

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-10">
    {recipes.map((recipe) => (
      <div
        key={recipe.id}
        className="shadow-lg rounded-lg overflow-hidden transition duration-300 transform hover:scale-105 border border-transparent hover:border-green-500 hover:shadow-xl hover:bg-green-50 dark:hover:bg-green-900 bg-white dark:bg-gray-800  dark:text-white"
      >
        <Link to={`/recipe/${recipe.id}`}>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-white mb-2">
              {recipe.title}
            </h2>
            <p className="text-sm text-white line-clamp-3">
              {(recipe.summary || "").replace(/<[^>]+>/g, "")}
            </p>
          </div>
        </Link>

        {/* Favorite Button */}
        <button
          onClick={() => handleAddToFavorites(recipe)}
          className="absolute top-3 right-3 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-100 transition duration-200"
          title="Add to Favorites"
        >
          fav
        </button>
      </div>
    ))}
  </div>

  {/* Infinite Scroll Status */}
  <div ref={bottomRef} className="h-16 flex justify-center items-center">
    {loading ? (
      <span className="animate-pulse text-white">Loading more recipes...</span>
    ) : !hasMore ? (
      <span className="text-gray-400 italic">No more recipes to show.</span>
    ) : null}
  </div>
</div>

  )
}

export default Home
