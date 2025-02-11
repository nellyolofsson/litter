import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        let ws;
    
        const connectWebSocket = () => {
            console.log('WebSocket connecting...');
            const ws = new WebSocket('wss://cscloud8-229.lnu.se/api/v2/ws'); // Replace with your WebSocket server URL
            setSocket(ws);
    
            // Hantera meddelanden
            ws.onmessage = (event) => {
                console.log('Received message:', event.data);
                // Hantera specifika signaler här, t.ex., uppdatera UI
            };
    
            // Hantera WebSocket-stängning
            ws.onclose = () => {
                console.log('WebSocket closed');
                setSocket(null);
    
                // Försök att återansluta efter en kort stund
                setTimeout(() => connectWebSocket(), 5000); // Försök igen efter 5 sekunder
            };
    
            // Hantera fel
            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                ws.close(); // Stäng vid fel för att undvika loop
            };
        };
    
        if (user) {
            connectWebSocket();
        }
    
        // Städa upp när komponenten demonteras eller när användaren loggar ut
        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [user]);

    return (
        <WebSocketContext.Provider value={{ socket }}>
            {children}
        </WebSocketContext.Provider>
    );
};
