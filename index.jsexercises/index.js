// exercises.js
const assert = require("assert");

const products = [
  {
    id: "m1",
    name: "Tour T-Shirt",
    price: 35,
    inStock: true,
    category: "Merchandising",
  },
  {
    id: "m2",
    name: "Signed Poster",
    price: 50,
    inStock: false,
    category: "Merchandising",
  },
  {
    id: "m3",
    name: "Vinyl Record",
    price: 40,
    inStock: true,
    category: "Phonography",
  },
  {
    id: "m4",
    name: "Enamel Pin",
    price: 15,
    inStock: true,
    category: "Accessories",
  },
  {
    id: "m5",
    name: "CD Album",
    price: 20,
    inStock: false,
    category: "Phonography",
  },
];

const catalog = {
  StadiumA: [
    {
      id: "m1",
      name: "Tour T-Shirt",
      price: 35,
      inStock: true,
      category: "Merchandising",
    },
    {
      id: "m2",
      name: "Signed Poster",
      price: 50,
      inStock: false,
      category: "Merchandising",
    },
  ],
  ArenaB: [
    {
      id: "m3",
      name: "Vinyl Record",
      price: 40,
      inStock: true,
      category: "Phonography",
    },
    {
      id: "m4",
      name: "Enamel Pin",
      price: 15,
      inStock: true,
      category: "Accessories",
    },
    {
      id: "m5",
      name: "CD Album",
      price: 20,
      inStock: false,
      category: "Phonography",
    },
  ],
};

/**
 * Description: Filter an array of products to include only those currently in stock.
 * Example Output: [{ id: "m1", inStock: true, ... }, { id: "m3", inStock: true, ... }]
 */
function getAvailableProducts(products) {
  // je filtre le tableau pour garder seulement les produits où inStock est true
  const productsInStock = products.filter((product) => product.inStock === true);
  return productsInStock;
}

/**
 * Description: Transform the product data into a lookup table where IDs are keys.
 * Note: Only include products that are in stock.
 * Example Output: { "m1": { id: "m1", ... }, "m3": { id: "m3", ... } }
 */
function createProductDictionary(products) {
  let dict = {};
  // je recupere dabord les produits en stock avec la fonction du dessus
  const productsInStock = getAvailableProducts(products);
  // ensuite pour chaque produit je l'ajoute dans dict avec son id comme clé
  productsInStock.forEach((product) => {
    dict[product.id] = product;
  });
  return dict;
}

/**
 * Description: Group all in-stock products into arrays based on their category name.
 * Example Output: { "Merchandising": [...], "Phonography": [...] }
 */
function groupProductsByCategory(products) {
  const grouped = {};
  const productsInStock = getAvailableProducts(products);
  productsInStock.forEach((product) => {
    // si la categorie nexiste pas encore dans l'objet je cree un tableau vide
    if (!grouped[product.category]) {
      grouped[product.category] = [];
    }
    // puis j'ajoute le produit dans le bon tableau
    grouped[product.category].push(product);
  });
  return grouped;
}

/**
 * Description: Calculate the total financial value of all in-stock items for every location.
 * Example Output: { StadiumA: 35, ArenaB: 55 }
 */
function calculateCategoryTotals(catalog) {
  const totals = {};
  // je parcours chaque lieu du catalogue
  for (const location in catalog) {
    const inStockProducts = getAvailableProducts(catalog[location]);
    // reduce pour additionner les prix, je commence a 0
    totals[location] = inStockProducts.reduce(
      (sum, product) => sum + product.price,
      0
    );
  }
  return totals;
}

console.log("--- RUNNING TESTS ---");

runTest(
  "Exercise 1: getAvailableProducts",
  () => getAvailableProducts(products),
  [
    {
      id: "m1",
      name: "Tour T-Shirt",
      price: 35,
      inStock: true,
      category: "Merchandising",
    },
    {
      id: "m3",
      name: "Vinyl Record",
      price: 40,
      inStock: true,
      category: "Phonography",
    },
    {
      id: "m4",
      name: "Enamel Pin",
      price: 15,
      inStock: true,
      category: "Accessories",
    },
  ],
);

runTest(
  "Exercise 2: createProductDictionary",
  () => createProductDictionary(products),
  {
    m1: {
      id: "m1",
      name: "Tour T-Shirt",
      price: 35,
      inStock: true,
      category: "Merchandising",
    },
    m3: {
      id: "m3",
      name: "Vinyl Record",
      price: 40,
      inStock: true,
      category: "Phonography",
    },
    m4: {
      id: "m4",
      name: "Enamel Pin",
      price: 15,
      inStock: true,
      category: "Accessories",
    },
  },
);

runTest(
  "Exercise 3: groupProductsByCategory",
  () => groupProductsByCategory(products),
  {
    Merchandising: [
      {
        id: "m1",
        name: "Tour T-Shirt",
        price: 35,
        inStock: true,
        category: "Merchandising",
      },
    ],
    Phonography: [
      {
        id: "m3",
        name: "Vinyl Record",
        price: 40,
        inStock: true,
        category: "Phonography",
      },
    ],
    Accessories: [
      {
        id: "m4",
        name: "Enamel Pin",
        price: 15,
        inStock: true,
        category: "Accessories",
      },
    ],
  },
);

runTest(
  "Exercise 4: calculateCategoryTotals",
  () => calculateCategoryTotals(catalog),
  {
    StadiumA: 35,
    ArenaB: 55,
  },
);

function runTest(testName, resultFunction, expected) {
  try {
    const result = resultFunction();
    assert.deepStrictEqual(result, expected);
    console.log(`✅ ${testName} PASSED`);
  } catch (error) {
    console.error(`❌ ${testName} FAILED`);

    if (error.name !== "AssertionError") {
      console.error(`   RUNTIME ERROR: ${error.message}`);
      console.error(`   Stack Trace: ${error.stack.split("\n")[1].trim()}`);
    } else {
      console.error("   Expected:", JSON.stringify(error.expected, null, 2));
      console.error("   Received:", JSON.stringify(error.actual, null, 2));
      if (error.code === "ERR_ASSERTION") {
        console.error(`\n   Note: ${error.message.split("\n")[0]}`);
      }
    }
  }
}
