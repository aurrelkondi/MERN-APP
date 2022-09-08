 import React, { useState } from 'react'
import { useEffect } from 'react'
// import { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../context/context'
import Order from './Order'
import baseUrl from '../config'

export default function HeaderLogined() {

    const {userInfo, setUpdateProductList, updateProductList, setShowCart} = useContext(Context)
    
    const [userProduct, setUserProduct] = useState()
        , [editInput, setEditInput] = useState({
            product_title:'',
            quantity: '',
            price: ''
        })
        , [showOrder, setShowOrder] = useState(false)
    
    // for updating a product

    const confirmUpdateHandler = (id, index) =>{
        fetch(baseUrl+'/product/update', {
            method: 'POST',
            body: JSON.stringify({...editInput, _id:id}),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then(json=>{
                if(json.update){
                    setUpdateProductList(pre=>+pre+1)

                }
            })
    }

    const editInputHandler = e =>{
        setEditInput((pre) => ({
            ...pre,
            [e.target.name]: e.target.value,
          }))
        // console.log(editInput)
    }
    
    const editProduct = index =>{
        const newUserProduct = userProduct.map((ele,i)=>{
            if(+i===+index){
                ele.edit = !ele.edit
            }
            return ele
        })
        setUserProduct(newUserProduct)
    }

    // for delete a product
    const deleteProduct = id =>{
        fetch(baseUrl+'/product/delete/'+ id)
        .then(res=>res.json(res))
        .then(data=>{
            alert('The Product is deleted')
            setUpdateProductList(pre=>+pre-1)
        }) 

    }

    // for add a fake product added_by current user
    const addFakerProduct = e =>{
        fetch(baseUrl+'/product/add/'+ userInfo.id)
        .then(res=>res.json(res))
        .then(data=>{
            alert(data.msg + ' by '+ userInfo.username)
            setUpdateProductList(pre=>+pre+1)
            // console.log(updateProductList)
        }) 
    }

    // for showing the products added by current user
    const showUserProduct = e =>{
        fetch(baseUrl+'/product/allByUser/'+ userInfo.id)
        .then(res=>res.json(res))
        .then(data=>{
            const newData = data.map(el=>{
                el.edit=true
                return el
            })
            setUserProduct(newData)      
        }) 
    }

    useEffect(()=>{
        if(userProduct){
            fetch(baseUrl+'/product/allByUser/'+ userInfo.id)
            .then(res=>res.json(res))
            .then(data=>{
                const newData = data.map(el=>{
                    el.edit=true
                    return el
                })
                // console.log(newData)
                setUserProduct(newData)      
            }) 
        }
    }, [updateProductList])

  return (
    <div>
        <div className="container text-center">
        <p>UserName: {userInfo.username}</p>
        <p>Email: {userInfo.email}</p>
        {/* <p>Id: {userInfo.id}</p> */}
        <p>Address: {userInfo.address.street}, {userInfo.address.city}, {userInfo.address.zipcode}</p>

        </div>
        

        <button className='btn btn-success mx-1' onClick={addFakerProduct}>Add Faker Product</button>
        <button className='btn btn-success mx-1' onClick={showUserProduct}>My Product</button>
        <button className='btn btn-success mx-1' onClick={()=>setShowCart(pre=>!pre)}>Cart</button>
        <button className='btn btn-success mx-1' onClick={()=>setShowOrder(pre=>!pre)}>My Orders</button>

        {showOrder && <Order setShowOrder={setShowOrder}/>}

        {userProduct && <>
          
           <h1 className='text-center'>My Products</h1>
           <hr />
           <div className='productContainer d-flex flex-row flex-wrap'>
            {userProduct.map((ele,i)=>
            <div key={i} className="card m-2 text-center">
                {ele.edit ? <h5 className="card-title">{ele.product_title}</h5> : <p className="card-title">product title: <input type="text" placeholder={ele.product_title} name='product_title' onChange={editInputHandler}/></p> }
                
                <ul className="list-group list-group-flush">

                <li className="list-group-item">  
                {ele.edit && <>
                    <button className='btn btn-danger mx-1' onClick={()=>deleteProduct(ele._id)}>Delete</button>
                    <button className='btn btn-info mx-1' onClick={()=>editProduct(i)}>Update</button>
                </>}
                </li>

                <li className="list-group-item">quantity: {ele.edit ? ele.quantity : <><input type="number" placeholder={ele.quantity} name='quantity' onChange={editInputHandler}/></>}</li>

                <li className="list-group-item">price: {ele.edit ? ele.price : <><input type="number" placeholder={ele.price} name='price' onChange={editInputHandler}/></>} €</li>
                
                <li className="list-group-item">
                {!ele.edit && <>
                <button className='btn btn-info ' onClick={()=>confirmUpdateHandler(ele._id, i)}>Confirm Update</button>
                <button className='btn btn-secondary mx-2' onClick={()=>editProduct(i)}>Cancel</button></>}
                </li>

                </ul>
            </div>
            )}
            </div>
           <hr />
        </>}
    </div>
  )
}
