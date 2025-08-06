import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_API_KEY}`
        )
        const data = await res.json()
        setRecipe(data)
      } catch (err) {
        setError("Failed to load recipe")
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id])

  if (loading) return <p className="text-center mt-10">Loading recipe...</p>
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>

  return (
    <div className="p-6 bg-zinc-400 w-full h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        <Link to="/" className="text-green-600 hover:underline">Home</Link> /{" "}
        <span>{recipe?.title}</span>
      </div>

      {/* Recipe Content */}
      <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full max-w-lg rounded shadow mb-4" />
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
      />
    </div>
  )
}

export default RecipeDetail
