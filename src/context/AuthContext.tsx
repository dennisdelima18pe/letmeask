import React,{useState,createContext,ReactNode,useEffect} from 'react';
import {auth,firebase} from '../services/firebase'

type AuthContextProviderProps = {
 children:ReactNode
}
type User = {
  id:string;
  name:string;
  photo:string
  
}
type AuthContextType = {
 user:User|undefined;
 signInWithGoogle:()=> Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType)

const AuthContextProvider = ({children}:AuthContextProviderProps)=>{
const [user,setUser] = useState<User>()  

 useEffect(()=>{
  const unsubscrive = auth.onAuthStateChanged( user =>{
  if(user){
   const {displayName,photoURL,uid} = user 
   if(!displayName || !photoURL){
        throw new Error('Missing information from Google Account.')
   }
    setUser({
     id:uid,
     name:displayName,
     photo:photoURL
    }
   )
  }
  })
  return ()=>{
     unsubscrive()
  }
  },[])

 const signInWithGoogle = async () => {

  const provider = new firebase.auth.GoogleAuthProvider()

  const result = await auth.signInWithPopup(provider)

  if(result.user){
   const {displayName,photoURL,uid} = result.user 
   if(!displayName || !photoURL){
        throw new Error('Missing information from Google Account.')
   }
    setUser({
     id:uid,
     name:displayName,
     photo:photoURL
    }
   )
  }
 }

  return (
    <AuthContext.Provider value={{user,signInWithGoogle}}>
        {children}
    </AuthContext.Provider>
  )
}
export default AuthContextProvider