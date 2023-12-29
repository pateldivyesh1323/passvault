import enviroments from "../../utils/enviroments";
import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
    audience: enviroments.api_identifier,
    issuerBaseURL: enviroments.auth_domain,
    tokenSigningAlg: "RS256",
});

const authorize = (err, req, res, next) => {
    console.log(err);
    if (err) {
        res.status(401).send("Unauthorized");
    } else {
        next();
    }
}

export { authorize, jwtCheck };