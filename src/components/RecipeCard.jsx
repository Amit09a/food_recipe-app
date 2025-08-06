import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const RecipeCard = ({ recipe }) => {
  const { user } = useAuth();
  const [isFavourite, setIsFavourite] = useState(false);

  const favRef =
    user && doc(db, "users", user.uid, "favourites", recipe.id.toString());

  // Check if recipe is already favourited
  useEffect(() => {
    const checkFavourite = async () => {
      if (user && favRef) {
        const favSnap = await getDoc(favRef);
        setIsFavourite(favSnap.exists());
      }
    };
    checkFavourite();
  }, [user, recipe.id]);

  // Toggle favourite
  const handleFavourite = async () => {
    if (!user) {
      alert("Please log in to save favourites.");
      return;
    }

    if (isFavourite) {
      await deleteDoc(favRef);
      setIsFavourite(false);
    } else {
      await setDoc(favRef, {
        ...recipe,
        favouritedAt: Date.now(),
      });
      setIsFavourite(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{recipe.title}</h3>
          <button onClick={handleFavourite}>
            {isFavourite ? "❤️" : "🤍"}
          </button>
        </div>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {recipe.summary || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
