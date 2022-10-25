const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

export const generateAppleToken = () => {
    const clientId = process.env.APPLE_CLIENT_ID;
    const teamId = process.env.APPLE_TEAM_ID;
    const keyId = process.env.APPLE_KEY_ID;
    const p8Path = process.env.APPLE_P8_PATH;
    const privateKey = fs.readFileSync(path.join(__dirname, p8Path)).toString();


    const now = new Date()
    const expire = new Date(now);
    expire.setFullYear(now.getFullYear() + 1);
    console.log(jwt.sign({}, privateKey, {
        algorithm: "ES256",
        expiresIn: "1y",
        audience: "https://appleid.apple.com",
        subject: clientId,
        issuer: teamId,
        keyid: keyId,
    }));

}
