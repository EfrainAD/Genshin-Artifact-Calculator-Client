import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from './shared/LoadingScreen'
import { getAllArtifacts } from '../api/artifacts'
// import { getAllCharacters } from '../api/characters'
import messages from './shared/AutoDismissAlert/messages'

import ArtifactsIndex from './artifacts/ArtifactsIndex'
import CharactersIndex from './characters/CharactersIndex'

const Index = (props) => {
    const [filter, setFilter] = useState('artifacts') // or Characters
    console.log('filter: ', filter)
    const { user, msgAlert } = props

    console.log('Props in Index', props)

////////////////
    if (filter === 'artifacts') {
        return (
            <>
                <button 
                    onClick={()=>{setFilter('artifacts'); 
                    console.log('hi filter: ', filter)}}
                    >My Artifacts
                </button>
                <button 
                    onClick={()=>{setFilter('characters')}}>My Characters</button>
                
                <ArtifactsIndex msgAlert={ msgAlert } user={ user } />
            </>
        )
    } else { // artifact === 'Character
        return (
            <>
                <button onClick={()=>{setFilter('artifacts')}}>My Artifacts</button>
                <button onClick={()=>{setFilter('characters')}}>My Characters</button>
                
                <CharactersIndex msgAlert={ msgAlert } user={ user } />
            </>
        )
    }

    
}

export default Index