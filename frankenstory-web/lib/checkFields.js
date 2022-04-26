

export function checkFields(msg,fields){
    var hasFields = true;
    for (const field in fields) {
		if (!msg.hasOwnProperty(fields[field])) {
			hasFields=false;
            console.log('ERROR: expected field \'', fields[field], '\' not found on message')
		}
	}
    return hasFields;
}