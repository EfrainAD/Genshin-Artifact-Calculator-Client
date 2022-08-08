const messages = {
	// User auth messages
	signUpSuccess: "Successfully registered! You've been signed in as well.",
	signUpFailure:"Registration failed. Email may be taken, or passwords don't match.",
	signInSuccess: 'Welcome!',
	signInFailure:'Failed to sign in. Check your email and password and try again.',
	signOutSuccess: 'Come back soon!',
	changePasswordSuccess: 'Password changed successfully!',
	changePasswordFailure:'Failed to change passwords. Check your old password and try again.',

	// Artifact messages
	getArtifactsFailure: 'Error fetching artifacts.',
	createArtifactSuccess: 'Artifact created Successfully!',
	createArtifactFailure: 'Something went wrong, please try again.',
	updateArtifactSuccess: 'Artifact updated Successfully!',
	updateArtifactFailure: 'Couldnt update artifact, please try again.',
	removeArtifactSuccess: 'Artifact has been destroyed!',
	removeArtifactFailure: 'Couldnt remove artifact, please try again.'
	
	// Character messages
	getCharactersFailure: 'Error fetching characters.',
	createCharacterSuccess: 'Character created Successfully!',
	createCharacterFailure: 'Something went wrong, please try again.',
	updateCharacterSuccess: 'Character updated Successfully!',
	updateCharacterFailure: 'Couldnt update character, please try again.',
	removeCharacterSuccess: 'Character has been destroyed!',
	removeCharacterFailure: 'Couldnt remove character, please try again.'
}

module.exports = messages