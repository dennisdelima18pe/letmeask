import { AuthContext } from '../context/AuthContext';
import {useState } from 'react'
import {Link } from 'react-router-dom'
import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import '../styles/noow_row.scss'
import { Button } from '../components/Button'
import useAuth from '../hooks/useAuth';
import {FormEvent} from 'react'
import { database } from '../services/firebase';
import { useNavigate } from "react-router-dom";

 const NewRoom = ()=>{

  const {user} = useAuth()

  const [newRoom,setNewRoom] = useState('')    
  let navigate = useNavigate();


  const handleCreateRoom = async (event:FormEvent)=>{
    event.preventDefault()

    if(newRoom.trim() === ''){
        return;
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
     title:newRoom,
     authorId:user?.id
    })
    navigate(`/rooms/${firebaseRoom.key}`)
   }


    return (
        <div id='new-room'>
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />    
                <strong>Crie salas de Q&a ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
             <div className='main-content'>
             <img src={logoImg} alt="Leatmeask"/>
             <h1>{user?.name}</h1>
             <h2>
                Crie sua sala com o Google 
             </h2>
             <form onSubmit={handleCreateRoom}>
                <input type="text" placeholder="Nome da sala" value={newRoom} onChange={(e)=> setNewRoom(e.target.value)} />
                <Button type='submit'>Criar sala</Button>
             </form>
             <p>
                Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
             </p>
             </div>
            </main>
        </div>
    )
}
export default NewRoom