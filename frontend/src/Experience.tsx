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
                    <div
                        style={{
                            position: 'absolute',
                            alignSelf: 'start',
                            left: '25%',
                            padding: '1%',
                            cursor: 'pointer',
                            color: '#CCAC86',
                            fontFamily: 'Goudy Old Style',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <button onClick={handleActuelleMinusOne}><Minus size={16}/></button>
                        <span>{informationJoueuse?.experienceActuelle}</span>
                        <button onClick={handleActuellePlusOne}><Plus size={16}/></button>
                    </div>

                    <div
                        style={{
                            position: 'absolute',
                            alignSelf: 'end',
                            right: '30%',
                            padding: '1%',
                            cursor: 'pointer',
                            color: '#CCAC86',
                            fontFamily: 'Goudy Old Style',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <button onClick={handleTotaleMinusOne}><Minus size={16}/></button>
                        <span>{informationJoueuse?.experienceTotale}</span>
                        <button onClick={handleTotalePlusOne}><Plus size={16}/></button>
                    </div>

                    <div style={{textAlign: 'start'}}>Actuelle</div>
                    <div style={{textAlign: 'end'}}>Totale</div>
                </div>
            </div>
        </div>

    );
};

export default Experience;
