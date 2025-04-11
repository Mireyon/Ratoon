import './styles/description.module.css'
import { useEffect, useRef, useState } from "react";
import style from "./styles/grimoire.module.css";
import { PackagePlus } from "lucide-react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { InformationJoueuseDTO } from "./IInformationJoueuse.ts";
import { grimoireOptions } from './Options.ts';

interface ChatonGrimoireProps {
    informationJoueuse?: InformationJoueuseDTO | null
    setInformationJoueuse: React.Dispatch<React.SetStateAction<InformationJoueuseDTO | null>>
}

const ChatonGrimoire: React.FC<ChatonGrimoireProps> = ({ informationJoueuse, setInformationJoueuse }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [newItem, setNewItem] = useState("");
    const minLines = 3;

    const popupRef = useRef<HTMLDivElement | null>(null);

    const filteredOptions = grimoireOptions.filter(
        (option) => !(informationJoueuse?.grimoire || []).includes(option.label)
    );

    const getBackgroundColor = (label: string) => {
        if (label.includes("Costaud")) return "#F4ACA0";
        if (label.includes("Malin")) return "#A0BFE4";
        if (label.includes("Mignon")) return "#C9DFB3";
        return "white";
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };

        if (showPopup) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPopup]);


    const handleAddItem = () => {
        if (newItem.trim() !== "") {
            if (informationJoueuse) {
                setInformationJoueuse({
                    ...informationJoueuse,
                    grimoire: [
                        ...(informationJoueuse.grimoire || []).filter(item => item.trim() !== ""),
                        newItem
                    ]
                });
            }
            setNewItem("");
            setShowPopup(false);
        }
    };
    return (
        <div className={style.grimoire}>
            <div className={style.page}>
                <div className={style.hole} />
                <div className={`${style.line} ${style.title} ${style.container}`}>
                    <span className={style.infoContainer}>
                        <button onClick={() => setShowPopup(true)} className={style.left}>
                            <PackagePlus color="#6B89BE" size={20} />
                        </button>
                    </span>
                    <span className={style.right}>Grimoire</span></div>
                {[...(informationJoueuse?.grimoire ?? []), ...Array(Math.max(0, minLines - (informationJoueuse?.grimoire.length ?? 0))).fill("")].map((data, index) => (
                    <div key={index} className={style.line}>
                        {index % 3 === 1 && <div className={style.hole} />}
                        <span className={style.text}>{data || " "}</span>
                    </div>
                ))}
            </div>
            {showPopup && (
                <div className={style.popupOverlay}>
                    <div className={style.popup} ref={popupRef}>
                        <h3>Ajouter un élément</h3>
                        <Autocomplete
                            disablePortal
                            options={filteredOptions}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Miagie" />}
                            renderOption={(props, option) => (
                                <li
                                    {...props}
                                    style={{
                                        backgroundColor: getBackgroundColor(option.label),
                                        padding: "8px 12px"
                                    }}
                                >
                                    {option.label}
                                </li>
                            )}
                            onChange={(_event, value) => setNewItem(value?.label || "")}
                        />
                        <div className={style.popupButtons}>
                            <button onClick={handleAddItem} className={style.addBtn}>Ajouter</button>
                            <button onClick={() => setShowPopup(false)} className={style.cancelBtn}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatonGrimoire;
