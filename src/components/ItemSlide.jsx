import React from 'react'

const ItemSlide = ({name, email, body}) => {

    const avatar = email.slice(0,2).toUpperCase()

    return (
        <div className='comment-container'>
            <div className='comment-content'>
                <div className='avatar'>{avatar}</div>
            </div>
        
            <div>
                <div className='name'>{name}</div>
                <div className='body'>{body}</div>
                <div className='email'>{email}</div>
            </div> 
        </div>
    )
}

export default ItemSlide