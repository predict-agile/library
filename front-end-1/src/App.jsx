import axios from 'axios';
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [bookData, setBookData] = useState(null)

  const handleChange = event => {
    setSearchTerm(event.target.value);
  }

  const search = () => {
    console.log(`searching for ${searchTerm}`);
    axios.get(`http://localhost:3000/find-book/${searchTerm}`)
      .then(response => {
        if (response.data) {
          console.log(response.data);
          setBookData(response.data);
        } else {
          alert(`Could not find ${searchTerm}`);
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert(`Had trouble connecting`);
        }
      });
  }

  const checkout = () => {
    axios.get(`http://localhost:3000/checkout-book/${searchTerm}`)
      .then(response => {
        if (response.data) {
          alert(response.data.message);
        } else {
          alert(`Could not find ${searchTerm}`);
        }
      })
      .catch(error => {
        if (error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert(`Had trouble connecting`);
        }
      });
  }

  const wishlist = () => {
    axios.get(`http://localhost:3000/wishlist-book/${searchTerm}`)
      .then(response => {
        if (response.data) {
          alert(response.data.message);
        } else {
          alert(`Could not find ${searchTerm}`);
        }
      })
      .catch(error => {
        if (error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert(`Had trouble connecting`);
        }
      });
  }

  return (
    <>
      <input type="text" onChange={handleChange} value={searchTerm} />
      <button onClick={search}>Search</button>
      <button onClick={checkout}>Checkout</button>
      <button onClick={wishlist}>Wishlist</button>
      { bookData &&
        <table>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Language</th>
            <th>Publisher</th>
          </tr>
          <tr>
            <td>{bookData.book_name}</td>
            <td>{bookData.author_name}</td>
            <td>{bookData.genre_name}</td>
            <td>{bookData.language_name}</td>
            <td>{bookData.publisher_name}</td>
          </tr>
        </table>
      }
      { !bookData && 
          <div>Type in a book name to find it</div>
      }
    </>
  )
}

export default App
