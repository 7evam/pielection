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
        console.log("here is pie")
        console.log(pie)
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
                            Key Lime never made it to the Final Four until 2022 but has now won the last two contests in a row thanks
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
                    <Pie onClick={() => setSelected('bor')} selected={selected} id='bor' className="pie">
                        <p className='pieName'>Blood Orange Ricotta</p>
                        <p className='description'>As one of the more intriguing combinations of
                            flavor in the competition, Blood Orange Ricotta has drawn
                            a lot of oohs and ahs from pie fans all over.
                            Ricotta Pie is a traditional dish in Sicily that
                            this pie kicks up a notch with blood oranges,
                            which are sweeter and less acidic than typical oranges.
                            Its creamy ricotta filling adds a smooth texture and
                            subtle richness to deliciously fresh blood oranges.</p>
                    </Pie>
                    <Pie onClick={() => setSelected('bg')} selected={selected} id='bg' className="pie">
                        <p className='pieName'>Bayou Goo</p>
                        <p className='description'>With a cheesecake base enhanced with a layer of pecans followed by a chocolate pudding layer and finished with a whipped topping, shredded chocolate and powdered sugar, Bayou Goo is coming in strong. As the only chocolatey pie here, Bayou Goo stands out with its revolutionary combination of cheesecake, chocolate pudding and pecans giving fans of all sorts of non-fruit pies a reason to vote with the #GooCrew</p>
                    </Pie>
                </div>
            </div>
            <button disabled={!selected || submitting} onClick={() => submitVote(selected)}>Submit Vote</button>
            {submitting ? <p>Submitting vote...</p> : null}
        </>
    )
}