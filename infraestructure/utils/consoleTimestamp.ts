module.exports = function () {
    const originalLog = console.log;

    // Overwriting
    console.log = function () {
        let args = [].slice.call(arguments);
        originalLog.apply(console.log,[getCurrentDateString()].concat(args));
    };

    // Returns current timestamp
    function getCurrentDateString() {
        const date = (new Date()).toISOString().slice(11,-5)
        return  '[' + date + ']';
    }
}
