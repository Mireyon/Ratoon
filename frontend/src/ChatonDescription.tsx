import styles from './styles/description.module.css'
import {InformationJoueuseDTO} from "./IInformationJoueuse.ts";
import { useEffect, useState } from 'react';
import {getImageChatonAPI} from "./ChatonAPI.tsx";

interface ChatonDescriptionProps {
    informationJoueuse?: InformationJoueuseDTO | null
}

const ChatonDescription: React.FC<ChatonDescriptionProps> = ({informationJoueuse}) => {
    const [imageSrc, setImageSrc] = useState<string>('');

    useEffect(() => {
        const fetchImage = async () => {
            if (informationJoueuse) {
                try {
                    const imageUrl = await getImageChatonAPI(informationJoueuse.imageName);
                    setImageSrc(imageUrl);
                } catch (error) {
                    console.error("Erreur lors de la récupération de l'image :", error);
                }
            }
        };

        fetchImage();
    }
    , [informationJoueuse]);

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={`${styles.box} ${styles.wavyBorder}`}>
                    <span>Chaton :</span>
                    <span className={styles.variable}>{informationJoueuse?.nomChaton}</span>
                </div>

                <div className={styles.box}>
                    <div>Joueuse : <span className={styles.variable}>{informationJoueuse?.nomJoueuse}</span></div>
                    <div>Enfance : <span className={styles.variable}>{informationJoueuse?.enfance}</span></div>
                    <div>Caractère : <span className={styles.variable}>{informationJoueuse?.caractere}</span></div>
                    <div>Don de naissance : <span className={styles.variable}>{informationJoueuse?.donNaissance}</span>
                    </div>
                </div>
            </div>
            <div className={styles.photoContainer}>
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt="Chaton ou joueuse"
                        className={styles.fullHeightImage}
                    />
                ) : (
                    <img
                        src={undefined}
                        alt="Chaton ou joueuse"
                        className={styles.fullHeightImage}
                    />
                )}
            </div>
        </div>
    );
};

export default ChatonDescription;
