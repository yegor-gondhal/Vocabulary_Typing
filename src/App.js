import './App.css';
import Create from "./create.js"
import Train from "./train.js"
import Home from "./home.js";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/getdata")
            .then(res => res.json())
            .then(data => {
                setData(data)
                setLoading(false)
            })

    }, []);

    async function saveToServer() {
        await fetch("http://localhost:3001/savedata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }

    useEffect(() => {
        saveToServer()
    }, [data])

    if (loading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home data={data} setData={setData} selected={selected} setSelected={setSelected} />}/>
                    <Route path="/create" element={<Create data={data} setData={setData} />}/>
                    <Route path="/train" element={<Train data={data} selected={selected} />}/>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App;
