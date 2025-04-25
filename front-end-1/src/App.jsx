import axios from 'axios';
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [book, setBook] = useState(null)

  const handleChange = event => {
    setSearchTerm(event.target.value);
  }

  const search = () => {
    console.log(`searching for ${searchTerm}`);
    axios.get(`http://localhost:3000/find-book/${searchTerm}`)
      .then(response => {
        if (response.data) {
          console.log(response.data);
          setBook(response.data);
        } else {
          alert(`Could not find ${searchTerm}`);
        }

      })
      .catch(error => {
        console.log(error);
        alert(`Oh snap, an error`);
      });
  }

  return (
    <>
      <input type="text" onChange={handleChange} value={searchTerm} />
      <button onClick={search}>Search</button>
      { book &&
        <table>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
          </tr>
          <tr>
            <td>{book.book_name}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
          </tr>
        </table>
      }
      { !book && 
          <div>Type in a book name and click search to find it</div>
      }
    </>
  )
}

export default App
