
import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('Food');
  const [startOffset, setStartOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(0);


  const API_URL = 'https://api.unsplash.com/search/photos';
  const ACCESS_KEY = 'JHTcxPKJ-J3Win1NRHKNCMhDyqhjqSOGX8cgU2Q6d14';

  const fetchPhotos = (query) => {
    axios.get(API_URL, {
      params: {
        query: query,
        per_page: 12
      },

      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`
      }
    })
      .then(response => {
        setPhotos(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching data from Unsplash API:', error);
      });
  };

  useEffect(() => {
    fetchPhotos(query);
  }, [query]);

  console.log(query, "query");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleCard = (items) => {
    const data = items.description;
    const words = data.split(" ");

    const startOfValue  = parseInt(startOffset);
    const endOfValue  = parseInt(endOffset);

    console.log(startOfValue , endOfValue , "data");

    if (startOfValue >= 0 && endOfValue >= 0  &&
        words.length >= startOfValue && words.length >= endOfValue 
        && startOfValue <= endOfValue ) { 

        const dataMain = words.slice(startOffset, endOffset);
        var str = dataMain.toString();
        setQuery(str);
    } else {
      alert("add The right Number of The string")
    }
    return data;
  }

  return (

    <>
      <div style={{ width: "90%", margin: "0 auto" }}>
        <div className='row my-4'>
          <div className="mb-3 col-8 col-md-5">
            <input type="text" value={query}
              onChange={handleSearchChange}
              className="form-control"
              id="exampleFormControlInput1" placeholder="Search categories like food or landscape" />
          </div>

          <div className='col-5'>
            <button type="button"
              className="btn btn-primary">
              Search
            </button>
          </div>
        </div>

        <div className="gallery-grid" >
          {photos.map((image) => (
            <div key={image.id} className="gallery-item card">
              <img src={image.urls.small} alt={image.alt_description} />
              <div className='p-1' style={{ fontSize: ".7rem" }}>
                <p>{image.description}</p>
              </div>

              <input onChange={(e) => setStartOffset(e.target.value)} type='number' />
              <input onChange={(e) => setEndOffset(e.target.value)} type='number' />
              {/* onChange={(e) => setInputvalEnd(e.target.value) * -1} */}
              <button onClick={() => handleCard(image)}>Search</button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
