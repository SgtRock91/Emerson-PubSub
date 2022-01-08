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

module.exports = { processInput };
