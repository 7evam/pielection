import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { PieChart } from 'react-minimal-pie-chart';

export default function Election() {

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
            bor: 0,
            bg: 0,
            mb3p: 0,
            keylime: 0
        }
        response.data.votes.forEach(vote => {
            console.log('here is vote')
            console.log(vote)
            votingResults[vote.vote]++
        })
        setResults(votingResults)
        setLoading(false)

    }

    useEffect(() => {
        fetchResults()
    }, []);


    return (
        loading ?

            <p>Loading...</p>
            : (
                <div>
                    <h1>Results</h1>
                    <div className="chart">
                        <PieChart
                            labelStyle={{
                                fill: 'black',
                                fontSize: '4px'
                            }}
                            label={(props) => { return props.dataEntry.title; }}
                            data={[
                                { title: 'Key Lime', value: results.keylime, color: '#E8F48C' },
                                { title: 'Blood Orange Ricotta', value: results.bor, color: '#F6602D' },
                                { title: 'Bayou Goo', value: results.bg, color: '#7B3F00' },
                                { title: 'MB3P', value: results.mb3p, color: '#F68C35' },
                            ]}
                        />
                        <div>
                            <p><b>Key Lime</b>: {results.keylime}</p>
                            <p><b>Blood Orange Ricotta</b>: {results.bor}</p>
                            <p><b>Bayou Goo</b>: {results.bg}</p>
                            <p><b>Maple Bourbon Brown Butter Peach</b>: {results.mb3p}</p>
                        </div>
                    </div>
                </div>
            )
    )
}
