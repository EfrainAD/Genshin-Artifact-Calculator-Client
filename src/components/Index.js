import { useState } from 'react'
import './style.css'

import ArtifactsIndex from './artifacts/ArtifactsIndex'
import CharactersIndex from './characters/CharactersIndex'
import IndexButtons from './IndexButtons'

const Index = (props) => {
    console.log('Props in Index', props)
    
    // filter is used to toggle between display the list of artifacts and characters.
    const [filter, setFilter] = useState('artifacts') // or Characters
    const { user, msgAlert } = props

    return (
        <>
            <IndexButtons filter={filter} setFilter={setFilter} />
            {filter === 'artifacts'
            ? <ArtifactsIndex msgAlert={ msgAlert } user={ user } /> 
            : <CharactersIndex msgAlert={ msgAlert } user={ user } />}
        </>
    )
}

export default Index