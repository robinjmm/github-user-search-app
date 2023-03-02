class ResponseError extends Error {
    constructor(message, res) {
        super(message);
        this.response = res;
    }
}

export async function wrapperFetch(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new ResponseError("Bad fetch response", res);
    }

    return res;
}