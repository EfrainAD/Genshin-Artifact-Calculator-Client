import { 
     Form,
     Button,
     Container 
 } from 'react-bootstrap'

 
 import { useState, useEffect } from 'react'
 import { useNavigate } from 'react-router-dom'
 
 import messages from '../shared/AutoDismissAlert/messages'
 
 import { fetchValidCharacters } from '../../api/characters'

 
 const CharacterForm = (props) => {
    const { user, msgAlert } = props;
    const { character, handleChange, heading, handleSubmit } = props
    const navigate = useNavigate();

    // we'll fetch the master list of valid characters for this user from the
    // server -- all the logic can be handled there.
    const [validCharacters, setValidCharacters] = useState([]);
    useEffect(() => {
        fetchValidCharacters(user)
            .then(res => setValidCharacters(res.data.validCharacters))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting character',
                    message: messages.getCharactersFailure,
                    variant: 'danger'
                });
                navigate("/");
            });
    }, []);

    // build the dropdown menu of valid characters
    const [characterNameOptions, setCharacterNameOptions] = useState(<></>);
    useEffect(() => {
        setCharacterNameOptions(() => {
            const valid = validCharacters.map(ch => {
                return <option key={ch} value={ch}>{ch}</option>;
            });

            // if we're editing a character, character.name will exist, so pop
            // the character we're editing to the top of the list
            if (character.name) {
                valid.unshift(
                    <option
                        key={character.name}
                        value={character.name}
                    >
                        {character.name}
                    </option>
                );
            }

            return valid;
        });
    }, [validCharacters]);

     return (
         <Container className="justify-content-center">
             <h3>{heading}</h3>
             <Form onSubmit={handleSubmit}>
                 <Form.Label htmlFor="name">Name</Form.Label>
                 <Form.Select
                     placeholder="Which character?"
                     name="name"
                     id="name"
                     value={ character.name }
                     onChange={ handleChange }
                 >
                    { characterNameOptions }
                </Form.Select>

                 <Form.Label htmlFor="level">Level</Form.Label>
                 <Form.Control
                     placeholder="What is their level?"
                     type="number"
                     name="level"
                     id="level"
                     value={ character.level }
                     onChange={ handleChange }
                 />
                 <Button type="submit">Submit</Button>
             </Form>
         </Container>
     )
 }
 
 export default CharacterForm