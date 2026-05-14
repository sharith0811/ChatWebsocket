import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

function App() { 
  const[socket, setSocket] = useState()
  const[inputMessage, setInputMessage] = useState()
  const[mensajesRecibidos, setMensajeRecibido] = useState([])
  const[user, setUser]= useState("")

  //Actualizar el estado del socket cada vez que se conecta o desconecta
  useEffect(() => {
    const newSocket = io('http://192.168.18.161:3000/')
    setSocket(newSocket)

    newSocket.on('message', (msg) => {
      setMensajeRecibido(msg)
    })

    setUser(prompt("Ingrese su nombre"))

    return () => {
      newSocket.disconnect()
    }
  }, [])

  const handleSubmit = (e) => {

    //Enviar el mensaje al servidor a través del socket
    e.preventDefault()
    if(socket) {
      socket.emit('message', {user, inputMessage})
    }
  }

  const formatearHora = (hora) => {
    return new Date(hora).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
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
          //mensaje = {user: "PEPE", inputMessage: "Hola"}
        mensajesRecibidos.map((mensaje, index) => (
          <li key={index}>
            {mensaje.user}: {mensaje.inputMessage} - {formatearHora(mensaje.hora)}
          </li>
        ))
        }
      </ul>
    </div>
  )
}

export default App
