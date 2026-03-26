import {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import { navigate } from "react-router-dom"
import "./home.css"

function Home({ data, setData, selected, setSelected }) {
    const [objkeys, setObjkeys] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        console.log(selected)
    }, [selected])

    useEffect(() => {
        setObjkeys(Object.keys(data))
    }, [data])

    function handleChange(subj) {
        setSelected(prev =>
            prev.includes(subj) ?
            prev.filter(item => item !== subj) :
            [...prev, subj]
        )
    }

    function trainButton() {
        if (selected.length !== 0) {
            navigate("/train")
        }
    }


    function mergeButton() {
        if (selected.length >= 2) {
            const order = selected.map(x => objkeys.indexOf(x))
            const data_idx = Math.min(...order)
            const first_idx = order.indexOf(data_idx)
            let newName = selected[first_idx]
            let forwords = []
            let defwords = []
            for (let i = 0; i < selected.length; i++) {
                forwords = [...forwords, ...data[selected[i]][0]]
                defwords = [...defwords, ...data[selected[i]][1]]
            }
            setData(prev => {
                let newData = {...prev}
                for (let i = 0; i < selected.length; i++) {
                    delete newData[selected[i]]
                }

                let entries = Object.entries(newData)
                entries.splice(data_idx, 0, [newName, [forwords, defwords]])
                newData = Object.fromEntries(entries)

                return newData
            })
            setSelected([])
        }
    }


    return (
        <>
            <button className="create_button buttonh" onClick={() => navigate("/create")}>Create</button>
            <button className="train_button buttonh" onClick={trainButton}>Train</button>
            <button className="merge_button buttonh" onClick={mergeButton}>Merge</button>
            <button className="select_all_button small_button" onClick={() => setSelected(objkeys)}>All</button>
            <button className="unselect_all_button small_button" onClick={() => setSelected([])}>None</button>
            <div className="selections">
                {
                    objkeys.map((subj, index) => (
                    <div className="checkbox_container" key={index} onClick={() => handleChange(subj)}>
                        <input type="checkbox" className="mycheckbox" checked={selected.includes(subj)} readOnly />
                        <div>{subj}</div>
                    </div>
                    ))
                }
            </div>
        </>
    )
}

export default Home;