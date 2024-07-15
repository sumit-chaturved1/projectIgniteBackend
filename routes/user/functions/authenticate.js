const jwt = require("jsonwebtoken");
const UserModel = require("../../../models/UserModel");
const authenticateToken = async (req, res, next) => {
  try {
    console.log("problem is here");
    const authHeader = req.headers["authorization"]; //  Using Cookies for token
    const authToken = authHeader && authHeader.split(" ")[1];
    const token = req.cookies?.token;
    console.log("cookies: ", req.cookies?.token);
    if (token == null)
      return res.json({
        success: false,
        message: "Invalid Tokenf1",
      });

    const payload = jwt.verify(token, process.env.ACCESS_WEB_TOKEN);
    const user = await UserModel.findOne({ username: payload.username }).select(
      "-password"
    );
    if (!user) {
      return res.json({ success: false, message: "Invalid Tokenf2" });
    }
    req.user = user;
    req.authenticated = { success: true, payload: payload };
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
};

module.exports = {
  authenticateToken,
};
