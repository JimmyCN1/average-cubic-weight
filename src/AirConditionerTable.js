import { useEffect, useState } from 'react'
import { getCubicWeight, getAirConditionerProducts } from './Util.js';

export default function AirConditionerTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    new Promise((resolve, reject) => {
      getAirConditionerProducts('/api/products/1', [], resolve, reject)
    })
      .then(response => {
        setProducts(response)
      })
  }, []);

  return (
    <div>
      <h1>Air Conditioner Products</h1>
      {products.map(product => <li key={product.title}>{product.title + ": " + getCubicWeight(product).toFixed(2) + "kg"}</li>)}
    </div>
  )
}