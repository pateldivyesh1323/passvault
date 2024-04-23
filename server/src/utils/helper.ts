async function getLoggedinUID(auth) {
    const uid = await auth.payload.sub.split("|")[1];
    return uid;
}

export { getLoggedinUID };
