import React, { useEffect, useState, useRef } from 'react'
import { ApiCall } from '../hooks/ApiCall'
import { useAuth } from '../hooks/AuthProvider'
import { AddBox } from '@mui/icons-material'
import axios from 'axios'
require('dotenv').config()
import { CuisineTabs } from '../cuisineownercomponents'
import moment from 'moment'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const GeneralForums = () => {
    const base_url = process.env.BASE_URL
    const [chatRooms, setChatRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const ws = useRef(null);
    const [chatOpen, setChatOpen] = useState(false)
    const [groupedMessages, setGroupedMessages] = useState({})
    const [activeRoom, setActiveRoom] = useState('')

    const messagesEndRef = useRef(null);

    const userAuth = useAuth()
    const {user} = userAuth

    useEffect(() => {
      setGroupedMessages(groupMessagesByDate(messages));
    }, [messages]);

    useEffect(() => {
        axios.get(base_url + 'chatrooms/api/chatrooms/')
            .then(response => {
                setChatRooms(response.data);
            });
    }, []);

    const joinRoom = (room) => {
      setActiveRoom(room)
      setChatOpen(true)
      setCurrentRoom(room);
  
      // Fetch chat history for the room
      axios.get(base_url + `chatrooms/api/chatrooms/${room}/messages/`)
          .then(response => {
              setMessages(response.data)
              
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
          data['timestamp'] = new Date();
          setMessages(prevMessages => [...prevMessages, data]);
      };
  
      ws.current.onclose = (e) => {
          console.log("WebSocket closed:", e);
      };
  
      ws.current.onerror = (e) => {
          console.error("WebSocket error:", e);
      };
  };

    const sendMessage = () => {
      if(message.trim().length === 0) return setMessage('');
        if (ws.current) {
            ws.current.send(JSON.stringify({ message, user:user.username }));
            setMessage('');
        }
    };

    const createRoom = (roomName) => {
        axios.post(base_url + 'chatrooms/api/chatrooms/', { room: roomName })
            .then(response => {
                setChatRooms(prevRooms => [...prevRooms, response.data]);
                
            });
    };

    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    useEffect(() => {
      scrollToBottom();
    }, [groupedMessages]);
  return (
    <div className='w-full h-screen flex justify-around flex-col mt-10 lg:mt-0 content-start pt-2 lg:pt-0 lg:pl-6 items-start'>
      <CuisineTabs />
        <div className='mx-2 lg:mx-3 h-90vh md:flex lg:w-2/3  w-full h-full'>
          <div className={`${chatOpen? 'hidden': 'flex flex-col'} md:flex flex-col md:basis-1/3`}>
            <h1>Chat Rooms</h1>
            <ul>
                {chatRooms.map(room => (
                    <li key={room.id} onClick={() => joinRoom(room.room)} className={`w-full hover:cursor-pointer ${activeRoom === room.room? 'bg-gray-500 text-white shadow-md': 'hover:bg-gray-200'}font-medium md:w-52 pl-2 py-1 rounded-md `}>{room.room}</li>
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
            </div>
              <div className={` ${chatOpen? 'flex': 'hidden'} w-full h-8/10 md:flex flex-col md:basis-3/5 lg:basis-2/3 rounded-md`}>
              {currentRoom? (
                <div className='w-full h-5/6 flex flex-col justify-between pb-4 px-2'>
                  <div className='flex flex-start bg-slate-900 mr-2 rounded-lg text-white items-center w-full py-2 '>
                    <div className='mr-2 ml-1 md:hidden' onClick={() => {
                      setChatOpen(false) 
                      setActiveRoom('')
                      }}>
                      <ArrowBackIcon />
                    </div>
                    <h2 className='text-md font-medium py-1 pl-2'>{currentRoom}</h2>
                  </div>
                  <div className='flex w-full flex-col mx-1'>
                  <div className='overflow-y-auto h-700px overflow-x-hidden'>
                    <div className='flex w-full flex-col mx-1'>
                        {Object.keys(groupedMessages).map((date) => (
                          <div key={date} className='my-1'>
                            <div className='text-md font-semibold text-center mb-1'>{date}</div>
                            <div className={`flex flex-col w-full `}>
                            {groupedMessages[date].map((msg, index) => (
                              <div key={index} className={`flex flex-col p-1 mx-2 mt-1 rounded-lg w-fit max-w-80 ${msg.user === user.username? 'self-end bg-blue-500': 'self-start bg-gray-200'}`}>
                                <p className={`${msg.user === user.username? 'hidden': ''}`}>{msg.user}</p>
                                <div className='flex items-end p-1 mx-2 w-full'>
                                <p className='text-lg break-words whitespace-normal w-2/3 mr-2'>{msg.message}</p>
                                <span className='text-xs text-right w-fit whitespace-nowrap mr-1'>{moment(msg.timestamp).format('h:mm a')}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                      </div>
                      <div className='flex w-full mb-2'>
                        <input
                            className='basis-4/5 border-1 border-gray-900 py-1 rounded-lg px-1'
                            type="text"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button className='basis-1/5 bg-slate-900 text-white py-2 px-3 rounded-lg shadow-md' onClick={sendMessage}>Send</button>
                      </div>
                    </div>
                    </div> 
                
            ) : <p>No open Forum</p>}
            </div>
        </div>

    </div>
  )
}


const groupMessagesByDate = (messages) => {
  const groupedMessages = messages.reduce((acc, msg) => {
    const date = new Date(msg.timestamp);
    const dateString = date.toLocaleDateString(); 
    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    acc[dateString].push(msg);
    return acc;
  }, {});

  // Sort messages within each date
  for (const date in groupedMessages) {
    groupedMessages[date].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  // Convert keys (dates) into an array and sort it
  const sortedDates = Object.keys(groupedMessages).sort((a, b) => new Date(a) - new Date(b));

  // Construct a new object with sorted dates
  const sortedGroupedMessages = {};
  sortedDates.forEach(date => {
    sortedGroupedMessages[date] = groupedMessages[date];
  });

  return sortedGroupedMessages;
};
