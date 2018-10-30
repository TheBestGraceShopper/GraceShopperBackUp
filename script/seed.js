'use strict'

const db = require('../server/db')
const {User, Product, Review} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const products = await Promise.all([
    Product.create({category: 'cheese', name: 'Gouda', description: `It is a semi-hard cheese celebrated for its rich, unique flavour and smooth texture. It is one of the most popular cheeses in the world, accounting for 50 to 60 percent of the world's cheese consumption.`, price: 15, stock: 20, imageURL: 'https://cdnimg.webstaurantstore.com/images/products/xxl/430484/1725330.jpg'}),
    Product.create({category: 'cheese', name: 'Brie', description: '', price: 30, stock: 25, imageURL: 'https://cdnimg.webstaurantstore.com/images/products/large/440426/1726044.jpg'}),
    Product.create({category: 'cheese', name: 'Blue Castello', description: 'This soft cheese made from cow’s milk has a smooth and creamy texture. Blue Castello cheese has a buttery and tangy taste. It is often served with fresh salad and crisp crackers as well as wines like Chenin Blac and Sauvignon Blac.', price: 23, stock: 20, imageURL: 'https://cdn0.woolworths.media/content/wowproductimages/large/048824.jpg'}),
    Product.create({category: 'meat', name: 'Salami', description: '', price: 15, stock: 40, imageURL: 'http://diablomag-images.dashdigital.com/images/cache/cache_d/cache_c/cache_e/DM1703_019_DIG-051f1ecd.jpeg'}),
    Product.create({category: 'meat', name: 'Prosciutto', description: '', price: 15, stock: 35, imageURL: ''}),
    Product.create({category: 'meat', name: 'Pepperoni', description: '', price: 15, stock: 20, imageURL: ''}),
    Product.create({category: 'extra', name: 'Baguettes', description: '', price: 15, stock: 25, imageURL: ''}),
    Product.create({category: 'extra', name: 'Jam', description: '', price: 15, stock: 10, imageURL: ''})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
