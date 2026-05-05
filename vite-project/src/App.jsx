import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

function App() { 
  const[socket, setSocket] = useState()
  const[inputMessage, setInputMessage] = useState()

  //Actualizar el estado del socket cada vez que se conecta o desconecta
  useEffect(() => {
    const newSocket = io('localhost:3000')
    setSocket(newSocket)
    return () => {
      newSocket.disconnect()
    }
  }, [])

  const handleSubmit = () => {
    //Enviar el mensaje al servidor a través del socket
    e.preventDefault()
    if(socket) {
      socket.emit('message', inputMessage)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Escribe un mensaje..." 
        onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={handleSubmit}>Enviar</button>
      </form>
    </div>
  )
}

export default App