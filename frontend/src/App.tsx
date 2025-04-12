import './styles/App.module.scss';
import React, {useEffect, useState} from "react";
import {InformationJoueuseDTO} from "./IInformationJoueuse.ts";
import InterfaceMJ from "./InterfaceMJ.tsx";
import InterfaceJoueuse from "./InterfaceJoueuse.tsx";
import AuthPage from "./AuthPage.tsx";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {putInfoJoueuseAPI} from './ChatonAPI.tsx';

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
    }, [informationsJoueuse, selectedJoueuse]);

    return (
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
                            <div>
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