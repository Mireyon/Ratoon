import React, { useEffect, useState, useRef } from 'react';
import style from './styles/talents.module.css';
import { PackagePlus } from "lucide-react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { InformationJoueuseDTO } from "./IInformationJoueuse.ts";
import { talentsOptions } from './Options.ts';

interface ChatonTalentsProps {
  informationJoueuse?: InformationJoueuseDTO | null;
  setInformationJoueuse: React.Dispatch<React.SetStateAction<InformationJoueuseDTO | null>>;
}

const ChatonTalents: React.FC<ChatonTalentsProps> = ({ informationJoueuse, setInformationJoueuse }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [newItem, setNewItem] = useState("");
  const minLines = 3;

  const popupRef = useRef<HTMLDivElement | null>(null);

  const filteredOptions = talentsOptions.filter(
      (option) => !(informationJoueuse?.talents || []).includes(option.label)
  );

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
                  talents: [
                      ...(informationJoueuse.talents || []).filter(item => item.trim() !== ""),
                      newItem
                  ]
              });
          }
          setNewItem("");
          setShowPopup(false);
      }
  };
  return (
      <div className={style.talent}>
          <div className={style.page}>
              <div className={`${style.line} ${style.title} ${style.container}`}>
                  <span className={style.infoContainer}>
                      <button onClick={() => setShowPopup(true)} className={style.left}>
                          <PackagePlus color="#6B89BE" size={20} />
                      </button>
                  </span>
                  <span className={style.right}>Talent</span></div>
              {[...(informationJoueuse?.talents ?? []), ...Array(Math.max(0, minLines - (informationJoueuse?.talents.length ?? 0))).fill("")].map((data, index) => (
                  <div key={index} className={style.line}>
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
                          renderInput={(params) => <TextField {...params} label="Talent" />}
                          renderOption={(props, option) => (
                              <li
                                  {...props}
                                  style={{
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

export default ChatonTalents;
