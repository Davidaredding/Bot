class Utilities{
    
    static copy(o) {
        var output, v, key;
        output = Array.isArray(o) ? [] : {};
        for (key in o) {
            v = o[key];
            output[key] = (typeof v === "object") ? Utilities.copy(v) : v;
        }
        return output;
     }
}

module.exports = Utilities;