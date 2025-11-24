import { Link } from 'react-router-dom'
import React from 'react';
import { EditIcon, TrashIcon } from "lucide-react";
import { useProductStore } from '../store/useProductStore';
import { motion } from "motion/react";

const ProductCard = ({ product }) => {

   const {loading,error,products,deleteProducts} = useProductStore()


   const deleteProduct = async()=>{
 if (window.confirm("Are you sure you want to delete this product?")) {
    await deleteProducts(product.id)

   }
}
    return (
        <motion.div className='card bg-base-100  shadow-[0_10px_20px_rgba(0,0,0,0.2)]
     hover:shadow-[0_10px_25px_rgba(255,100,180,0.5)]
     transition-shadow duration-300 ' initial={{ opacity:0,y:100}} 
     animate={{opacity:1 ,y: 0}} transition={{ duration: 0.8, ease: "easeInOut" }}>
            <figure className='relative pt-[56.25%]'>
                <img
                    src={product.image}
                    alt={product.name}
                    className='absolute top-0 left-0 w-full h-full  object-cover' />
                    
            </figure>

            <div className='card-body gap-0'>
                <h2 className='card-title text-lg font-semibold text-blue-800'>{product.name}</h2>
                <p className='text-md font-semibold text-black'><span className='mr-1 text-gray-600'>₹</span>{Number(product.price).toFixed(2)}</p>
            </div>

            {/* Card Actions */}
            <div className='card-actions justify-end m-4 '>
                <Link to={`/product/${product.id}`} className='btn btn-sm btn-info btn-outline' >
                    <EditIcon className='size-4' />
                </Link>
                <button className='btn btn-sm btn-error btn-outline'onClick={()=>deleteProduct()}>
                    <TrashIcon />
                </button>
            </div>

        </motion.div>
    )
}

export default ProductCard