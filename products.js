
const path = require('path')
const Products = require('./products')
const autoCatch = require('lib/auto-catch')

async function list (options = {}) {
  const { offset = 0, limit = 25, tag } = options
  const data = await fs.readFile(productsFile)

  return JSON.parse(data)
  .filter(product=> {
    if(!tag){
      return product
    }
    return product.tag.find({title} => title ==tag)
  })
  .slice(offset, offset + limit)
}

async function get (id) {
  const products = JSON.parse(await fs.readFile(productsFile))

  // Loop through the products and return the product with the matching id
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i]
    }
  }
  return null;
}
module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct
});