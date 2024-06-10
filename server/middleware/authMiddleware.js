import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = expressAsyncHandler(async (req, res, next) => {
    let token = req.cookies.token;

    if (token) {
        try {
            const { userId } = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(userId).select("-password");

            if (!req.user) {
                throw new Error("User not found");
            }

            next();
        } catch(error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed"); 
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

export default protect;