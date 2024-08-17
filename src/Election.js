import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

const Pie = styled.div`
    outline: ${props => props.id === props.selected ? '4px solid orange' : null};
`

export default function Election({ setElectionPage }) {

    const [selected, setSelected] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const submitVote = async (pie) => {
        setSubmitting(true)
        if (!selected) {
            alert('Please make a selection')
            return
        }
        const userId = uuidv4()
        const postData = {
            name: userId,
            pie
        }
        try {
            const response = await axios.post('https://1gf2ozzs7a.execute-api.us-east-1.amazonaws.com/Prod/', postData, {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": '*'
            }
            )
            localStorage.setItem('userId', userId)
            localStorage.setItem('pie', pie)
            alert("Thank you for voting")
            setElectionPage(false)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <h1>Vote for the pie that seems more delicious. If you haven't had the pie before, that's okay!</h1>
            <div className="container">
                <div className="row">
                    <Pie onClick={() => setSelected('keylime')} selected={selected} id='keylime' className="pie">
                        <p className='pieName'>Key Lime</p>
                        <p className='description'>Key Lime is one of the 11 most recognized pies
                            in the world according to restaurantclicks.com.
                            Despite having the benefit of brand recognition,
                            Key Lime never made it to the Final Four until 2022 but won two contests in 2022 and 2023 in a row thanks
                            to its perfectly balanced flavor profile of tart and creamy
                            composed of key lime juice, egg yolks, and sweetened condensed milk baked on a perfect bed of graham cracker crust.</p>
                    </Pie>
                    <Pie onClick={() => setSelected('mb3p')} selected={selected} id='mb3p' className="pie">
                        <p className='pieName'>Maple Bourbon Brown Butter Peach</p>
                        <p className='description'>Since exploding onto the scene in 2019
                            debuting as a 2 seed and winning the whole competition,
                            the pie affectionately known as MB3P has been one of the
                            most dominant pies in Pie Madness by making it to the Final Four
                            in 3 of its 4 years of competition. Its signature combination of
                            sweet and juicy peaches tempered with a bite of bourbon and
                            enriched with the richness of brown butter and maple syrup has propelled the pie to high places</p>

                    </Pie>
                </div>
                <div className="row">
                    <Pie onClick={() => setSelected('mmud')} selected={selected} id='mmud' className="pie">
                        <p className='pieName'>Mississippi Mud</p>
                        <p className='description'>Mississippi Mud hopes to show all the pies that
                            chocolate hasn't fallen out of fashion.
                            The pie can be made numerous different ways, but typically
                            features a layer of chocolate pudding and chocolate
                            cake and is often served with, you guessed it, chocolate ice cream.
                        </p>
                    </Pie>
                    <Pie onClick={() => setSelected('sr')} selected={selected} id='sr' className="pie">
                        <p className='pieName'>Strawberry Rhubarb</p>
                        <p className='description'>
                            Earning its status as a 2 time champion this year,
                            Strawberry Rhubarb has proven its deliciousness time and time again. Thought of by many
                            as the perfect dichotomy of sweet and tart,
                            This pie has made many mouths happy, bursting with the perfect balance
                            of sweet strawberries and tart rhubarb topped off with a beautiful lattice crust.</p>
                    </Pie>
                </div>
            </div>
            <button disabled={!selected || submitting} onClick={() => submitVote(selected)}>Submit Vote</button>
            {submitting ? <p>Submitting vote...</p> : null}
        </>
    )
}