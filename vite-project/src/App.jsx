import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

function App() { 
  const[socket, setSocket] = useState()
  const[inputMessage, setInputMessage] = useState()
  const[mensajesRecibidos, setMensajeRecibido] = useState([])

  //Actualizar el estado del socket cada vez que se conecta o desconecta
  useEffect(() => {
    const newSocket = io('localhost:3000')
    setSocket(newSocket)

    newSocket.on('message', (msg) => {
      setMensajeRecibido(msg)
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])

  const handleSubmit = (e) => {

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
      <ul>
        {
        mensajesRecibidos.map(mensaje => <li>{mensaje}</li>)
        }
      </ul>
    </div>
  )
}

export default App