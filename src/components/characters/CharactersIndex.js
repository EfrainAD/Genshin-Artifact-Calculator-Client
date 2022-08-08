import { useState, useEffect } from 'react'

// Display stuff
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import messages from '../shared/AutoDismissAlert/messages'

// Components
import { getAllCharacters } from '../../api/characters'

// Get all user's artifacts display them.

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center-left'
}

const ArtifactsIndex = (props) => {
    console.log('Props in ArtifactsIndex', props)

    // User and messages
    const { user, msgAlert } = props
    const [error, setError] = useState(false)
    
    // Placeholder for all the user's characters from the DB.
    const [characters, setCharacters] = useState(null)

    // Get all the characters from the DB
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
     // If there is an error fetching from the DB
    if (error) {
        return <p>Error!</p>
    }
    // If characters haven't been loaded yet, show a loading message
    if (!characters) {
        return <LoadingScreen />
    // If the user's characters have been loaded, but they don't have any, so there nothing to display.
    } else if (characters.length === 0) {
        return <p>No characters yet. Better add some.</p>
    }

    // Puts each character in a little card display.
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
    
    // Display's each character in it's little card display.
    return (
        <div style={ cardContainerStyle }>
            { characterCards }
        </div>
    )
}

export default ArtifactsIndex