'use strict'

const db = require('../server/db')
const {User, Product, Review} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', userType: 'admin'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const products = await Promise.all([
    Product.create({category: 'cheese', name: 'Gouda', description: `It is a semi-hard cheese celebrated for its rich, unique flavour and smooth texture. It is one of the most popular cheeses in the world, accounting for 50 to 60 percent of the world's cheese consumption.`, price: 15, stock: 20, imageURL: 'https://cdnimg.webstaurantstore.com/images/products/xxl/430484/1725330.jpg'}),
    Product.create({category: 'cheese', name: 'Brie de Nangis', description: 'Brie de Nangis hails from Brie, just southwest of Paris, France, and is one of the milder, more buttery Bries. It almost disappeared from production but has seen a revival over the past few decades. Brie de Nangis is creamy and smooth and has a slightly chalky center that becomes runny with age. This cheese also pairs well with a Sauvignon Blanc and bigger reds such as Merlot. Please note: Because our cheeses are cut by hand exact weights may vary slightly.', price: 10, stock: 0, imageURL: 'https://cdnimg.webstaurantstore.com/images/products/large/440426/1726044.jpg'}),
    Product.create({category: 'cheese', name: 'Blue Castello', description: 'Ballston Blue, another gem from Upstate New York, is a mellow cow milk blue cheese, adding a slightly nutty accent to the delicate blue veins that run through this semi-firm cheese. Well-suited to salads, sauces, and baking, this versatile and flavorful cheese pairs well with a full-bodied Cabernet Sauvignon, Port or a bold IPA style beer.', price: 23, stock: 20, imageURL: 'https://cdn0.woolworths.media/content/wowproductimages/large/048824.jpg'}),
    Product.create({category: 'cheese', name: 'Epoisses', description: 'Epoisses is a perennial favorite of fans of strong-smelling cheese. This classic cows milk cheese hails from Burgundy and has been made in the small town of Epoisses since the late 1700s. In order to develop the characteristic dark orange rind, Epoisses is washed with brine for several weeks then finished with wine or brandy. In the Artisanal Premium Cheese caves we continue the Affinage process, washing our Epoisses several times with Burgundy brandy. This extra washing deepens the flavors of the cheese and guarantees a spoonable, silky paste. One piece weighs approximately 8-10 ounces.', price: 25, stock: 25, imageURL: 'https://www.markys.com/images/P/MarkysGourmet_EpoissesAOC-cowmilk_A_701075_120293.jpg'}),
    Product.create({category: 'cheese', name: 'Manchego with Red Wine', description: `Manchego with Red Wine, or "Purple Goat Manchego", gets its interesting purple color from blending the raw goat milk with Cencibel, a red wine made from the greatest of Spanish grapes. Cencibel is from central and southern Spain, specifically the La Mancha region just like Manchego.  The Manchego with Red Wine is aged for 6-8 months. Its taste is milky with shades of red wine and the rind is purple and well-defined with the iconic basket weave pattern that typifies Manchegos. Try pairing this cheese with light crisp whites and light to medium-bodied red wines.`, price: 15, stock: 20, imageURL: 'https://cdn.shopify.com/s/files/1/0676/7551/products/VINO-1000_580x@2x.jpg?v=1537555318'}),
    Product.create({category: 'cheese', name: 'Gruyère, Cave-Aged', description: `Gruyère is one of the most famous Swiss cheeses. It is made from cow's milk and has a nutty, sweet taste with complex musty and mushroomy notes. Our wheels of Gruyère are aged by Rolf Beeler, a master affineur in Zurich. Aging a minimum of sixteen months yields a firm pâte with a granular texture. This exceptional Gruyère is delicious when used in a fondue as well as on it own. Pair this cheese with a Champagne, Syrah, or even Zinfandel. Please note: Because our cheeses are cut by hand exact weights may vary slightly.`, price: 20, stock: 20, imageURL: 'https://cdn.shopify.com/s/files/1/0676/7551/products/Gruyere_stock_900x600_580x@2x.jpg?v=1498162730'}),
    Product.create({category: 'cheese', name: 'Double Gloucester', description: 'Double Gloucester is a traditional, full-fat, firm cheese made from the milk of once nearly extinct Old Gloucester cows and traces its origins to 1498 in the City of Gloucester, England. Gloucester is available in both Single and Double varieties. Single is made from skim milk and Double from full-fat milk. Double Gloucester is twice the height of Single with a smooth and buttery texture and a rich, nutty yet mellow flavor. Aged for at least four months and made using vegetarian rennet. Double Gloucester pairs well with a traditional British ale or a nice red like Syrah', price: 15, stock: 20, imageURL: 'https://cdn.shopify.com/s/files/1/0676/7551/products/Double_Gloucester_580x@2x.jpg?v=1499877305'}),
    Product.create({category: 'meat', name: 'Salami', description: 'A type of cured sausage consisting of fermented and air-dried meat, typically beef or pork', price: 200, stock: 40, imageURL: 'http://diablomag-images.dashdigital.com/images/cache/cache_d/cache_c/cache_e/DM1703_019_DIG-051f1ecd.jpeg'}),
    Product.create({category: 'meat', name: 'Prosciutto', description: 'Sweet, Italian dry-cured ham intended to be eaten raw. It is usually served thinly sliced.', price: 85, stock: 0, imageURL: 'https://image.ibb.co/cA84LA/51c7-PSi1-Bt-L-SX355.jpg'}),
    Product.create({category: 'meat', name: 'Pepperoni', description: 'A vibrantly spiced, air-dried, cured Italian sausage, pepperoni (or peperone in Italian) is long and thin compared to other salamis.', price: 100, stock: 20, imageURL: 'http://thegreyplume.com/wp-content/uploads/2014/11/pepperoni-1-pound-charcuterie-grey-plume-omaha-edited.jpg'}),
    Product.create({category: 'extra', name: 'Baguettes', description: 'A delicious crunchy, long, and thin loaf of French bread that is commonly made from basic lean dough distinct for its length.', price: 150, stock: 25, imageURL: 'https://cdn.shopify.com/s/files/1/0307/2417/products/Baguette-rounds_600x.jpg'}),
    Product.create({category: 'extra', name: 'Jam', description: 'Homemade jams from a local farm that is bound to taste fresh and exquisite', price: 15, stock: 10, imageURL: 'https://static1.squarespace.com/static/58cb2c045016e18ecfa248f4/t/592896ca59cc686136713101/1495834919485/'}),
    Product.create({category: 'charcuterie board', name: 'Charcuterie Board', description: 'Pre-packaged charcuterie board to wow your guests for under $100!', price: 99, stock: 1, imageURL: 'https://cdn.shopify.com/s/files/1/1115/5612/products/REY273LN2-Large-Round-Beech-Pizza-Board-1.jpg'})
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
