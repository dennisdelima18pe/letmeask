import {auth,firebase} from './services/firebase'
import React,{useState,createContext} from 'react';
import Home from './pages/Home'
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import NewRoom from './pages/NewRoom'
import AuthContextProvider from './context/AuthContext'
import Room from './pages/Room';
import AdminRoom from './pages/AdminRoom';
 
type User = {
  id:String;
  name:String;
  photo:String
  
}
type AuthContextType = {
 user:User|undefined;
 signInWithGoogle:()=> Promise<void>;
}


const  App = () =>{

 

 return (
    <BrowserRouter>
    <AuthContextProvider>
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/rooms/new'  element={<NewRoom />}/>
      <Route path='/rooms/:id' element={<Room />}/>
      <Route path='/admin/rooms/:id' element={<AdminRoom />}/>
      </Routes>
    </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
