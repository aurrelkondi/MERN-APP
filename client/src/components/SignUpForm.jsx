import React, { useState ,useContext } from 'react'
import { Context } from "../context/context";
import baseUrl from '../config'

export default function SignUpForm({setSignUp, setLogin}) {

    const {  setIsLogin,  setUserInfo} = useContext(Context)

    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
        email: '',
        street: '',
        city: '',
        zipcode: '',
        
        })

    const onChangeHandler = (e) => {
        setUserInput((prevUser) => ({
        ...prevUser,
        [e.target.name]: e.target.value,
        }));
        } 

    const signUpHandler = e =>{
        e.preventDefault();
        // console.log(userInput)
        fetch(baseUrl+'/user/signup', {
        method: 'POST',
        body: JSON.stringify(userInput),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.err) alert(json.err)
            else {
                alert('Welcome '+ json.username)
                setIsLogin(true)
                setUserInfo(json)
                setSignUp(false)
                setLogin(false)
            }
        });
    }

    const addFakeUser = e =>{
        e.preventDefault();
        fetch(baseUrl+'/user/add')
        .then((response) => response.json())
        .then((json) => {
            if(json.err) alert(json.err)
            else {
                alert('Welcome '+ json.username)
                setIsLogin(true)
                setUserInfo(json)
                setSignUp(false)
                setLogin(false)
            }
        });
    }
    
  return (
    <form onSubmit={signUpHandler}  className='container text-center'>
        <button className='btn btn-primary m-2' onClick={addFakeUser}>Sign Up als FakeUser</button>
        <div>
            or Sign Up als new User
            <br />
            User Name:
            <input className="form-control" type="text" name='username' onChange={onChangeHandler}/>
        </div>
        <div>
            Password:
            <input className="form-control" type="text" name='password' onChange={onChangeHandler}/>
        </div>
        <div>
            Email:
            <input className="form-control" type="email" name="email" onChange={onChangeHandler}/>
        </div>
        <div>
            Street:
            <input className="form-control" type="text" name='street' onChange={onChangeHandler}/>
        </div>
        <div>
            City:
            <input className="form-control" type="text" name='city' onChange={onChangeHandler}/>
        </div>
        <div>
            Zip Code:
            <input className="form-control" type="number" name='zipcode' onChange={onChangeHandler}/>
        </div>

        <button className='btn btn-primary m-2' type="submit">Sign up</button>

        
    </form>
  )
}
