import styles from "./styles/interfaceMJ.module.scss";
import verticalBackgroundImage from "./assets/vertical_background_old.png";
import receivePiou from "./assets/receivePiou.jpg";
import waitingPiou from "./assets/waitingPiou.jpg";
import {useEffect, useRef, useState} from "react";
import {canSendMessage, connectChat, reconnectChat} from "./chat.ts";
import ChatBox from "./ChatBox.tsx";
import {Cat, MessageCircle} from "lucide-react";

interface ChatMessage {
    sender: string;
    recipient: string;
    content: string;
    timestamp?: string;
    clientId?: string;
    read?: boolean;
}

const InterfaceMJ = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState(false);
    const processedMessageIds = useRef<Set<string>>(new Set());
    const currentUser = 'Joséphine';
    const lastConnectionCheck = useRef<number>(Date.now());

    // Effect to disable scrolling when modal is open
    useEffect(() => {
        if (isModalOpen) {
            // Disable scrolling on the body
            document.body.style.overflow = 'hidden';

            // Mark all messages as read when modal is opened
            if (hasUnreadMessages) {
                setMessages(prevMessages =>
                    prevMessages.map(msg => ({...msg, read: true}))
                );
                setHasUnreadMessages(false);
            }
        } else {
            // Re-enable scrolling when modal is closed
            document.body.style.overflow = 'auto';
        }

        // Cleanup function to ensure scrolling is re-enabled when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen, hasUnreadMessages]);

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
                // Set read status: messages from others are unread; messages sent by current user are read
                const isMessageUnread = newMessage.sender !== currentUser && !isModalOpen;

                // Add the message to state with read status
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {...newMessage, clientId: messageId, read: !isMessageUnread}
                ]);

                // If it's a new incoming message and modal is closed, mark that we have unread messages
                if (isMessageUnread) {
                    setHasUnreadMessages(true);
                }
            }
        };

        // Connect to chat when the component mounts
        connectChat(handleNewMessage, currentUser);
        console.log(`Initiated chat connection for user: ${currentUser}`);

        // Check connection status periodically
        const intervalId = setInterval(() => {
            const now = Date.now();
            const connected = canSendMessage();
            setConnectionStatus(connected);

            // If not connected, attempt to reconnect using our new reconnection system
            if (!connected && (now - lastConnectionCheck.current > 10000)) { // Only try explicit reconnection every 10 seconds
                console.log("WebSocket disconnected, attempting to reconnect...");
                reconnectChat(); // Use our new reconnection function
                lastConnectionCheck.current = now;
            } else if (connected) {
                // Reset last check time when connected
                lastConnectionCheck.current = now;
            }
        }, 2000);

        // Add visibility change listener to reconnect when tab becomes visible again
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                const connected = canSendMessage();
                if (!connected) {
                    console.log("Page became visible, checking WebSocket connection...");
                    reconnectChat();
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [currentUser, isModalOpen]);

    const openModal = () => {
        setIsModalOpen(true);

        // Check and attempt reconnection when opening the chat modal
        if (!connectionStatus) {
            reconnectChat();
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className={styles.appContainer}>
            <img src={verticalBackgroundImage} alt="Background" className={styles.backgroundImage}/>
            <div className={styles.insideContainer}>
                <div className={styles.photoContainer}>
                    {hasUnreadMessages &&
                        <img
                            src={receivePiou}
                            alt="Chaton ou joueuse"
                            className={styles.fullHeightImage}
                        />}
                    {!hasUnreadMessages &&
                        <img
                            src={waitingPiou}
                            alt="Chaton ou joueuse"
                            className={styles.fullHeightImage}
                        />}
                </div>
            </div>
            {/* Chat Button with connection status indicator */}
            <div className={styles.chatButtonContainer}>
                <span
                    className={`${styles.connectionIndicator} ${connectionStatus ? styles.connected : styles.disconnected}`}></span>
                <button className={styles.chatButton} onClick={openModal}>
                    <MessageCircle size={60}/>
                    {hasUnreadMessages && <Cat size={"1.3rem"} className={styles.notificationIcon}/>}
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
                            {/* Automatic reconnection is handled by the useEffect */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default InterfaceMJ;
