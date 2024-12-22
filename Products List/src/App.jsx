import { useState } from 'react'
import './App.css'

const App = () => {
  const [productsList, setproductsList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const releaseDate = form.releaseDate.value;
    const price = form.price.value;
    const description = form.description.value;
    setproductsList(() => [...productsList, {title, releaseDate, price, description}])
    form.reset();
  }
  return (
    <main>
      <h1>Products List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Product title" required />
        <input type="text" name="releaseDate" placeholder="Product release date" required />
        <input type="text" name="price" placeholder="Product price" required />
        <input type="text" name="description" placeholder="Product description" required />
        <button>Submit</button>
      </form>
      <div id="products">
        {
          productsList.map((curValue, index) => {
            return (
              <div key={`product-${index}`} className="product">
                <h2>{curValue.title}</h2>
                <p>{curValue.releaseDate}</p>
                <p><b>{curValue.price}$</b></p>
                <p>{curValue.description}</p>
              </div>
            );
          })
        }
      </div>
    </main>
  );
}

export default App;
