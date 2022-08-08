import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import messages from '../shared/AutoDismissAlert/messages'

import '../../components/style.css'

const ChangeSubstatPrefs = (props) => {
  const { user, msgAlert } = props;
  const navigate = useNavigate();
  const [ subPrefs, setSubPrefs ] = useState(
    { // just default stuff for now -- pull from user to complete
      "Atk": 0,
      "Atk%": 0,
      "HP": 0,
      "HP%": 0,
      "Def": 0,
      "Def%": 0,
      "critRate": 1,
      "critDmg": 1,
      "EM": 0,
      "ER": 0
    }
  );

  const handleChange = (event) => {
    setSubPrefs(prevPrefs => {
      const newPref = event.target;

      prevPrefs[newPref.id] = newPref.checked ? 1 : 0;
      console.log(prevPrefs);
      return prevPrefs;
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // can't submit the form with no important substats
    const importantSubstatCount = Object.values(subPrefs).reduce((n, sub) => (n + sub), 0);
    if (importantSubstatCount < 1) { 
      msgAlert({
        heading: "Error",
        message: messages.insufficientImportantSubs,
        variant: "danger"
      })
      return;
    }

    console.log(subPrefs);
  }

  const subPrefsJsx = [];
  for (const sub in subPrefs) {
    subPrefsJsx.push(
      <Form.Check
        type="checkbox"
        key={ sub }
        label={ sub }
        id={ sub }
        defaultChecked={ subPrefs[sub] }
        onChange={ handleChange }
      />
    )
  }

  const subPrefsForm = (
    <Container className="justify-content-center">
      <h3>Substat Preferences</h3>
      <p>Check off all substats that you currently deem important or valuable. The ratings will use these preferences to determine relative strength and value.</p>
      <Form onSubmit={handleSubmit}>
        { subPrefsJsx }
        <Button type="submit">Save Preferences</Button>
      </Form>
    </Container>
  );

  return subPrefsForm;
}

/*

    // We'll add a handleSubmit here that makes an api request, then handles the response
    const handleSubmit = (e) => {
        createArtifact(user, artifact)
            // if we're successful, navigate to the show page for the new artifact
            .then(res => { navigate(`/artifacts/${res.data.artifact._id}`)})
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createArtifactSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: createArtifactFailure,
                    variant: 'danger'
                })
            )
    }
*/

export default ChangeSubstatPrefs;