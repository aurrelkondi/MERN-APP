import React from 'react'
import { useContext } from 'react'
import { Context } from '../context/context'
import baseUrl from '../config'

export default function Product() {
  const {allProducts, isLogin, setCart, setUpdateProductList} = useContext(Context)
 
  const addToCartHandler = product =>{
    if(product.quantity>0){
      fetch(baseUrl+'/product/addToCart/'+ product._id)
        .then(res=>res.json(res))
        .then(data=>{
            setUpdateProductList(pre=>+pre-1)
            const productToAdd = {...product, quantity:1}
            setCart(pre=>{
              if(pre.some(el=>el._id===productToAdd._id)){
                return pre.map(el=>{
                  if(el._id===productToAdd._id){
                    el.quantity++
                    return el
                  } else return el
                })
              } else return [...pre, productToAdd]
            })
        }) 
    } 
  }
  
  return (<>
   <h1 className='text-center'>All Products</h1>
    <div className='productContainer d-flex flex-row flex-wrap'>
     
      {
         allProducts && allProducts.map((ele,i) => (
           <div key={i} className="card m-2 text-center" >

           <div className="card-body">
               <h5 className="card-title">{ele.product_title}</h5>
               {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
             </div>
             <ul className="list-group list-group-flush">
               <li className="list-group-item">quantity: {ele.quantity}</li>
               <li className="list-group-item">price: {ele.price} €</li>
             </ul>
              
             
              {isLogin && ( <button className='btn btn-primary m-2' onClick={()=>addToCartHandler(ele)}>Add to cart</button> )}
           </div>
         ))
      }
    </div>
    </>
  )
}
