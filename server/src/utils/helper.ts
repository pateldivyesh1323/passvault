function getLoggedinUID(auth) {
    return auth.payload.sub.split("|")[1];
}

export { getLoggedinUID };