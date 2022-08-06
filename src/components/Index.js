import { useState } from 'react'
import './style.css'

import ArtifactsIndex from './artifacts/ArtifactsIndex'
import CharactersIndex from './characters/CharactersIndex'

const Index = (props) => {
    const [filter, setFilter] = useState('artifacts') // or Characters
    console.log('filter: ', filter)
    const { user, msgAlert } = props

    console.log('Props in Index', props)

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
    } else { // filter === 'Character
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