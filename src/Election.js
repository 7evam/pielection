import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

const Pie = styled.div`
    border: ${props => props.id === props.selected ? '4px solid orange' : null};
`

export default function Election({ setElectionPage }) {

    const [selected, setSelected] = useState(null)

    const submitVote = async (pie) => {
        console.log("here is pie")
        console.log(pie)
        if (!selected) {
            alert('Please make a selection')
            return
        }
        const postData = {
            name: uuidv4(),
            pie
        }
        try {
            const response = await axios.post('https://1gf2ozzs7a.execute-api.us-east-1.amazonaws.com/Prod/', postData, {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": '*'
            }
            )
            alert("Thank you for voting")
            setElectionPage(false)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <><h1>Vote for the pie that seems more delicious. If you haven't had the pie before, that's okay!</h1>
            <div className="container">

                <div className="row">
                    <Pie onClick={() => setSelected('keylime')} selected={selected} id='keylime' className="pie"><p className='pieName'>Key Lime</p></Pie>
                    <Pie onClick={() => setSelected('mb3p')} selected={selected} id='mb3p' className="pie"><p className='pieName'>Maple Bourbon Brown Butter Peach</p></Pie>
                </div>
                <div className="row">
                    <Pie onClick={() => setSelected('bor')} selected={selected} id='bor' className="pie"><p className='pieName'>Blood Orange Ricotta</p></Pie>
                    <Pie onClick={() => setSelected('bg')} selected={selected} id='bg' className="pie"><p className='pieName'>Bayou Goo</p></Pie>
                </div>
            </div>
            <button disabled={!selected} onClick={() => submitVote(selected)}>Submit Vote</button>
        </>
    )
}