import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./train.css"

function Train({ data, selected}) {
    const navigate = useNavigate();
    const [idx, setIdx] = useState(0);
    const [foreign, setForeign] = useState([]);
    const [def, setDef] = useState([]);
    const [value, setValue] = useState("");
    const [giveup, setGiveup] = useState(false);
    const [reverse, setReverse] = useState(false);
    const [shuffleinit, setShuffleinit] = useState(true);
    const [prevvalue, setPrevvalue] = useState("");

    function calc_foreign_def() {
        let new_foreign = []
        let new_def = []
        for (let i = 0; i < selected.length; i++) {
            new_foreign = [...new_foreign, ...data[selected[i]][0]]
            new_def = [...new_def, ...data[selected[i]][1]]
        }
        setForeign(new_foreign)
        setDef(new_def)
    }

    function shuffle() {
        let foreign1 = [...foreign];
        let def1 = [...def];
        for (let i = 0; i < foreign1.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [foreign1[i], foreign1[j]] = [foreign1[j], foreign1[i]];
            [def1[i], def1[j]] = [def1[j], def1[i]];
        }
        setForeign(foreign1);
        setDef(def1);
        console.log(def1)
    }

    useEffect(() => {
        calc_foreign_def();
    }, [])

    useEffect(() => {
        if (shuffleinit && (foreign.length > 0)) {
            shuffle();
            setShuffleinit(false);
        }
    }, [foreign])



    function onDefEnter(e) {
        if (e.key === "Enter" && (def[idx] == value || giveup)) {
            setValue("");
            setPrevvalue("")
            setGiveup(false)

            if ((idx+1)%foreign.length === 0) {
                shuffle();
                setIdx(0);
            } else {
                setIdx(prev => prev + 1);
            }
        } else if (e.key === "Enter" && (value === "" || value === prevvalue)) {
            setGiveup(true)
        } else if (e.key === "Enter") {
            setPrevvalue(value);
        }
    }

    function onForEnter(e) {
        if (e.key === "Enter" && (foreign[idx] == value || giveup)) {
            setValue("");
            setPrevvalue("")
            setGiveup(false)

            if ((idx+1)%foreign.length === 0) {
                shuffle();
                setIdx(0);
            } else {
                setIdx(prev => prev+1);
            }
        } else if (e.key === "Enter" && (value === "" || value === prevvalue)) {
            setGiveup(true)
        } else if (e.key === "Enter") {
            setPrevvalue(value);
        }
    }

    if (reverse) {
        return (
            <>
                <button className="back_button blue_button" onClick={() => navigate("/")}>Back</button>
                <button className="reverse_button_active blue_button" onClick={() => setReverse(!reverse)}>Reverse</button>
                <div className="appeared_word">{def[idx]}</div>
                <input type="text" placeholder="Type Foreign Word" className="type_input" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={onForEnter} />
                <div className={giveup ? "answer" : "no_answer"}>{giveup ? foreign[idx] : ""}</div>
            </>
        )
    } else {
        return (
            <>
                <button className="back_button blue_button" onClick={() => navigate("/")}>Back</button>
                <button className="reverse_button_inactive blue_button" onClick={() => setReverse(!reverse)}>Reverse</button>
                <div className="appeared_word">{foreign[idx]}</div>
                <input type="text" placeholder="Type Definition" className="type_input" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={onDefEnter} />
                <div className={giveup ? "answer" : "no_answer"}>{giveup ? def[idx] : ""}</div>
            </>
        )
    }
}

export default Train;