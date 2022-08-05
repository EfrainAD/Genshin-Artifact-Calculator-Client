import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllArtifacts } from '../../api/artifacts'
import { getAllCharacters } from '../../api/characters'
import messages from '../shared/AutoDismissAlert/messages'

// ArtifactsIndex should make a request to the api
// To get all artifacts
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const ArtifactsIndex = (props) => {
    const [artifacts, setArtifacts] = useState(null)
    const [characters, setCharacters] = useState(null)
    const [error, setError] = useState(false)
    const filter = 'artifacts' // or characters

    const { user, msgAlert } = props

    console.log('Props in ArtifactsIndex', props)

    useEffect(() => {
        console.log(props)
        getAllArtifacts(user)
            .then(res => setArtifacts(res.data.artifacts))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Artifacts',
                    message: messages.getArtifactsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
            // UNDO
            // getAllCharacters()
            // .then(res => setCharacters(res.data.artifacts))
            // .catch(err => {
            //     msgAlert({
            //         heading: 'Error Getting Characters',
            //         message: messages.getCharactersFailure,
            //         variant: 'danger',
            //     })
            //     setError(true)
            // })
    }, [])

    if (!user) {
        return <p>You need to sign in!</p>
    }
    if (error) {
        return <p>Error!</p>
    }
    // ToDo if time we can make this code more DRY.
    if (filter === 'artifacts') {
        // If artifacts haven't been loaded yet, show a loading message
        if (!artifacts) {
            return <LoadingScreen />
        } else if (artifacts.length === 0) {
            return <p>No artifacts yet. Better add some.</p>
        }

        const artifactCards = artifacts.map(artifact => (
            <Card style={{ width: '30%', margin: 5}} key={ artifact._id }>
                <Card.Header>{ artifact.fullTitle }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/artifacts/${artifact._id}`}>View { artifact.name }</Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))

        return (
            <div style={ cardContainerStyle }>
                <button onClick={()=>{filter='character'}}>Swithc</button>
                { artifactCards }
            </div>
        )
    } else { // artifact === 'Character
        // If characters haven't been loaded yet, show a loading message
        if (!characters) {
            return <LoadingScreen />
        } else if (characters.length === 0) {
            return <p>No characters yet. Better add some.</p>
        }

        const characterCards = characters.map(character => (
            <Card style={{ width: '30%', margin: 5}} key={ character.id }>
                <Card.Header>{ character.fullTitle }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/characters/${character._id}`}>View { character.name }</Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))

        return (
            <div style={ cardContainerStyle }>
                { characterCards }
            </div>
        )
    }

    
}

export default ArtifactsIndex