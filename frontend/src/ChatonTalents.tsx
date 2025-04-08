import styles from './styles/talents.module.css';
import {InformationJoueuseDTO} from "./IInformationJoueuse.ts";

interface ChatonTalentsProps {
    informationJoueuse?: InformationJoueuseDTO | null
    setInformationJoueuse: React.Dispatch<React.SetStateAction<InformationJoueuseDTO | null>>
}


const ChatonTalents: React.FC<ChatonTalentsProps> = ({informationJoueuse, setInformationJoueuse}) => {
    // Fonction pour gérer la sélection/désélection des checkboxes
    const handleCheckboxChange = (id: string) => {
        const updatedSelectedChatons = informationJoueuse?.talents.includes(id)
            ? informationJoueuse?.talents.filter((chatonId) => chatonId !== id)
            : [...(informationJoueuse?.talents || []), id];
        if (informationJoueuse) {

            setInformationJoueuse({
                ...informationJoueuse,
                talents: updatedSelectedChatons
            });
        }
    };


    const talentsLeftList = [
        "Bouger son popotin", "Bricoler des trucs et des machins", "Connaître les lois et les légendes", "Connaître les pays et les peuples",
        "Convaincre et baratiner", "Cueuillir et chasser", "Cuisiner", "Dessiner et peindre", "Faire de la musique", "Faire les poches",
        "Feuler et menacer", "Griffer"
    ];
    const talentsRightList = [
        "Herboriser", "Lire et écrire", "Lire le ciel et les étoiles", "Observer et fouiller", "Rester calme et impassible", "S'occuper des bêtes",
        "Se cacher dans les ombres", "Se déplacer en silence", "Séduire et charmer", "Soigner blessures et maladies", "Trouver son chemin", "Trouver une information"
    ];

    return (
        <>
            <div className={`${styles.container} ${styles.title}`}>Talents</div>
            <div className={styles.container}>
                <div className={styles.infoContainer}>
                    {
                        talentsLeftList.map((description) =>
                            <div key={description} style={{display: 'flex'}}>
                                <input
                                    type="checkbox"
                                    className={styles.checkboxButton}
                                    id={description}
                                    checked={informationJoueuse?.talents.includes(description)} // Si "chaton1" est dans le tableau, il est coché
                                    onChange={() => handleCheckboxChange(description)}
                                />
                                <span>{description}</span>
                            </div>)
                    }
                </div>
                <div className={styles.infoContainer}>
                    {
                        talentsRightList.map((description) =>
                            <div key={description} style={{display: 'flex'}}>
                                <input
                                    type="checkbox"
                                    className={styles.checkboxButton}
                                    id={description}
                                    checked={informationJoueuse?.talents.includes(description)} // Si "chaton1" est dans le tableau, il est coché
                                    onChange={() => handleCheckboxChange(description)}
                                />
                                <span>{description}</span>
                            </div>)
                    }
                </div>
            </div>
        </>
    );
};

export default ChatonTalents;
