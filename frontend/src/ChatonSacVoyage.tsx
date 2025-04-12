import {useEffect, useRef, useState} from "react";
import style from "./styles/sacVoyage.module.css";
import Sac from "../public/sac.tsx";
import {Coins, Delete, Minus, PackagePlus, Pen, Plus} from "lucide-react";
import {InformationJoueuseDTO} from "./IInformationJoueuse.ts";

interface ChatonSacVoyageProps {
    informationJoueuse?: InformationJoueuseDTO | null
    setInformationJoueuse: React.Dispatch<React.SetStateAction<InformationJoueuseDTO | null>>
}

const ChatonSacVoyage: React.FC<ChatonSacVoyageProps> = ({informationJoueuse, setInformationJoueuse}) => {
    const minLines = 7;
    const [showPopup, setShowPopup] = useState(false);
    const [newItem, setNewItem] = useState("");
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState("");

    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };

        if (showPopup) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [showPopup]);

    const updateCurrency = (type: "bronze" | "argent" | "or", value: number) => {
        setInformationJoueuse(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                [type]: value
            };
        });
    };

    const handleAddBronze = () => {
        if (!informationJoueuse) return;

        const newBronze = informationJoueuse.bronze + 1;
        if (newBronze === 100) {
            const newArgent = informationJoueuse.argent + 1;
            if (newArgent === 100) {
                updateCurrency("or", informationJoueuse.or + 1);
                updateCurrency("argent", 0);
            } else {
                updateCurrency("argent", newArgent);
            }
            updateCurrency("bronze", 0);
        } else {
            updateCurrency("bronze", newBronze);
        }
    };

    const handleRemoveBronze = () => {
        if (!informationJoueuse) return;

        if (informationJoueuse.bronze === 0) {
            if (informationJoueuse.argent > 0) {
                updateCurrency("argent", informationJoueuse.argent - 1);
                updateCurrency("bronze", 99);
            } else if (informationJoueuse.or > 0) {
                updateCurrency("or", informationJoueuse.or - 1);
                updateCurrency("argent", 99);
                updateCurrency("bronze", 99);
            }
        } else {
            updateCurrency("bronze", informationJoueuse.bronze - 1);
        }
    };

    const handleAddArgent = () => {
        if (!informationJoueuse) return;

        const newArgent = informationJoueuse.argent + 1;
        if (newArgent === 100) {
            updateCurrency("or", informationJoueuse.or + 1);
            updateCurrency("argent", 0);
        } else {
            updateCurrency("argent", newArgent);
        }
    };

    const handleRemoveArgent = () => {
        if (!informationJoueuse) return;

        if (informationJoueuse.argent > 0) {
            updateCurrency("argent", informationJoueuse.argent - 1);
        } else if (informationJoueuse.or > 0) {
            updateCurrency("or", informationJoueuse.or - 1);
            updateCurrency("argent", 99);
        }
    };

    const handleRemoveOr = () => {
        if (!informationJoueuse) return;

        if (informationJoueuse.or > 0) {
            updateCurrency("or", informationJoueuse.or - 1);
        } else if (informationJoueuse.argent > 0) {
            updateCurrency("argent", informationJoueuse.argent - 1);
            updateCurrency("or", 99);
        }
    };

    const handleAddOr = () => {
        if (!informationJoueuse) return;
        updateCurrency("or", informationJoueuse.or + 1);
    };

    const handleAddItem = () => {
        if (newItem.trim() !== "") {
            setInformationJoueuse(prev => {
                if (!prev) return prev;
                const updatedList = [
                    ...(prev.sacVoyage ?? []).filter(item => item.trim() !== ""),
                    newItem
                ];
                return {
                    ...prev,
                    sacVoyage: updatedList
                };
            });
            setNewItem("");
            setShowPopup(false);
        }
    };

    const handleDeleteItem = (index: number) => {
        setInformationJoueuse(prev => {
            if (!prev) return prev;
            const updatedList = prev.sacVoyage.filter((_, i) => i !== index);
            return {
                ...prev,
                sacVoyage: updatedList
            };
        });
    };

    const handleEditStart = (index: number) => {
        if (informationJoueuse?.sacVoyage) {
            setEditingIndex(index);
            setEditValue(informationJoueuse.sacVoyage[index]);
        }
    };

    const handleEditSave = (index: number) => {
        if (editValue.trim() !== "") {
            setInformationJoueuse(prev => {
                if (!prev) return prev;
                const updatedList = prev.sacVoyage.map((item, i) => (i === index ? editValue : item));
                return {
                    ...prev,
                    sacVoyage: updatedList
                };
            });
        }
        setEditingIndex(null);
    };

    return (
        <div className={style.sac}>
            <div className={style.page}>
                <div className={`${style.title} ${style.firstLine} ${style.container}`}>
                    <span className={style.infoContainer}>
                       <button onClick={() => setShowPopup(true)} className={style.left}>
                           <PackagePlus color="#6B89BE" size={20}/>
                       </button>
                    </span>
                    <span className={style.right}>Sac de voyage</span>

                    <Sac className={style.sacIconLeft}/>
                    <Sac className={style.sacIconRight}/>
                </div>

                <div className={style.coinsContainer}>
                    <div className={style.coinBox}>
                        <Coins color={'#d5802c'}/>
                        <button onClick={handleRemoveBronze}><Minus size={16}/></button>
                        <span>{informationJoueuse?.bronze}</span>
                        <button onClick={handleAddBronze}><Plus size={16}/></button>
                    </div>
                    <div className={style.coinBox}>
                        <Coins color={'#71706E'}/>
                        <button onClick={handleRemoveArgent}><Minus size={16}/></button>
                        <span>{informationJoueuse?.argent}</span>
                        <button onClick={handleAddArgent}><Plus size={16}/></button>
                    </div>
                    <div className={style.coinBox}>
                        <Coins color={'#E5B80B'}/>
                        <button onClick={handleRemoveOr}><Minus size={16}/></button>
                        <span>{informationJoueuse?.or}</span>
                        <button onClick={handleAddOr}><Plus size={16}/></button>
                    </div>
                </div>


                {[...(informationJoueuse?.sacVoyage ?? []), ...Array(Math.max(0, minLines - (informationJoueuse?.sacVoyage.length ?? 0))).fill("")].map((data, index) => (
                    <div key={index} className={style.box}>
                        {editingIndex === index ? (
                            <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={() => handleEditSave(index)}
                                onKeyDown={(e) => e.key === "Enter" && handleEditSave(index)}
                                autoFocus
                                className={style.editInput}
                            />
                        ) : (
                            <>
                                <span className={style.text}>{data || " "}</span>
                                {data && (
                                    <div className={style.controls}>
                                        <button onClick={() => handleEditStart(index)} className={style.editBtn}>
                                            <Pen size={16}/>
                                        </button>
                                        <button onClick={() => handleDeleteItem(index)} className={style.deleteBtn}>
                                            <Delete size={16}/>
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}

                <div className={style.description}>
                    une couverture en laine, un couteau de poche,
                    une cuillère en bois, un petit caquelon de fonte,
                    une grande gourde en cuir, un briquet à amadou,
                    des morceaux de chandelle, un morceau de savon,
                    une brosse, un paquet de croquettes de route.
                </div>
            </div>

            {showPopup && (
                <div className={style.popupOverlay}>
                    <div className={style.popup} ref={popupRef}>
                        <h3>Ajouter un élément</h3>
                        <input
                            type="text"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            className={style.input}
                            placeholder="Entrer un objet..."
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

export default ChatonSacVoyage;
