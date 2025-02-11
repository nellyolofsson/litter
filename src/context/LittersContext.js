import React, { createContext, useState, useEffect, useContext } from 'react';
import { WebSocketContext } from './WebsocketContext';
import { AuthContext } from './AuthContext';

export const LittersContext = createContext();

export const LittersProvider = ({ children }) => {
    const [litters, setLitters] = useState([]);
    const { socket } = useContext(WebSocketContext); // Anslut till WebSocketContext
    const { token } = useContext(AuthContext);

    useEffect(() => {
        if (!token) return; // Avoid fetch if token is not available

        const fetchLitters = async () => {
            try {
                const response = await fetch('https://cscloud8-229.lnu.se/api/v2/litter/litters', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch litters');

                const data = await response.json();
                setLitters(data);
            } catch (error) {
                console.error('Error fetching litters:', error);
            }
        };

        fetchLitters();
    }, [token]); // Trigger only when token changes

    // Hantera inkommande WebSocket-meddelanden
    useEffect(() => {
        if (socket) {
            const onMessage = (event) => {
                try {
                    const parsedData = JSON.parse(event.data);
                    console.log('Received WebSocket message:', parsedData);

                    if (parsedData.event === 'new_litter') {
                        console.log('New litter received:', parsedData.data);
                        addLitter(parsedData.data);
                    }
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                }
            };

            socket.addEventListener('message', onMessage);

            // Rensa upp WebSocket-lyssnaren vid unmount
            return () => {
                socket.removeEventListener('message', onMessage);
            };
        }
    }, [socket]);

    // Funktion för att lägga till en ny litter
    const addLitter = (newLitter) => {
        console.log('Adding new litter:', newLitter);
        setLitters((prevLitters) => [newLitter, ...prevLitters]);
    };

        // Function to update an existing litter
        const updateLitter = (id, newDescription) => {
            setLitters((prevLitters) => {
                return prevLitters.map((litter) =>
                    litter.id === id ? { ...litter, description: newDescription } : litter
                );
            });
        };
    
        // Function to delete a litter
        const deleteLitter = (id) => {
            setLitters((prevLitters) => prevLitters.filter((litter) => litter.id !== id));
        };

    return (
        <LittersContext.Provider value={{ litters, addLitter, updateLitter, deleteLitter }}>
            {children}
        </LittersContext.Provider>
    );
};
