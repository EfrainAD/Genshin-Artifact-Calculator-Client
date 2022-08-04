import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneCharacter, updateCharacter, removeCharacter } from '../../api/characters'
import messages from '../shared/AutoDismissAlert/messages'
import EditCharacterModal from './EditCharacterModal'

// We need to get the Character's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

// CLEANUP
// we'll used a style object to lay out the toy cards I might want this. So I am keep it here.
// const cardContainerLayout = {
//     display: 'flex',
//     justifyContent: 'center',
//     flexFlow: 'row wrap'
// }

const ShowCharacter = (props) => {
    const [character, setCharacter] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the character in showCharacter', character)
    // destructuring to get the id value from our route parameters

    useEffect(() => {
        getOneCharacter(id)
            .then(res => setCharacter(res.data.character))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting character',
                    message: messages.getCharactersFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])

    // here we'll declare a function that runs which will remove the character
    // this function's promise chain should send a message, and then go somewhere
    const removeTheCharacter = () => {
        removeCharacter(user, character.id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeCharacterSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing character',
                    message: messages.removeCharacterFailure,
                    variant: 'danger'
                })
            })
    }

    if (!character) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ character.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Age: { character.age }</small></div>
                            <div><small>Type: { character.type }</small></div>
                            <div><small>
                                Adoptable: { character.adoptable ? 'yes' : 'no'}
                            </small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            character.owner && user && character.owner._id === user._id 
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit Character
                                </Button>
                                <Button onClick={() => removeTheCharacter()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Remove {character.name}
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditCharacterModal 
                user={user}
                character={character} 
                show={editModalShow} 
                updateCharacter={updateCharacter}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
        </>
    )
}

export default ShowCharacter