import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [bookData, setBookData] = useState(null)
  const [allInventory, setAllInventory] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/all-inventory')
      .then(response => {
        console.log(response.data);
        setAllInventory(response.data);
      })
  }, [])

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

  const renderItemButton = (item) => {
    if (item.available_count > 0) {
      return (
        <button style={{ backgroundColor: 'lightgreen'}} onClick={checkout}>Checkout</button>
      )
    }

    return (
      <button style={{ backgroundColor: 'lightyellow'}} onClick={checkout}>Join Waitlist</button>
    )
  }

  const renderInventoryItem = (item) => {
    return (
      <tr key={item.inventory_id}>
        <td>{item.book.book_name}</td>
        <td>{item.book.author.author_name}</td>
        <td>{item.book.genre.genre_name}</td>
        <td>{item.book.language.language_name}</td>
        <td>{item.book.publisher.publisher_name}</td>
        <td>{item.location.location_name}</td>
        <td>{item.available_count}</td>
        <td>{renderItemButton(item)}</td>
      </tr>
    )
  }

  return (
    <>
      <input type="text" style={{ width: '25%', margin: '5%'}} onChange={handleChange} placeholder='Type here to add a book to the wishlist' value={searchTerm} />
      {/* <button onClick={search}>Search</button>
      <button onClick={checkout}>Checkout</button> */}
      <button onClick={wishlist} style={{ backgroundColor: 'aqua'}}>Add to Wishlist</button>
      { allInventory.length > 0 &&
        <table style={{ margin: '3%'}}>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Language</th>
            <th>Publisher</th>
            <th>Location</th>
            <th>Copies Available</th>
            <th></th>
          </tr>
          { allInventory.map(item => renderInventoryItem(item))}
        </table>
      }
      { allInventory.length == 0 && 
          <div>Wow it looks like there are no books</div>
      }
    </>
  )
}

export default App
