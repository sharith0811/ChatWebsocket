import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

function App() { 
  const[socket, setSocket] = useState()
  
  //Actualizar el estado del socket cada vez que se conecta o desconecta
  useEffect(() => {
    const newSocket = io('localhost:3000')

    return () => {
      newSocket.disconnect()
    }
  }, [])

  return (
    <div>
      <form>
        <input type="text" placeholder="Escribe un mensaje..." />
        <button>Enviar</button>
      </form>
    </div>
  )
}

export default App