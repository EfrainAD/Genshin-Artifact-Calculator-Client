import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
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
    const [characters, setCharacters] = useState(null)
    const [error, setError] = useState(false)

    const { user, msgAlert } = props

    console.log('Props in ArtifactsIndex', props)

    useEffect(() => {
        console.log(props)
            getAllCharacters(user)
            .then(res => setCharacters(res.data.characters))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Characters',
                    message: messages.getCharactersFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    if (!user) {
        return <p>You need to sign in!</p>
    }
    if (error) {
        return <p>Error!</p>
    }
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
                    <Link to={`/characters/${character._id}`}>{ character.name }</Link>
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

export default ArtifactsIndex