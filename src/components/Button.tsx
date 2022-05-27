import {ButtonHTMLAttributes} from 'react'
import '../styles/button.scss'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutilened?:boolean
 
}

export const Button = ({isOutilened = false,...props}:ButtonProps)=>{

    return (
        <button className={`button ${isOutilened ? 'outilined':''}`} {...props}/>
    )
}
