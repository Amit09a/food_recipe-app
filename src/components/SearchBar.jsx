import { useState } from "react"

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("")
  const [cuisine, setCuisine] = useState("")
  const [diet, setDiet] = useState("")
  const [mealType, setMealType] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query.trim(), { cuisine, diet, mealType })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-2 items-center justify-center px-4 py-6"
    >
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full sm:w-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400 text-white"
      />

      <select 
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        className="p-3 border border-gray-300 rounded-md text-white hover:bg-green-400"
      >
        <option value="">All Cuisines</option>
        <option value="indian">Indian</option>
        <option value="italian">Italian</option>
        <option value="mexican">Mexican</option>
        <option value="chinese">Chinese</option>
      </select>

      <select
        value={diet}
        onChange={(e) => setDiet(e.target.value)}
        className="p-3 border border-gray-300 rounded-md text-white hover:bg-green-400"
      >
        <option value="">All Diets</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="keto">Keto</option>
        <option value="gluten free">Gluten Free</option>
      </select>

      <select
        value={mealType}
        onChange={(e) => setMealType(e.target.value)}
        className="p-3 border border-gray-300 rounded-md text-white hover:bg-green-400"
      >
        <option value="">All Meals</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="snack">Snack</option>
      </select>

      <button
        type="submit"
        className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar
