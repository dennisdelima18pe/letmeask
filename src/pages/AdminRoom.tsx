import { useNavigate, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import { Button } from '../components/Button'
import '../styles/room.scss'
import RoomCode from '../components/RoomCode';
import useAuth from '../hooks/useAuth';
import { database } from '../services/firebase';
import Question from '../components/Question';
import useRoom from '../hooks/useRoom';

type roomProps = {
 id:string;

}


const AdminRoom = ()=>{

  let navigate = useNavigate();
  const {user} = useAuth()
  const params = useParams<roomProps>() 
  const roomId = params.id
  const {title,questions } = useRoom(String(roomId)) 


 const handleDeleteQuestion = async (questionId:string)=>{

  if(window.confirm("Tem deseja que deseja excluir essa pergunta ?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
  }
 } 
 const  handleEndRoom = async ()=>{
   await database.ref(`rooms/${roomId}`).update({
    endedAt:new Date()
    })
  navigate('/')
 }
 
  const handleCheckQuestionAsAnswered = async (questionId:string)=>{
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered:true
     })

  }

   const handleHighlightQuestion = async (questionId:string)=>{
     await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted:true
     })
  }

 return (
    <div id="page-room">
     <header>
      <div className="content">
        <img src={logoImg}  alt="letmeask"/>
        <div>   
        <RoomCode code={String(roomId)}/>
        <Button isOutilened onClick={handleEndRoom}>Encerrar Sala</Button>
        </div>
     </div>
    </header>
    <main className='content'>
      <div className='room-title'>
        <h1>Sala {title}</h1>
       {questions.length > 0 && <span>{questions.length}</span>}
      </div>
      <div className='question-list'>
        {questions.map(question => (
          <Question
           key={question.id}
           content={question.content}
           author={question.author}
           isAnswered={question.isAnswered}
           isHighlighted={question.isHighlighted}
            > 
              {!question.isAnswered &&
                <>  
                  <button onClick={()=> handleCheckQuestionAsAnswered(question.id)}>
                    <img src={checkImg} alt="Marcar pergunta como respondida"/>
                  </button> 
                  <button onClick={()=> handleHighlightQuestion(question.id)}>
                    <img src={answerImg} alt="Remover pergunta"/>
                  </button>
                </>  
                }
             <button onClick={()=> handleDeleteQuestion(question.id)}>
               <img src={deleteImg} alt="Remover pergunta"/>
              </button>
          </Question>
          ))}
      </div>
    </main>
   </div>
 )
}
export default AdminRoom