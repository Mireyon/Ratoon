import './styles/description.module.css'
import styles from "./styles/authPage.module.css";
import headerImage from './assets/header.png'
import { Cat } from "lucide-react";
import { InformationJoueuseDTO } from "./IInformationJoueuse.ts";
import { getInfoJoueuseAPI } from "./ChatonAPI.tsx";

const JOUEUSES = ['Alice', 'Domitille', 'Marion', 'Rémy', 'Joséphine'];

interface AuthPageProps {
    selectedJoueuse: string,
    setSelectedJoueuse: React.Dispatch<React.SetStateAction<string>>,
    setIsAuthentify: React.Dispatch<React.SetStateAction<boolean>>,
    setInformationJoueuse: React.Dispatch<React.SetStateAction<InformationJoueuseDTO | null>>
}

const AuthPage: React.FC<AuthPageProps> = ({
    selectedJoueuse,
    setSelectedJoueuse,
    setIsAuthentify,
    setInformationJoueuse,
}) => {

    const handleCheckboxChange = (name: string) => {
        setSelectedJoueuse(name);
    };

    const handleValidateJoueuse = async () => {
        if (!selectedJoueuse) {
            console.warn("Aucune joueuse sélectionnée.");
            setIsAuthentify(false);
            return;
        }

        try {
            const infoJoueuse = await getInfoJoueuseAPI(selectedJoueuse);
            setInformationJoueuse(infoJoueuse);
            setIsAuthentify(true);
        } catch (error) {
            console.error("Erreur dans handleValidateJoueuse:", error);
            setIsAuthentify(false);
        }
    };
    
    return (
        <div className={styles.pageContainer}>
            {/* Main Content */}
            <header className={styles.header}>
                <img src={headerImage} alt="Header" className={styles.headerImage} />
            </header>

            <div className={styles.authContainer}>
                <div className={styles.title}>
                    Veuillez sélectionner quelle joueuse vous êtes :
                </div>
                <div className={styles.imageGridContainer}>
                    {/* Top center image */}
                    <img src="https://picsum.photos/200/300" alt="Top" className={styles.topImage} />

                    {/* 2x2 grid images */}
                    <div className={styles.imageGrid}>
                        <div className={styles.imageBox}>
                            <img src="https://picsum.photos/200/300" alt="Grid 1" />
                        </div>
                        <div className={styles.imageBox}>
                            <img src="https://picsum.photos/200/300" alt="Grid 2" />
                        </div>
                        <div className={styles.imageBox}>
                            <img src="https://picsum.photos/200/300" alt="Grid 3" />
                        </div>
                        <div className={styles.imageBox}>
                            <img src="https://picsum.photos/200/300" alt="Grid 4" />
                        </div>
                    </div>
                </div>


                {/* <div className="joueusesList">
                    {JOUEUSES.map((joueuse) =>
                        <div key={joueuse} style={{ display: 'flex', gap: '1rem', padding: '0.7rem 0' }}>
                            <input
                                type="checkbox"
                                className={styles.checkboxButton}
                                id={joueuse}
                                checked={selectedJoueuse.includes(joueuse)}
                                onChange={() => handleCheckboxChange(joueuse)}
                            />
                            <span>{joueuse}</span>
                        </div>)
                    }
                </div>
                <div>
                    <button onClick={handleValidateJoueuse} className={styles.button}>
                        <span className={styles.buttonContent}>
                            Valider qui je suis <span className={styles.cat}><Cat size={20} /></span>
                        </span>
                    </button>
                </div> */}
            </div>

            {/* Optional Footer */}
            {/* <footer className={styles.footer}>
                <p>© 2025 Les Chatonnes</p>
            </footer> */}
        </div>
    );
};

export default AuthPage;
