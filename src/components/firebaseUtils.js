import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const toggleFavorite = async (userId, recipe) => {
  const favRef = doc(db, "favorites", userId);
  const docSnap = await getDoc(favRef);

  let favorites = [];

  if (docSnap.exists()) {
    favorites = docSnap.data().recipes || [];
  }

  // Check if already favorited
  const alreadyFav = favorites.find((r) => r.id === recipe.id);

  if (!alreadyFav) {
    favorites.push(recipe);
    await setDoc(favRef, { recipes: favorites });
  } else {
    // remove from favorites
    const updated = favorites.filter((r) => r.id !== recipe.id);
    await setDoc(favRef, { recipes: updated });
  }
};
