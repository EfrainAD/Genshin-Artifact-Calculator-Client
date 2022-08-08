const messages = {
	signUpSuccess: "Successfully registered! You've been signed in as well.",
	signUpFailure:"Registration failed. Email may be taken, or passwords don't match.",
	signInSuccess: 'Welcome!',
	signInFailure:'Failed to sign in. Check your email and password and try again.',
	signOutSuccess: 'Come back soon!',
	changePasswordSuccess: 'Password changed successfully!',
	changePasswordFailure:'Failed to change passwords. Check your old password and try again.',
	getArtifactsFailure: 'Error fetching artifacts.',
	createArtifactSuccess: 'Artifact created Successfully!',
	createArtifactFailure: 'Something went wrong, please try again.',
	updateArtifactSuccess: 'Artifact updated Successfully!',
	updateArtifactFailure: 'Couldn\'t update artifact, please try again.',
	removeArtifactSuccess: 'Artifact has been destroyed!',
	removeArtifactFailure: 'Couldn\'t remove artifact, please try again.',

	noRatingFound: "Unexpected error rating your artifact. Please re-enter your artifact data and try again.",
	rateLevelFailure: "For technical reasons, only Level 20 artifacts can be rated at the present time.",
	rateSubstatAmountFailure: "One or more of your substats has an amount that cannot exist in Genshin Impact. Please check your inputs and try again.",

	usefulSubstatsRatingTooltip: `This rating looks at how many useful substats your artifact has.<br />
	The percentage answers the question: "Among all possible artifacts with the same main<br />
	stat as mine, what portion of them do I have more/the same number of useful substats as?"<br />
	This rating does <b>not</b> evaluate rolls in any way -- it only looks at which substats the artifact has.`,
	usefulRollsRatingTooltip: `This rating looks at how many of your artifact's rolls went into useful substats.<br />
	The percentage answers the question, "Among all artifacts with the same main and sub stats as mine,<br />
	what portion of them do I have more/the same number of useful rolls as?"`,
	rollQualityRatingTooltip: `This rating looks at the values of the rolls themselves.<br />
	The percentage answers the question, "Among all artifacts with the same substats and roll distribution<br />
	as mine, what portion of them are my rolls equivalent or numerically superior to?"`,
	powerRatingTooltip: `This rating directly gives your artifact's numerical strength as a percentage of the numerical<br />
	strength of the hypothetical best artifact (with the same main stat as yours).`
}

module.exports = messages