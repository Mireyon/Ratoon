import style from './styles/qualites.module.scss'
import Costaud from "../public/Costaud.tsx";
import Malin from "../public/Malin.tsx";
import Mignon from "../public/Mignon.tsx";
import Amitie from "../public/Amitie.tsx";
import Heart from "../public/Heart.tsx";
import {ChevronDown, ChevronUp} from "lucide-react";
import {InformationJoueuseDTO} from "./IInformationJoueuse.ts";

interface ChatonQualitesProps {
    informationJoueuse?: InformationJoueuseDTO | null
    setInformationJoueuse: React.Dispatch<React.SetStateAction<InformationJoueuseDTO | null>>
}

const ChatonQualites: React.FC<ChatonQualitesProps> = ({informationJoueuse, setInformationJoueuse}) => {

    const handleQualityChange = (quality: keyof InformationJoueuseDTO, operation: 'plus' | 'minus') => {
        if (informationJoueuse) {
            const currentValue = typeof informationJoueuse[quality] === 'number'
                ? informationJoueuse[quality]
                : 0;

            setInformationJoueuse({
                ...informationJoueuse,
                [quality]: operation === 'plus'
                    ? currentValue + 1
                    : Math.max(0, currentValue - 1)
            });
        }
    };


    return (
        <>
            <div className={`${style.container} ${style.title}`}>Qualités</div>
            <div className={style.container}>
                {[
                    {label: 'Costaud', quality: 'costaud', Component: Costaud, color: '#E5745F'},
                    {label: 'Malin', quality: 'malin', Component: Malin, color: '#6B89BE'},
                    {label: 'Mignon', quality: 'mignon', Component: Mignon, color: '#79B546'},
                    {
                        label: 'Coeur',
                        quality: 'coeur',
                        Component: Heart,
                        color: '#DFB5D3',
                        style: {paddingLeft: '2rem'}
                    },
                    {label: 'Amitié', quality: 'amitie', Component: Amitie, color: '#FBB944'}
                ].map(({label, quality, Component, color, style: additionalStyle}, index) => (
                    <div className={style.quality} style={additionalStyle} key={index}>
                        <button onClick={() => handleQualityChange(quality as keyof InformationJoueuseDTO, 'plus')}>
                            <ChevronUp color={color}/>
                        </button>
                        <Component number={typeof informationJoueuse?.[quality as keyof InformationJoueuseDTO] === 'number' ? informationJoueuse[quality as keyof InformationJoueuseDTO] as number : 0}/>
                        <span className={style[quality]}>{label}</span>
                        <button onClick={() => handleQualityChange(quality as keyof InformationJoueuseDTO, 'minus')}>
                            <ChevronDown color={color}/>
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ChatonQualites;
