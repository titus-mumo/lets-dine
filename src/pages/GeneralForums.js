import React, { useEffect, useState, useRef } from 'react'
import { ApiCall } from '../hooks/ApiCall'
import { useAuth } from '../hooks/AuthProvider'
import { AddBox } from '@mui/icons-material'
import axios from 'axios'
require('dotenv').config()

//TODO: Forums

export const GeneralForums = () => {
  const base_url = process.env.BASE_URL
  const [chatRooms, setChatRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const ws = useRef(null);

    useEffect(() => {
        axios.get(base_url + 'chatrooms/api/chatrooms/')
            .then(response => {
                setChatRooms(response.data);
            });
    }, []);

    const joinRoom = (room) => {
      setCurrentRoom(room);
  
      // Fetch chat history for the room
      axios.get(base_url + `chatrooms/api/chatrooms/${room}/messages/`)
          .then(response => {
              setMessages(response.data);
          })
          .catch(error => {
              console.error("Error fetching messages:", error);
          });
  
      // Close existing WebSocket connection if there is one
      if (ws.current) {
          ws.current.close();
      }
  
      // Create a new WebSocket connection
      ws.current = new WebSocket(`ws://localhost:8000/ws/chat/${room}/`);
  
      // Define the WebSocket message event handler
      ws.current.onmessage = (e) => {
          const data = JSON.parse(e.data);
          console.log(data)
          setMessages(prevMessages => [...prevMessages, data]);
      };
  
      // Define WebSocket onclose and onerror event handlers for better debugging
      ws.current.onclose = (e) => {
          console.log("WebSocket closed:", e);
      };
  
      ws.current.onerror = (e) => {
          console.error("WebSocket error:", e);
      };
  };

    const sendMessage = () => {
        if (ws.current) {
            ws.current.send(JSON.stringify({ message }));
            setMessage('');
        }
    };

    const createRoom = (roomName) => {
        axios.post(base_url + 'chatrooms/api/chatrooms/', { room: roomName })
            .then(response => {
                setChatRooms(prevRooms => [...prevRooms, response.data]);
            });
    };

  // const [forums, setForums] =useState([])
  // const [loading, setLoading] = useState(true)

  // const userAuth = useAuth()
  
  // const {token, refresh, setRefresh, setToken} = userAuth

  // const getForums = () => {
  //   ApiCall('forums/all', 'get', token, refresh, setToken, setRefresh)
  //   .then(function(response){
  //     if(response.status === 200){
  //       console.log(response.data)
  //       if(response.data.length > 0){
  //         setForums(response.data)
  //       }
  //     }else{
  //       console.log("error fetching forums")
  //     }
  //     setLoading(false)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // }
  // useEffect(() => {
  //   getForums()
  // }, [])
  return (
    <div className='w-full h-screen flex justify-around flex-col-reverse l mt-10 lg:mt-0 content-start pt-2 lg:pt-0'>
      <div className='w-full lg:w-2/3 lg:mt-10 lg:mx-4 mb-5 flex justify-end'>
        <p className='w-9 text-center text-3xl font-semibold rounded-full bg-blue-500 transition hover:scale-125 hover:cursor-pointer'>+</p>
        </div>
        <div>
            <h1>Chat Rooms</h1>
            <ul>
                {chatRooms.map(room => (
                    <li key={room.id} onClick={() => joinRoom(room.room)}>{room.room}</li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Create a new room"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        createRoom(e.target.value);
                        e.target.value = '';
                    }
                }}
            />
            {currentRoom && (
                <div>
                    <h2>Room: {currentRoom}</h2>
                    <div>
                        {messages.map((msg, index) => (
                            <div key={index}>{msg.message}</div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
      {/* <div className='w-full h-screen flex justify-around flex-col '>
      {
        loading? <p className='text-center'>Loading</p>: forums.length === 0? <p className='text-center'>New forums will appear here</p> : forums.map((item, index) => <ForumCard key={index} forum={item} />)
      }
      </div> */}

    </div>
  )
}


const ForumCard = ({forum}) => {
  return(
    <div className='mx-2 w-full rounded-md shadow-md lg:w-2/3 flex items-center'>
      <div className='basis-4/5'>
      <p className='font-medium'>{forum.title}</p>
       <p>{forum.description}</p>
      </div>
      <div className='pr-3 text-right basis-1/5 hover:cursor-pointer'>
        <AddBox />
      </div>
    </div>
  )
}