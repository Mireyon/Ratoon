import './styles/App.module.css';
import React, {useEffect, useState} from "react";
import styles from './styles/App.module.css';
import {InformationJoueuseDTO} from "./IInformationJoueuse.ts";
import InterfaceMJ from "./InterfaceMJ.tsx";
import InterfaceJoueuse from "./InterfaceJoueuse.tsx";
import AuthPage from "./AuthPage.tsx";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import { putInfoJoueuseAPI } from './ChatonAPI.tsx';

const App: React.FC = () => {
    const [selectedJoueuse, setSelectedJoueuse] = useState<string>('');
    const [isAuthentify, setIsAuthentify] = useState<boolean>(false);
    const [informationsJoueuse, setInformationJoueuse] = useState<InformationJoueuseDTO | null>(null);

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
    }
    , [informationsJoueuse]);
        

    return (
        <Router>
            <Routes>
                {/* Page d'authentification et de sélection de la joueuse */}
                <Route path="/" element={
                    !isAuthentify ? (
                        <AuthPage
                            selectedJoueuse={selectedJoueuse}
                            setSelectedJoueuse={setSelectedJoueuse}
                            setInformationJoueuse={setInformationJoueuse}
                            setIsAuthentify={setIsAuthentify}
                        />
                    ) : (
                        // Redirige l'utilisateur après authentification
                        <Navigate to={selectedJoueuse === "Joséphine" ? "/MJ" : "/joueuse"}/>
                    )
                }/>

                {/* Interface de Joséphine - accessible uniquement si elle est authentifiée et sélectionnée */}
                <Route path="/MJ" element={
                    isAuthentify && selectedJoueuse === "Joséphine" ? (
                        <div className={styles.authContainer}>
                            <InterfaceMJ/>
                        </div>
                    ) : (
                        <Navigate to="/"/> // Redirige vers la page de sélection si non authentifié ou mauvaise joueuse
                    )
                }/>

                {/* Interface de la joueuse - accessible à toutes sauf Joséphine */}
                <Route path="/joueuse" element={
                    isAuthentify && selectedJoueuse && selectedJoueuse !== "Joséphine" ? (
                        <InterfaceJoueuse informationsJoueuse={informationsJoueuse}
                                          setInformationJoueuse={setInformationJoueuse}/>
                    ) : (
                        <Navigate to="/"/> // Si aucune joueuse n'est sélectionnée, redirige vers la page de sélection
                    )
                }/>
            </Routes>
        </Router>
    );
}

export default App;