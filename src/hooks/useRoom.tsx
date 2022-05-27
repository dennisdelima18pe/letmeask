import { useState,useEffect} from 'react';
import { database } from '../services/firebase';
import { useParams } from 'react-router-dom';
import useAuth from './useAuth';


type roomProps = {
 id:string;

}

type FirebaseQuestions = Record<string,{
  author:{
    name:string;  
    avatar:string;
  }
  content:string;
  isAnswered:boolean;
  isHighlighted:boolean;
  likes:Record<string,{
    authorId:string
  }>
}>


type Question = {
 id:string;
 author:{
  name:string;  
  avatar:string;
 }
 content:string;
 isAnswered:boolean;
 isHighlighted:boolean;
 likeCount:number;
 likeId:string | undefined; 
}

const useRoom = (roomId:string)=>{

   const { user }  = useAuth() 
 
   const [questions,setQuestions] = useState<Question[]>([])
   const [title,setTitle] = useState('')
  
   useEffect(()=>{

    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value',room =>{
      const databaseRoom = room.val()

      const firebaseQuestions:FirebaseQuestions = databaseRoom.questions  
    
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key,value]) => {

        return {
          id:key,
          content:value.content,
          author:value.author,
          isHighlighted:value.isHighlighted,
          isAnswered:value.isAnswered,
          likeCount:Object.values(value.likes ?? {}).length,
          likeId:Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0],    
          }
        })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions);
      })
    return ()=>{
      roomRef.off('value')
      }
  },[roomId,user?.id])

 return {
    questions,title
    }
}

export default useRoom