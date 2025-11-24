import { sql } from "../config/db.js"


export const getAllProducts = async (req, res) => {

  try {

    const products = await sql`SELECT * FROM products`
    res.status(200).json(products);

  } catch (error) {

    console.log("error in getAllProduct funtion")
    res.status(500).json({ error: error.message, message: "internal server error" })
  }

}

export const createProduct = async (req, res) => {

  const { name, price, image } = req.body;

  if (!name || !price || !image) {

    return res.status(400).json({ success: false, messsage: "all fields are required" })

  }


  try {

    const newproduct = await sql`
    INSERT INTO products (name,price,image)
    VALUES(${name},${price},${image})
    RETURNING *
    `
    console.log("new product added :", newproduct)
    res.status(201).json({ success: true, data: newproduct[0] })

  } catch (error) {

    console.log("error in createProduct function")

    res.status(500).json({ error: error.message, message: "internal server error" })
  }



}



export const getProduct = async (req, res) => {

  const {id} = req.params;

  try {

    const product = await sql`
    SELECT * FROM products WHERE id = ${id}
    `
    console.log("new product added :", product)
    res.status(201).json({ success: true, data: product[0] })

  } catch (error) {
    console.log("error in getProduct controller")
    res.status(500).json({ error: error.message, message: "Internal Server Error" })
  }

}



export const updateProduct = async (req, res) => {

  const { id } = req.params;
  const { name, image, price } = req.body;


  try {

    const updatedProduct = await sql`
    UPDATE products
    SET name=${name},price=${price},image=${image}
    where id=${id}
    RETURNING *
    `

    if (updatedProduct.length == 0) {

      return res.status(404).json({ success: false, messsage: "no products found" })

    }

    res.status(200).json({ success: true, message: "product updated succesfully", data:updatedProduct[0] });


  } catch (error) {

    console.log("error in updateProduct controller")
    res.status(500).json({ error: error.message, message: "Internal Server Error" })

  }


}


export const deleteProduct = async (req, res) => {

  const { id } = req.params;

  try {

    const deletedProduct = await sql`
    DELETE FROM products
    WHERE id=${id}
    RETURNING *
    `
    if (deletedProduct.length === 0) {
      return res.status(404).json({ message: "product not found" })
    }
    res.status(200).json({ message:"product deleted succesfully", data:deletedProduct[0] })

  } catch (error) {
   console.log("error in delete Product controller")
    res.status(500).json({ error: error.message, message: "Internal Server Error" })
  }

}



