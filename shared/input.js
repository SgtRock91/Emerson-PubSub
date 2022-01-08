//basically determining if its a number. Doesnt work perfect, edge cases include 400j1g. Use regex or something.
const validateNumber = (input) => (!isNaN(parseInt(input, 10)));
const validateString = (input) => (typeof input === 'string');

const processInput = (input, validator, helpMessage) => {
    if(input === '-h') {
        console.log(helpMessage);
        process.exit(0);
    } else if (validator(input)) {
        return input;
    } else {
        console.log('bad input, use -h for help');
        process.exit(1);
    }
};

module.exports = {
    processInput,
    validateNumber,
    validateString,
};
