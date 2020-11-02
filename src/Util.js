import axios from 'axios'

const CUBIC_WEIGHT_CONVERSION_FACTOR = 250
const toCubicMeters = 10000000
const baseUrl = "http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com"

export const getAirConditionerProducts = (productPage, products, resolve, reject) => {

  axios.get(baseUrl + productPage)
    .then(response => {
      const retrivedProducts = products.concat(response.data.objects.filter(product => product.category === "Air Conditioners"))

      if (response.data.next === null) {
        resolve(retrivedProducts)
      } else {
        getAirConditionerProducts(response.data.next, retrivedProducts, resolve, reject)
      }
    })
    .catch(error => {
      console.log(error)
      reject('Something wrong. Please refresh the page and try again.')
    })
}

export const getCubicWeight = (product) => {
  const { width, length, height } = product.size
  return width * length * height / toCubicMeters * CUBIC_WEIGHT_CONVERSION_FACTOR
}