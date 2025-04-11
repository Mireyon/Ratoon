import style from "./styles/experience.module.css";
import {Minus, Plus} from "lucide-react";
import {InformationJoueuseDTO} from "./IInformationJoueuse.ts";

interface ExperienceProps {
    informationJoueuse?: InformationJoueuseDTO | null
    setInformationJoueuse: React.Dispatch<React.SetStateAction<InformationJoueuseDTO | null>>
}

const Experience: React.FC<ExperienceProps> = ({informationJoueuse, setInformationJoueuse}) => {

    const handleActuelleMinusOne = () => {
        if (informationJoueuse) {
            setInformationJoueuse({
                ...informationJoueuse,
                experienceActuelle: Math.max(0, informationJoueuse.experienceActuelle - 1)
            });
        }
    };

    const handleActuellePlusOne = () => {
        if (informationJoueuse) {
            setInformationJoueuse({
                ...informationJoueuse,
                experienceActuelle: informationJoueuse.experienceActuelle + 1
            });
        }
    };

    const handleTotaleMinusOne = () => {
        if (informationJoueuse) {
            setInformationJoueuse({
                ...informationJoueuse,
                experienceTotale: Math.max(0, informationJoueuse.experienceTotale - 1)
            });
        }
    };

    const handleTotalePlusOne = () => {
        if (informationJoueuse) {
            setInformationJoueuse({
                ...informationJoueuse,
                experienceTotale: informationJoueuse.experienceTotale + 1
            });
        }
    };

    return (
        <div className={style.appContainer}>
            <div className={style.left}>
                <div className={`${style.container} ${style.title}`}>Expérience</div>
            </div>
            <div className={style.right}>
                <div className={style.page}>
                    <div className={style.slashLine}></div>
                    
                    <div className={style.experienceCounter}>
                        <div className={style.label}>Actuelle</div>
                        <div className={style.controls}>
                            <button onClick={handleActuelleMinusOne} className={style.actionButton}>
                                <Minus size={16} />
                            </button>
                            <span className={style.value}>{informationJoueuse?.experienceActuelle}</span>
                            <button onClick={handleActuellePlusOne} className={style.actionButton}>
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    <div className={style.experienceCounter}>
                        <div className={style.label}>Totale</div>
                        <div className={style.controls}>
                            <button onClick={handleTotaleMinusOne} className={style.actionButton}>
                                <Minus size={16} />
                            </button>
                            <span className={style.value}>{informationJoueuse?.experienceTotale}</span>
                            <button onClick={handleTotalePlusOne} className={style.actionButton}>
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Experience;
