import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import LoadingScreen from '../shared/LoadingScreen'
import { seedArtifacts } from '../../api/artifacts';

const SeedArtifacts = (props) => {
  const { user, msgAlert } = props;
  
  const [ seed, setSeed ] = useState(null);
  
  useEffect(() => {
    setSeed(seedArtifacts(user));
  }, [])

  if (seed) { return <p>Artifact preload successful! <Link to="/">Back to Home</Link></p>; }
  else { return <LoadingScreen />; }
}

export default SeedArtifacts;