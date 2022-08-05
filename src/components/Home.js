
// import ArtifactsIndex from './artifacts/ArtifactsIndex'
import './style.css'

import ArtifactsIndex from './artifacts/ArtifactsIndex'


const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const { user, msgAlert } = props

	//////////// Why user for not signed in but !user for signed in.
	return (
		<>
		<div class="container">
			<h2>See the Artifacts</h2>
			{
				user ?
					<ArtifactsIndex msgAlert={ msgAlert } user={ user } />
				:
					<p>You need to sign in!</p>
			}
		</div>	
			
		</>
	)
}

export default Home
