import { useState, useEffect } from 'react'
import axios from 'axios';

const APiCall = ({category}) => {

    const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`, 
          {
            params: { query: category, per_page: 30 },
            headers: {
              Authorization: `647992 JHTcxPKJ-J3Win1NRHKNCMhDyqhjqSOGX8cgU2Q6d14`,
            },
          }
        );
        setImages(response.data.results);
        console.log(response);
        
      } catch (error) {
       
        console.log("Error fetching images from Unsplash", error);
      }
    };

    fetchImages();
  }, [category]);


  return (
    <div style={styles.grid}>
    {images.map((image) => (
      <div key={image.id} style={styles.imageContainer}>
        <img 
          src={image.urls.small} 
          alt={image.description} 
          style={styles.image} 
        />
      </div>
    ))}
  </div>
  )
}


const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "10px",
    },
    imageContainer: {
      overflow: "hidden",
      height: "200px",
      borderRadius: "10px",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  };

export default APiCall