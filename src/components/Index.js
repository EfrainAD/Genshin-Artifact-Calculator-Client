import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import './style.css'

import LoadingScreen from './shared/LoadingScreen'
import { getAllArtifacts } from '../api/artifacts'
// import { getAllCharacters } from '../api/characters'
import messages from './shared/AutoDismissAlert/messages'

import ArtifactsIndex from './artifacts/ArtifactsIndex'
import CharactersIndex from './characters/CharactersIndex'

// import {makeStyles} from '@material-ui/core/styles'
import { buildQueries } from '@testing-library/react'

// const useStyles = makeStyles(theme => {
//     right-button: {
//         background-color: "blue";
//     }
// })

const Index = (props) => {
    const [filter, setFilter] = useState('artifacts') // or Characters
    console.log('filter: ', filter)
    const { user, msgAlert } = props

    console.log('Props in Index', props)

////////////////
    if (filter === 'artifacts') {
        return (
            <>
                <button className='button left-button is-active'
                    onClick={()=>{setFilter('artifacts')}}
                    >My Artifacts
                </button>
                <button className='button right-button'
                    onClick={()=>{setFilter('characters')}}
                    >My Characters
                </button>
                
                <ArtifactsIndex msgAlert={ msgAlert } user={ user } />
            </>
        )
    } else { // artifact === 'Character
        return (
            <>
                <button className='button left-button'
                    onClick={()=>{setFilter('artifacts')}}
                    >My Artifacts
                </button>
                <button className='button right-button is-active'
                    onClick={()=>{setFilter('characters')}}
                    >My Characters
                </button>
                
                <CharactersIndex msgAlert={ msgAlert } user={ user } />
            </>
        )
    }

    
}

export default Index