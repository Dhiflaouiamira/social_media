const Jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1]; // Split "Bearer <token>" to get the token
        Jwt.verify(token, "your-secret-key", (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Token is not valid" });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ error: "Token not provided" });
    }
};
