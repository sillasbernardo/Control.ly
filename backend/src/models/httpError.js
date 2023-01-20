class HttpError extends Error {
	constructor(message, errorCode){
		super(message)
		this.code = errorCode
	}
}

/* Functions */
const error01 = () => {
	new HttpError(`Could not find people.`, 404)
}

exports.error01 = error01;