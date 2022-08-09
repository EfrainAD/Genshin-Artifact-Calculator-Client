// Display stuff
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

// Get all user's items to display in a card.

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center-left'
}

const DisplayCard = (props) => {
    console.log('Props in DisplayCard', props)
    
    // User and messages
    const { item, name } = props

    return ( 
        artifacts.map(artifact => (
            // <DisplayCard item={ artifact } name={"artifact"} key={artifact.id} />
            <Card style={{ width: '30%', margin: 5}} key={ artifact._id }>
                <Card.Header>{ artifact.name }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/artifacts/${artifact._id}`}>View Artifact</Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    )
}
export default DisplayCard