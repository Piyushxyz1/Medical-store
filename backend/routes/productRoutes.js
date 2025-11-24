import express from "express";
import { getAllProducts,createProduct,getProduct,updateProduct,deleteProduct } from "../controllers/productController.js";

const router = express.Router()

router.get("/",getAllProducts);
router.post("/product",createProduct);
router.get("/:id",getProduct);
router.put("/update/:id",updateProduct);
router.delete("/:id",deleteProduct);


export default router