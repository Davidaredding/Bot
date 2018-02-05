const SOCKET_ON_NEW_STATUS_CONNECTION   = "SOCKET_ON_NEW_STATUS_CONNECTION";
const SOCKET_ON_STATUS_OFFLINE          = "SOCKET_ON_STATUS_OFFLINE";
const SOCKET_ON_STATUS_O                = "SOCKET_ON_STATUS_ONLINE";
const SOCKET_ON_STATUS_ERROR            = "SOCKET_ON_STATUS_ERROR";
const ROBOT_ON_SETTINGS_CHANGE          ="ROBOT_ON_SETTINGS_CHANGED";

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
