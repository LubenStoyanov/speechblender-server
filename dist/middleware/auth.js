import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    // const authHeader = req.headers.authorization;
    const token = req.cookies.token;
    if (token) {
        // const token = authHeader.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            if (!decodedToken) {
                return res
                    .status(403)
                    .json({ success: false, error: "Missing required claim" });
            }
            req.user = decodedToken;
            next();
        }
        catch (err) {
            return res.status(401).json({ success: false, error: "Invalid token" });
        }
    }
    else {
        return res.status(401).json({ success: false, error: "No token provided" });
    }
};
//# sourceMappingURL=auth.js.map