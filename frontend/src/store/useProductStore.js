import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify"


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "";

export const useProductStore = create((set, get) => ({
    //product state
    products: [],
    loading: false,
    error: null,
    currentProduct:null,
    // form state
    formData:{
    name: "",
    price: "",
    image:""    
    },
    
    setformData:(formData)=>{
    
     set({formData})   

    },
    resetForm:()=>{
     set({formData:{name: "",price:"",image: ""}})   
    },

    addProducts: async(e)=>{
    e.preventDefault();
    set({loading:true});

    try {
        const {formData} = get();
        await axios.post(`${BASE_URL}/api/products/product`,formData);
        await get().fetchProducts();
        get().resetForm();
        toast.success("product added succesfully")


        
    } catch (error) {
          console.log('error add product function', error);
            toast.error("something went wrong")
    }

    finally{

        set({loading:false})
    }

    },

    fetchProducts: async () => {
        set({ loading: true });

        try {
            const response = await axios.get(`${BASE_URL}/api/products`);

            set({ products: response.data, error: null });

        } catch (error) {

            if (response.status === 429) {
                set({ error: "Rate limit exceeded" })
            }

            else {
                set({ error: error })
            }

        }

        finally {
            set({ loading: false })
        }


    },

    deleteProducts: async (id) => {
        set({ loading: true });

        try {
            const deletedData =  await  axios.delete(`${BASE_URL}/api/products/${id}`)
            set((prev) => ({ products: prev.products.filter((product) => product.id !== id) }));
            toast(deletedData.data.message);

        } catch (error) {
            console.log('error in delete product function', error);
            toast.error("something went wrong")
        }


        finally {
            set({ loading: false })
        }
    },


    fetchProduct:async(id)=>{
        
        set({loading:true});

       try {

        const response = await axios.get(`${BASE_URL}/api/products/${id}`);
        set({currentProduct:response.data.data,formData:response.data,error:null});


       } catch (error) {

        console.log("error in fetch Product function",error);
        set({error:"Something went Wrong",currentProduct:null})
        
       }

      finally{

      set({loading:false})

      }

    },

    updateProduct:async(id)=>{
       
       set({loading:true})

        try {

            const {formData} = get();
            const response = await axios.put(`${BASE_URL}/api/products/update/${id}`,formData);
            set({currentProduct:response.data.data,formData:response.data,error:null});
            toast.success("product updated succesfully");


            
        } catch (error) {
               console.log("error in update Product function",error);
        set({error:"Something went Wrong",currentProduct:null})
            
        }

        finally{
        
            set({loading:false})

        }
    }


}))