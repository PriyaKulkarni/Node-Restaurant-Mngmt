exports.responseJson = (status, code, result) => {
    let response = {};
    response.status = status;
    response.code = code;
    if (result) {
        response.data = result;
    }
    return response;
}