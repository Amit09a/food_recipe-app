// src/pages/Favorites.jsx

import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const favRef = doc(db, "favorites", user.uid);
      const docSnap = await getDoc(favRef);

      if (docSnap.exists()) {
        setFavorites(docSnap.data().recipes || []);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="border rounded p-4 shadow">
              <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover mb-2 rounded" />
              <h2 className="font-semibold">{recipe.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
