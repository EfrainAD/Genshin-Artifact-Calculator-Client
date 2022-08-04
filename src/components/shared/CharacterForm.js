import { 
     Form,
     Button,
     Container 
 } from 'react-bootstrap'
 
 const CharacterForm = (props) => {
     const { character, handleChange, heading, handleSubmit } = props
     
     return (
         <Container className="justify-content-center">
             <h3>{heading}</h3>
             <Form onSubmit={handleSubmit}>
                 <Form.Label htmlFor="name">Name</Form.Label>
                 <Form.Control
                     placeholder="What is your character's name?"
                     name="name"
                     id="name"
                     value={ character.name }
                     onChange={ handleChange }
                 />
                 <Form.Label htmlFor="level">Level</Form.Label>
                 <Form.Control
                     placeholder="What is it's level?"
                     type="number"
                     name="level"
                     id="level"
                     value={ character.level }
                     onChange={ handleChange }
                 />
                 <Form.Label htmlFor="mainStat">Main Stat</Form.Label>
                 <Form.Control
                     placeholder="What is your character's main stat?"
                     name="mainStat"
                     id="mainStat"
                     value={ character.mainStat }
                     onChange={ handleChange }
                 />
                 <Button type="submit">Submit</Button>
             </Form>
         </Container>
     )
 }
 
 export default CharacterForm