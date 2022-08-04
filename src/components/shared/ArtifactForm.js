import { 
    Form,
    Button,
    Container 
} from 'react-bootstrap'

const ArtifactForm = (props) => {
    const { artifact, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder="What is your artifact's name?"
                    name="name"
                    id="name"
                    value={ artifact.name }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="type">Type</Form.Label>
                <Form.Control
                    placeholder="What kind of artifact is this?"
                    name="type"
                    id="type"
                    value={ artifact.type }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="age">Age</Form.Label>
                <Form.Control
                    placeholder="How old is your artifact?"
                    type="number"
                    name="age"
                    id="age"
                    value={ artifact.age }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ArtifactForm