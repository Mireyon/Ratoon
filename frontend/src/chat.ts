import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

const MVN_API_URL = import.meta.env.VITE_MVN_API_URL;

let isConnected = false;
let onMessageCallback: ((msg: { sender: string; recipient: string; content: string; timestamp?: string; clientId?: string }) => void) | null = null;
let stompClient: Client;
let currentUsername: string = '';

// Initialize STOMP client
const initializeStompClient = () => {
  const socket = new SockJS(`${MVN_API_URL}/chat`);
  
  stompClient = new Client({
    webSocketFactory: () => socket,
    debug: (str) => console.log('[WebSocket]', str),
    reconnectDelay: 5000,
  });

  stompClient.onConnect = () => {
    isConnected = true;
    console.log('Connected to WebSocket');

    if (currentUsername) {
      // Subscribe to topic-based messages for this user rather than user-specific destination
      stompClient.subscribe(`/topic/user.${currentUsername}`, (message) => {
        const chatMessage = JSON.parse(message.body);
        console.log('Message received from topic:', chatMessage);

        if (onMessageCallback) {
          onMessageCallback(chatMessage);
        }
      });
      
      // Subscribe to a debug topic to see all messages (for development only)
      stompClient.subscribe('/topic/debug', (message) => {
        console.log('Debug message:', JSON.parse(message.body));
      });
      
      console.log(`Subscribed to topics for user: ${currentUsername}`);
    } else {
      console.warn("No username provided for subscription");
    }
  };

  stompClient.onStompError = (frame) => {
    console.error("STOMP error:", frame);
  };

  stompClient.onWebSocketClose = () => {
    isConnected = false;
    console.warn("WebSocket connection closed.");
  };
};

// Function to connect to WebSocket with message handler
export const connectChat = (onMessage: (msg: { sender: string; recipient: string; content: string; timestamp?: string; clientId?: string }) => void, username: string) => {
  onMessageCallback = onMessage;
  currentUsername = username;
  
  console.log(`Connecting chat as user: ${username}`);
  
  // Initialize the client if it hasn't been created yet
  if (!stompClient) {
    initializeStompClient();
  } else if (stompClient.connected) {
    // If already connected but username changed, reconnect with new subscription
    console.log("Reconnecting with new username:", username);
    stompClient.deactivate();
    setTimeout(() => {
      initializeStompClient();
      stompClient.activate();
    }, 500);
    return;
  }
  
  // Only activate if not already connected
  if (!stompClient.connected) {
    stompClient.activate();
  }
};

// Function to check connection status
export const canSendMessage = () => isConnected && stompClient?.connected;

// Function to send private message
export const sendPrivateMessage = (sender: string, recipient: string, content: string, clientId?: string) => {
  if (!isConnected || !stompClient?.connected) {
    console.warn("Cannot send: STOMP not connected yet.");
    return false;
  }

  const msg = { sender, recipient, content, clientId };
  console.log("Sending private message:", msg);
  
  stompClient.publish({
    destination: '/app/sendPrivateMessage',
    body: JSON.stringify(msg),
  });
  
  return true;
};
