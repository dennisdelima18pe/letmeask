import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import {FormEvent} from 'react'
import useAuth from '../hooks/useAuth'
import { database } from '../services/firebase'
 const Home = ()=>{
    
  let navigate = useNavigate();

  const {user,signInWithGoogle} = useAuth()
  const [roomCode,setRoomCode] = useState('')
  

  const handleCreateRoom = async()=>{
    if(!user){
     await signInWithGoogle()
     }
     navigate('/rooms/new')
    }

    const handleJoinRoom = async (event:FormEvent)=>{
     event.preventDefault()
      if(roomCode.trim() === ''){
        return;
       }
      const rooomRef = await database.ref(`rooms/${roomCode}`).get()
     if(!rooomRef.exists()){
        alert('Room does not exists')
        return;
     }
    if(rooomRef.val().endedAt){
        window.alert("Room alredy Closed.")
    }

     navigate(`rooms/${roomCode}`)   

    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />    
                <strong>Crie salas de Q&a ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
             <div className='main-content'>
             <img src={logoImg} alt="Leatmeask"/>
             <button className='create-room' onClick={handleCreateRoom}>
               <img src={googleIconImg} alt="Logo do Google"/>
               <h2>
                 Crie sua sala com o Google
              </h2>
             </button>
             <div className='separator'>Ou entre em uma sala</div>
             <form onSubmit={handleJoinRoom}>
                <input type="text" placeholder="Digite o código da sala" value={roomCode} onChange={(event)=> setRoomCode(event.target.value)}/>
                <Button type='submit'>Entrar na sala</Button>
             </form>
             </div>
            </main>
        </div>
    )
}
export default Home 