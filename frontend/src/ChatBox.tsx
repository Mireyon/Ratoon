import { useEffect, useState, useRef } from 'react';
import { sendPrivateMessage, canSendMessage } from './chat';
import styles from './styles/chatBox.module.css';

// List of players from AuthPage
const PLAYERS = ['Joséphine', 'Alice', 'Domitille', 'Marion', 'Rémy'];

// Interface for chat messages
interface ChatMessage {
  sender: string;
  recipient: string;
  content: string;
  timestamp?: string;  // Optional timestamp from server
  clientId?: string;   // Client-generated ID to prevent duplicates
}

interface ChatBoxProps {
  currentUser: string;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  connectionStatus: boolean;
  processedMessageIds: React.RefObject<Set<string>>;
}

const ChatBox = ({ 
  currentUser, 
  messages, 
  setMessages, 
  connectionStatus, 
  processedMessageIds 
}: ChatBoxProps) => {
    const [filteredMessages, setFilteredMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [recipient, setRecipient] = useState("");
    const [availableRecipients, setAvailableRecipients] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    // Scroll to bottom when messages change
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
      scrollToBottom();
    }, [filteredMessages]);
    
    // Update filtered messages whenever messages or recipient changes
    useEffect(() => {
      if (recipient) {
        const filtered = messages.filter(message => 
          (message.sender === recipient && message.recipient === currentUser) || 
          (message.sender === currentUser && message.recipient === recipient)
        );
        setFilteredMessages(filtered);
      } else {
        setFilteredMessages([]);
      }
    }, [messages, recipient, currentUser]);
    
    useEffect(() => {
      if (!currentUser) return;
      
      // Filter out current user from recipients list
      setAvailableRecipients(PLAYERS.filter(player => player !== currentUser));
      
    }, [currentUser]);

    // Get the latest message for each user to show preview
    const getLatestMessagePreview = (user: string) => {
      const userMessages = messages.filter(m => 
        (m.sender === user && m.recipient === currentUser) || 
        (m.sender === currentUser && m.recipient === user)
      );
      
      if (userMessages.length === 0) return null;
      
      // Sort by timestamp (assuming newer messages are at higher indices)
      const latestMessage = userMessages[userMessages.length - 1];
      const preview = latestMessage.content.length > 15 
        ? `${latestMessage.content.substring(0, 15)}...` 
        : latestMessage.content;
      
      return preview;
    };

    // Count unread messages (simple implementation)
    const getUnreadCount = (_user: string) => {
      // This is a placeholder. In a real app, you'd track read/unread state
      return 0;
    };

    const handleSend = () => {
      if (!canSendMessage()) {
        alert("Not connected to chat yet. Please wait...");
        return;
      }
    
      if (recipient && input) {
        // Generate client ID for this message
        const clientId = `${currentUser}-${recipient}-${input}-${Date.now()}`;
        
        const success = sendPrivateMessage(currentUser, recipient, input, clientId);
        if (success) {
          // Create the message object
          const newMessage = { 
            sender: currentUser, 
            recipient, 
            content: input, 
            clientId 
          };
          
          // Mark this message as processed to avoid duplication when received from server
          if (processedMessageIds.current) {
            processedMessageIds.current.add(clientId);
          }
          
          // Add to messages
          setMessages(prevMessages => [...prevMessages, newMessage]);
          setInput("");
        } else {
          alert("Failed to send message. Please try again.");
        }
      } else {
        alert("Please enter both recipient and message");
      }
    };

    return (
      <div className={styles.chatContainer}>
        {/* Left panel with user list */}
        <div className={styles.usersPanel}>
          <div className={styles.panelHeader}>
            Contacts
            <span className={connectionStatus ? styles.connected : styles.disconnected}>
              {connectionStatus ? "✓" : "⚠"}
            </span>
          </div>
          
          {availableRecipients.map((user) => (
            <div 
              key={user}
              onClick={() => setRecipient(user)}
              className={`${styles.userItem} ${recipient === user ? styles.activeUser : ''}`}
            >
              <div className={styles.userName}>{user}</div>
              
              {getLatestMessagePreview(user) && (
                <div className={styles.messagePreview}>
                  {getLatestMessagePreview(user)}
                </div>
              )}
              
              {getUnreadCount(user) > 0 && (
                <div className={styles.unreadBadge}>
                  {getUnreadCount(user)}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Right panel with chat */}
        <div className={styles.chatPanel}>
          {/* Chat header */}
          <div className={styles.chatHeader}>
            {recipient || "Select a recipient"}
          </div>
          
          {/* Messages area */}
          <div className={styles.messagesArea}>
            {recipient ? (
              filteredMessages.length > 0 ? (
                filteredMessages.map((m, i) => (
                  <div 
                    key={i} 
                    className={`${styles.messageBlock} ${
                      m.sender === currentUser ? styles.sentMessage : styles.receivedMessage
                    }`}
                  >
                    <strong>{m.sender}</strong>: {m.content}
                  </div>
                ))
              ) : (
                <div className={styles.noMessages}>
                  No messages yet with {recipient}
                </div>
              )
            ) : (
              <div className={styles.noMessages}>
                Select a contact to start chatting
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className={styles.inputArea}>
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className={styles.messageInput}
              disabled={!recipient}
            />
            <button 
              onClick={handleSend} 
              disabled={!recipient || !input || !connectionStatus}
              className={!recipient || !input || !connectionStatus ? styles.sendButtonDisabled : styles.sendButton}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
};

export default ChatBox;
