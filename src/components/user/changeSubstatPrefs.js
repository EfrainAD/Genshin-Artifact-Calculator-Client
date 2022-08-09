import { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { getSubstatPrefs, updateSubstatPrefs } from '../../api/user'
import messages from '../shared/AutoDismissAlert/messages'

import '../../components/style.css'

const ChangeSubstatPrefs = (props) => {
  const { user, msgAlert } = props;
  const [ subPrefs, setSubPrefs ] = useState(null);

  // on component load, set subPrefs to the user's preferences
  useEffect(() => {
    getSubstatPrefs(user)
      .then(res => setSubPrefs(res.data.userPrefs))
      .catch(err => {
        // if there's a problem pulling the user's preferences, we
        // can just default to a blank form
        msgAlert({
          heading: "Error getting user preferences.",
          message: messages.getUserPrefsFailure,
          variant: "danger"
        })

        setSubPrefs({
          "Atk": 0,
          "Atk%": 0,
          "HP": 0,
          "HP%": 0,
          "Def": 0,
          "Def%": 0,
          "critRate": 0,
          "critDmg": 0,
          "EM": 0,
          "ER": 0
        });
      })
  }, []);

  // update subPrefs whenever a box is checked, nothing fancy
  const handleChange = (event) => {
    setSubPrefs(prevPrefs => {
      const newPref = event.target;

      prevPrefs[newPref.id] = newPref.checked ? 1 : 0;
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

    // otherwise, submit the form and give feedback to the user
    updateSubstatPrefs(user, subPrefs)
      .then(() => msgAlert({
        heading: "Success!",
        message: messages.updateUserPrefsSuccess,
        variant: "success"
      }))
      .catch(err => msgAlert({
        heading: "Error",
        message: messages.updateUserPrefsFailure,
        variant: "danger"
      }));
  }

  const checkboxStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const subPrefsJsx = [];
  for (const sub in subPrefs) {
    subPrefsJsx.push(
      <div style={ checkboxStyle }>
        <Form.Check
          type="checkbox"
          key={ sub }
          label={ sub }
          id={ sub }
          defaultChecked={ subPrefs[sub] }
          onChange={ handleChange }
        />
      </div>
    )
  }

  const checkGridStyle = {
    display: "grid",
    gridTemplate: "repeat(4, 1fr) / repeat(3, 1fr)",
    width: "50%",
    margin: "20px auto",
  };

  const subPrefsForm = (
    <Container className="justify-content-center">
      <h3>Substat Preferences</h3>
      <p>Check off all substats that you currently deem important or valuable. The ratings will use these preferences to determine relative strength and value.</p>
      <p>Note that submitting new preferences will <b>automatically recalculate all of your artifacts' ratings</b> using your new preferences.</p>
      <Form onSubmit={handleSubmit}>
        <div style={ checkGridStyle }>
          { subPrefsJsx }
        </div>
        <Button type="submit" style={{marginBottom: "20px"}}>Save Preferences</Button>
      </Form>
    </Container>
  );

  return subPrefsForm;
}

export default ChangeSubstatPrefs;