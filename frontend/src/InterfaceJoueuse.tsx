import './styles/description.module.css'
import verticalBackgroundImage from './assets/vertical_background.png'
import styles from "./styles/interfaceJoueuse.module.css";
import ChatonDescription from "./ChatonDescription.tsx";
import ChatonQualites from "./ChatonQualites.tsx";
import ChatonTalents from "./ChatonTalents.tsx";
import ChatonGrimoire from "./ChatonGrimoire.tsx";
import ChatonSacVoyage from "./ChatonSacVoyage.tsx";
import Experience from "./Experience.tsx";
import {InformationJoueuseDTO} from "./IInformationJoueuse.ts";
import { useState, useEffect, useRef } from "react";
import { MessageCircle } from 'lucide-react';
import ChatBox from './ChatBox.tsx';
import { connectChat, canSendMessage } from './chat';

interface InterfaceJoueuseProps {
    informationsJoueuse?: InformationJoueuseDTO | null
    setInformationJoueuse: React.Dispatch<React.SetStateAction<InformationJoueuseDTO | null>>
}

interface ChatMessage {
  sender: string;
  recipient: string;
  content: string;
  timestamp?: string;
  clientId?: string;
}

const InterfaceJoueuse: React.FC<InterfaceJoueuseProps> = ({informationsJoueuse, setInformationJoueuse}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [connectionStatus, setConnectionStatus] = useState(false);
    const connectionAttempts = useRef(0);
    const processedMessageIds = useRef<Set<string>>(new Set());
    const currentUser = informationsJoueuse?.nomJoueuse || '';

    // Effect to disable scrolling when modal is open
    useEffect(() => {
        if (isModalOpen) {
            // Disable scrolling on the body
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scrolling when modal is closed
            document.body.style.overflow = 'auto';
        }
        
        // Cleanup function to ensure scrolling is re-enabled when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    // Establish chat connection as soon as the component mounts
    useEffect(() => {
        if (!currentUser) return;
        
        const handleNewMessage = (newMessage: ChatMessage) => {
            // Generate a unique ID for the message if it doesn't have one
            const messageId = newMessage.clientId || 
                             `${newMessage.sender}-${newMessage.recipient}-${newMessage.content}-${newMessage.timestamp || Date.now()}`;
            
            // Check if this message has been processed before
            if (processedMessageIds.current.has(messageId)) {
                return;
            }
            
            // Add to processed set
            processedMessageIds.current.add(messageId);
            
            // Only add if message is relevant to current user
            if (newMessage.sender === currentUser || newMessage.recipient === currentUser) {
                setMessages((prevMessages) => [...prevMessages, {...newMessage, clientId: messageId}]);
            }
        };
        
        // Connect to chat when the component mounts
        connectChat(handleNewMessage, currentUser);
        console.log(`Initiated chat connection for user: ${currentUser}`);
        
        // Check connection status periodically
        const intervalId = setInterval(() => {
            const connected = canSendMessage();
            setConnectionStatus(connected);
            
            // If not connected after multiple attempts, try reconnecting
            if (!connected) {
                connectionAttempts.current += 1;
                if (connectionAttempts.current > 5) {
                    console.log("Attempting to reconnect chat...");
                    connectChat(handleNewMessage, currentUser);
                    connectionAttempts.current = 0;
                }
            } else {
                connectionAttempts.current = 0;
            }
        }, 2000);
        
        return () => {
            clearInterval(intervalId);
        };
    }, [currentUser]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.appContainer}>
            <img src={verticalBackgroundImage} alt="Background" className={styles.backgroundImage}/>
            <div className={styles.insideContainer}>
                <ChatonDescription informationJoueuse={informationsJoueuse}/>
                <ChatonQualites informationJoueuse={informationsJoueuse} setInformationJoueuse={setInformationJoueuse}/>
                <ChatonTalents informationJoueuse={informationsJoueuse} setInformationJoueuse={setInformationJoueuse}/>
                <ChatonGrimoire informationJoueuse={informationsJoueuse} setInformationJoueuse={setInformationJoueuse}/>
                <ChatonSacVoyage informationJoueuse={informationsJoueuse} setInformationJoueuse={setInformationJoueuse}/>
                <Experience informationJoueuse={informationsJoueuse} setInformationJoueuse={setInformationJoueuse}/>
            </div>
            
            {/* Chat Button with connection status indicator */}
            <div className={styles.chatButtonContainer}>
                <span className={`${styles.connectionIndicator} ${connectionStatus ? styles.connected : styles.disconnected}`}></span>
                <button className={styles.chatButton} onClick={openModal}>
                    <MessageCircle size={60}/>
                </button>
            </div>
            
            {/* Chat Modal */}
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h3>Chat</h3>
                            <button className={styles.closeButton} onClick={closeModal}>×</button>
                        </div>
                        <div className={styles.modalBody}>
                            <ChatBox 
                                currentUser={currentUser} 
                                messages={messages} 
                                setMessages={setMessages}
                                connectionStatus={connectionStatus}
                                processedMessageIds={processedMessageIds}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterfaceJoueuse;
