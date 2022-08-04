import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllArtifacts } from '../../api/artifacts'
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
    const [error, setError] = useState(false)

    const { msgAlert } = props

    console.log('Props in ArtifactsIndex', props)

    useEffect(() => {
        console.log(props)
        getAllArtifacts()
            .then(res => setArtifacts(res.data.artifacts))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Artifacts',
                    message: messages.getArtifactsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If artifacts haven't been loaded yet, show a loading message
    if (!artifacts) {
        return <LoadingScreen />
    } else if (artifacts.length === 0) {
        return <p>No artifacts yet. Better add some.</p>
    }

    const artifactCards = artifacts.map(artifact => (
        <Card style={{ width: '30%', margin: 5}} key={ artifact.id }>
            <Card.Header>{ artifact.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/artifacts/${artifact.id}`}>View { artifact.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={ cardContainerStyle }>
            { artifactCards }
        </div>
    )
}

export default ArtifactsIndex