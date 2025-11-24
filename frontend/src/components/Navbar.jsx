import React from 'react';
import { ShoppingCartIcon,ShoppingBagIcon } from "lucide-react";
import { Link, useResolvedPath } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';

const Navbar = () => {

  const {products} = useProductStore()

  const { pathname } = useResolvedPath();
  const isHomePage = pathname === "/"
  return (
    <div className='bg-base-100/80  border-b border-e-base-content/10 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto'>
        <div className='navbar px-4 min-h-16 justify-between backdrop-blur-lg'>
          {/* Logo */}
          <div className='flex-1 lg:flex-none'>
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className='flex items-center gap-2'>
                <ShoppingCartIcon />
                <span className='font-semibold font-mono tracking-widest text-2xl bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary'>
                  MED-STORE
                </span>

              </div>


            </Link>

          </div>

          {/* Right Section */}
          <div className='flex items-center gap-2'>
            {isHomePage &&(
              <div className='indicator'>
              <div className='p-2 rounded-full hover:bg-base-200 transition-colors'>
               <ShoppingBagIcon className='size-5'/>
               <span className='badge badge-sm badge-primary indicator-item'>
                {products.length}
               </span> 
                
                
                
              </div>  



              </div>
              )}

          </div>

        </div>


      </div>


    </div>
  )
}

export default Navbar