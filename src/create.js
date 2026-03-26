import "./create.css"

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Create({ data, setData }) {
    const navigate = useNavigate();

    const nameRef = useRef();
    const foreignRef = useRef();
    const defRef = useRef();

    const [name, setName] = useState('');
    const [forword, setForword] = useState("");
    const [foreign, setForeign] = useState([]);
    const [defword, setDefword] = useState("");
    const [def, setDef] = useState([]);
    const [speed, setSpeed] = useState(false);
    const [length, setLength] = useState(0);

    useEffect(() => {
        nameRef.current.focus()
    }, [])

    useEffect(() => {
        setLength(Math.max(foreign.length, def.length))
    }, [foreign, def])

    function nameEnter(e) {
        if (e.key === "Enter" && !(Object.keys(data).includes(name))) {
            foreignRef.current.focus()
        }
    }

    function forEnter1(e) {
        if (e.key === "Enter" && forword !== "") {
            setForeign(prev => [...prev, forword])
            defRef.current.focus()
        }
    }

    function forEnter2(e) {
        if (e.key === "Enter" && forword !== "") {
            setForeign(prev => [...prev, forword])
            setForword("")
        }
    }

    function defEnter1(e) {
        if (e.key === "Enter" && defword !== "") {
            setDef(prev => [...prev, defword])
            setForword("")
            setDefword("")
            foreignRef.current.focus()
        }
    }

    function defEnter2(e) {
        if (e.key === "Enter" && defword !== "") {
            setDef(prev => [...prev, defword])
            setDefword("")
        }
    }

    function doneClick() {
        if (name !== "") {
            setData(prev => ({
                ...prev,
                [name]: [foreign, def]
            }));
            setName("")
            setForword("")
            setDefword("")
            setForeign([])
            setDef([])
            navigate("/")
        }

    }
    if (speed) {
        return (
            <>
                <button className="back_button blue_button" onClick={() => navigate("/")}>Back</button>
                <button className="speed_button_active blue_button" onClick={() => setSpeed(!speed)}>Speed</button>
                <input className="name_input input" placeholder="Name" type="text" ref={nameRef} onKeyDown={nameEnter} value={name} onChange={(e) => setName(e.target.value)} />
                <input className="foreign_input input" placeholder="Foreign Word" type="text" ref={foreignRef} onKeyDown={forEnter2} onChange={(e) => setForword(e.target.value)} value={forword} />
                <input className="def_input input" placeholder="Definition" type="text" ref={defRef} onKeyDown={defEnter2} onChange={(e) => setDefword(e.target.value)} value={defword} />
                <button className="done_button blue_button" onClick={doneClick}>Done</button>
                <div className="speed_container">
                    {
                        Array.from({ length }).map((_, index) => (
                        <div key={index} className="pair_container">
                            <div>{foreign[index]}</div>
                            <div>{def[index]}</div>
                        </div>
                    ))
                    }
                </div>
            </>
        )
    } else {
        return (
            <>
                <button className="back_button blue_button" onClick={() => navigate("/")}>Back</button>
                <button className="speed_button_inactive blue_button" onClick={() => setSpeed(!speed)}>Speed</button>
                <input className="name_input input" placeholder="Name" type="text" ref={nameRef} onKeyDown={nameEnter} value={name} onChange={(e) => setName(e.target.value)} />
                <input className="foreign_input input" placeholder="Foreign Word" type="text" ref={foreignRef} onKeyDown={forEnter1} onChange={(e) => setForword(e.target.value)} value={forword} />
                <input className="def_input input" placeholder="Definition" type="text" ref={defRef} onKeyDown={defEnter1} onChange={(e) => setDefword(e.target.value)} value={defword} />
                <button className="done_button blue_button" onClick={doneClick}>Done</button>
                <div className="speed_container">
                    {
                        Array.from({ length }).map((_, index) => (
                            <div key={index} className="pair_container">
                                <div>{foreign[index]}</div>
                                <div>{def[index]}</div>
                            </div>
                        ))
                    }
                </div>
            </>
        )
    }
}

export default Create;