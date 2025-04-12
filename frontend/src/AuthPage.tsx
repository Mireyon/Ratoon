import styles from "./styles/authPage.module.scss";
import headerImage from './assets/header.png'
import { Cat } from "lucide-react";
import { InformationJoueuseDTO } from "./IInformationJoueuse.ts";
import { getInfoJoueuseAPI } from "./ChatonAPI.tsx";
import { useState, useEffect } from "react";
import { getImageChatonAPI } from "./ChatonAPI";

const JOUEUSES = ['Josephine', 'Alice', 'Domitille', 'Marion', 'Remy'];

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
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [images, setImages] = useState<(string | null)[]>(Array(JOUEUSES.length).fill(null));


    const handleSelect = (index: number) => {
        if (selectedIndex === index) {
            setSelectedIndex(null); // Deselect if already selected
            setSelectedJoueuse(''); // Reset selectedJoueuse state
            return;
        }
        setSelectedIndex(index); // Select the new index
        setSelectedJoueuse(JOUEUSES[index]); // Update the selectedJoueuse state
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
    
    useEffect(() => {
        const fetchAllImages = async () => {
            try {
                const imagePromises = JOUEUSES.map(async (joueuse) => {
                    const info = await getInfoJoueuseAPI(joueuse);
                    return await getImageChatonAPI(info.imageName);
                });
                const results = await Promise.all(imagePromises);
                setImages(results);
            } catch (error) {
                console.error("Erreur lors du chargement des images :", error);
            }
        };
    
        fetchAllImages();
    }, []);
    

    return (
        <div className={styles.pageContainer}>
            <header className={styles.headerContainer}>
                <img src={headerImage} alt="Header" className={styles.headerImage} />
            </header>

            <div className={styles.authContainer}>
                <div className={styles.title}>
                    Veuillez sélectionner quelle joueuse vous êtes :
                </div>
                <div className={styles.imageGridContainer}>
                    <div className={`${styles.imageBox} ${selectedIndex === 0 ? styles.selected : ''}`} onClick={() => handleSelect(0)}>
                        <img className={styles.characterImage} src={images[0] || "https://via.placeholder.com/200x300"} alt="Grid 1" draggable="false"/>
                    </div>

                    <div className={styles.imageGrid}>
                        <div className={`${styles.imageBox} ${selectedIndex === 1 ? styles.selected : ''}`} onClick={() => handleSelect(1)}>
                            <img className={styles.characterImage} src={images[1] || "https://via.placeholder.com/200x300"} alt="Grid 2" draggable="false"/>
                        </div>
                        <div className={`${styles.imageBox} ${selectedIndex === 2 ? styles.selected : ''}`} onClick={() => handleSelect(2)}>
                            <img className={styles.characterImage} src={images[2] || "https://via.placeholder.com/200x300"} alt="Grid 3" draggable="false"/>
                        </div>
                        <div className={`${styles.imageBox} ${selectedIndex === 3 ? styles.selected : ''}`} onClick={() => handleSelect(3)}>
                            <img className={styles.characterImage} src={images[3] || "https://via.placeholder.com/200x300"} alt="Grid 4" draggable="false"/>
                        </div>
                        <div className={`${styles.imageBox} ${selectedIndex === 4 ? styles.selected : ''}`} onClick={() => handleSelect(4)}>
                            <img className={styles.characterImage} src={images[4] || "https://via.placeholder.com/200x300"} alt="Grid 5" draggable="false"/>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={handleValidateJoueuse} className={styles.button}>
                        <span className={styles.buttonContent}>
                            Valider qui je suis <span className={styles.cat}><Cat size={20} /></span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
