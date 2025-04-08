import './styles/description.module.css'
import styles from "./styles/interfaceJoueuse.module.css";
import ChatonDescription from "./ChatonDescription.tsx";
import ChatonQualites from "./ChatonQualites.tsx";
import ChatonTalents from "./ChatonTalents.tsx";
import ChatonGrimoire from "./ChatonGrimoire.tsx";
import ChatonSacVoyage from "./ChatonSacVoyage.tsx";
import Experience from "./Experience.tsx";
import {InformationJoueuseDTO} from "./IInformationJoueuse.ts";

interface InterfaceJoueuseProps {
    informationsJoueuse?: InformationJoueuseDTO | null
    setInformationJoueuse: React.Dispatch<React.SetStateAction<InformationJoueuseDTO | null>>
}

const InterfaceJoueuse: React.FC<InterfaceJoueuseProps> = ({informationsJoueuse, setInformationJoueuse}) => {
    return (
        <div className={styles.appContainer}>
            <div className={styles.leftContainer}>
                <ChatonDescription informationJoueuse={informationsJoueuse}/>
                <ChatonQualites informationJoueuse={informationsJoueuse} setInformationJoueuse={setInformationJoueuse}/>
                <ChatonTalents informationJoueuse={informationsJoueuse} setInformationJoueuse={setInformationJoueuse}/>
            </div>
            <div className={styles.rightContainer}>
                <div>
                    <ChatonGrimoire informationJoueuse={informationsJoueuse} setInformationJoueuse={setInformationJoueuse}/>
                    <ChatonSacVoyage informationJoueuse={informationsJoueuse} setInformationJoueuse={setInformationJoueuse}/>
                    <Experience informationJoueuse={informationsJoueuse} setInformationJoueuse={setInformationJoueuse}/>
                </div>
            </div>
        </div>
    );
};

export default InterfaceJoueuse;
