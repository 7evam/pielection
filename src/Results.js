import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { PieChart } from 'react-minimal-pie-chart';

export default function Election({ voted }) {

    const [loading, setLoading] = useState(true)
    const [results, setResults] = useState(null)

    const fetchResults = async () => {
        const response = await axios.get('https://1gf2ozzs7a.execute-api.us-east-1.amazonaws.com/Prod/', {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": '*'
        })
        console.log('here is response')
        console.log(response.data.votes)
        const votingResults = {
            mmud: 0,
            sr: 0,
            mb3p: 0,
            keylime: 0
        }
        response.data.votes.forEach(vote => {
            votingResults[vote.vote]++
        })
        setResults(votingResults)
        setLoading(false)

    }

    useEffect(() => {
        fetchResults()
    }, []);

    // const pieTable = {
    //     keylime: "Key Lime",
    //     bor: "Blood Orange Ricotta",
    //     bg: "Bayou Goo",
    //     mb3p: "Maple Bourbon Brown Butter Peach"
    // }
    const pieTable = {
        keylime: "Key Lime",
        mmud: "Mississippi Mud",
        sr: "Strawberry Rhubarb",
        mb3p: "Maple Bourbon Brown Butter Peach"
    }


    return (
        loading ?

            <p>Loading...</p>
            : (
                <div>
                    <h1>Results</h1>
                    {voted ? <p>You've already voted for {pieTable[localStorage.getItem("pie")]}</p> : null}
                    <div className="chart">
                        <PieChart
                            labelStyle={{
                                fill: 'black',
                                fontSize: '4px'
                            }}
                            label={(props) => { return props.dataEntry.title; }}
                            data={[
                                { title: 'Key Lime', value: results.keylime, color: '#E8F48C' },
                                { title: 'Strawberry Rhubarb', value: results.sr, color: '#FB2943' },
                                { title: 'Mississippi Mud', value: results.mmud, color: '#7B3F00' },
                                { title: 'MB3P', value: results.mb3p, color: '#F68C35' },
                            ]}
                        />
                        <div>
                            <p><b>Key Lime</b>: {results.keylime}</p>
                            <p><b>Strawberry Rhubarb</b>: {results.sr}</p>
                            <p><b>Mississippi Mud</b>: {results.mmud}</p>
                            <p><b>Maple Bourbon Brown Butter Peach</b>: {results.mb3p}</p>
                        </div>
                    </div>
                </div>
            )
    )
}
