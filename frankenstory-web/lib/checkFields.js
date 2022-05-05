

export function checkFields(msg,fields){
    var rest = "";
    for (const field in fields) {
		if (!msg.hasOwnProperty(fields[field])) {
			rest += ", " + fields[field]
            console.log('ERROR: expected field \'', fields[field], '\' not found on message')
		}
	}
    return rest;
}