import './styles/App.module.css';
import React, {useEffect, useState} from "react";
import styles from './styles/App.module.css';
import {InformationJoueuseDTO} from "./IInformationJoueuse.ts";
import InterfaceMJ from "./InterfaceMJ.tsx";
import InterfaceJoueuse from "./InterfaceJoueuse.tsx";
import AuthPage from "./AuthPage.tsx";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import { putInfoJoueuseAPI } from './ChatonAPI.tsx';
import ChatBox from './ChatBox';
import { canSendMessage as checkChatConnection } from './chat';

const App: React.FC = () => {
    const [selectedJoueuse, setSelectedJoueuse] = useState<string>('');
    const [isAuthentify, setIsAuthentify] = useState<boolean>(false);
    const [informationsJoueuse, setInformationJoueuse] = useState<InformationJoueuseDTO | null>(null);
    const [username, setUsername] = useState<string>("user1");  // Default username, could be set from auth

    useEffect(() => {
        const saveInfoJoueuse = async () => {
            if (informationsJoueuse) {
                try {
                    await putInfoJoueuseAPI(selectedJoueuse, informationsJoueuse);
                } catch (error) {
                    console.error("Erreur lors de la sauvegarde des informations de la joueuse :", error);
                }
            }
        };

        saveInfoJoueuse();
    }, [informationsJoueuse]);
    
    // Simple username input for demo purposes (in real app would be from auth)
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    return (
        //     <header className={styles.appHeader || ''}>
        //         <h1>Ratoon Chat</h1>
        //         <div className={styles.connectionStatus || ''} style={{ color: checkChatConnection() ? "green" : "red", margin: "10px 0" }}>
        //             {checkChatConnection() ? "✓ Connected" : "⚠ Connecting..."}
        //         </div>
        //     </header>
        
        //     <div className={styles.userSection || ''} style={{ margin: "20px 0", padding: "10px", backgroundColor: "#f5f5f5" }}>
        //         <label htmlFor="username">Your username: </label>
        //         <input 
        //             id="username"
        //             type="text" 
        //             value={username} 
        //             onChange={handleUsernameChange}
        //             style={{ padding: "8px", marginLeft: "10px" }}
        //         />
        //     </div>
        
        //     <main>
        //         <ChatBox currentUser={username} />
        //     </main>
        
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={
                        !isAuthentify ? (
                            <AuthPage
                                selectedJoueuse={selectedJoueuse}
                                setSelectedJoueuse={setSelectedJoueuse}
                                setInformationJoueuse={setInformationJoueuse}
                                setIsAuthentify={setIsAuthentify}
                            />
                        ) : (
                            <Navigate to={selectedJoueuse === "Josephine" ? "/MJ" : "/joueuse"}/>
                        )
                    }/>

                    <Route path="/MJ" element={
                        isAuthentify && selectedJoueuse === "Josephine" ? (
                            <div className={styles.authContainer}>
                                <InterfaceMJ/>
                            </div>
                        ) : (
                            <Navigate to="/"/>
                        )
                    }/>

                    <Route path="/joueuse" element={
                        isAuthentify && selectedJoueuse && selectedJoueuse !== "Josephine" ? (
                            <InterfaceJoueuse informationsJoueuse={informationsJoueuse}
                                              setInformationJoueuse={setInformationJoueuse}/>
                        ) : (
                            <Navigate to="/"/>
                        )
                    }/>
                </Routes>
            </Router>
           
        </div>
    );
}

export default App;