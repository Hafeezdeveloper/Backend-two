let obj = {
    status: null,
    data: null,
    message: "",
    error: "",
}

let SendResponse = (status, data, message, error) => {
    obj.status = status;
    obj.data = data;
    obj.message = message;
    obj.error = error;

    return obj
}

module.exports = { SendResponse }