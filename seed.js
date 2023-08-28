require("dotenv").config();
require("./config/database");

const Category = require("./models/category");
const Product = require("./models/product");


(async function () {
  await Category.deleteMany({});
  const categories = await Category.create([
    { name: "Home", sortOrder: 10 },
    { name: "Remote Control", sortOrder: 20 },
    { name: "DnD", sortOrder: 30 },
    { name: "Random", sortOrder: 40 },
  ]);

  await Product.deleteMany({});
  const products = await Product.create([
    {
      name: "CEN 450 Bumper",
      description:
        "This is a Front Bumper for the CEN F450. 3D Printed in a sparkle black PLA",
      imgUrl: "https://imgur.com/bVZbRcV",
      category: categories[1],
      price: 15.95,
    },
    {
      name: "HeadSet Wall Mount",
      description:
        "This is a wall mount for any gaming or pc head set. Features a extra hanger for the wires",
      imgUrl: "https://imgur.com/hQ5UFXO",
      category: categories[3],
      price: 10.95,
    },
    {
      name: "Blink 360 Mount",
      description: "This is a wall mount for the blink mini 360 camera",
      imgUrl: "https://imgur.com/9lAi6ID",
      category: categories[0],
      price: 13.95,
    },
    {
      name: "Bottle Wall Mount",
      description:
        "This is a mount you can either screw or you sticky tape with. It is made to hold most spray bottles. Comes in a color changing purple to pink with heat PLA",
      imgUrl: "https://imgur.com/9lAi6ID",
      category: categories[0],
      price: 6.95,
    },
    {
      name: "Mountain Key Holder",
      description:
        "This is a 4 ring key holder with mountains on top. color can be changed by request",
      imgUrl: "https://imgur.com/JPkwFKr",
      category: categories[0],
      price: 13.95,
    },
    {
      name: "Wasp bottle Trap",
      description: "This is a wasp trap made to go on a standard size bottle",
      imgUrl: "https://imgur.com/1xpkcjf",
      category: categories[0],
      price: 4.95,
    },
    {
      name: "Table side holder",
      description:
        "This is a clamp to attach to the side of the table to hold a purse or grocery bags or anything else you can think of!",
      imgUrl: "https://imgur.com/MkWfjUc",
      category: categories[3],
      price: 4.95,
    },
  ]);

  console.log(products);

  process.exit();
})();
