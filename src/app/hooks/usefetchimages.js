import { useState, useEffect } from "react";

export const useFetchImage = (key) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        console.log("before hooke");
        const res = await fetch(`/api/presignedurl?key=${key}&type=get`);
        console.log("before hooke");

        if (!res.ok) throw new Error("Failed to fetch image URL");
        const { url } = await res.json();
        setImageUrl(url);
      } catch (err) {
        setError(err.message);
      }
    };

    if (key) fetchImage();
  }, [key]);

  return { imageUrl, error };
};
