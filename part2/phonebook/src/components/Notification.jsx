

const Notification = ({ message,estate }) => {
    if ( message === null){
        return null
    }else if(estate==="success"){
        return ( <div className='success'>
            {message}
        </div>)
    }else if(estate==="error"){
         return ( <div className='error'>
            {message}
        </div>)
    }
}

export default Notification