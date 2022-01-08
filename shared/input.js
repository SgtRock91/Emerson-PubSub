//if you solve a problem with regex you now have 2 problems
const validateNumber = (input) => /^\d+$/.test(input);
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
