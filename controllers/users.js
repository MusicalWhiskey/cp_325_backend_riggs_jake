import Users from "../models/users.js";

export async function fetchAllUsers(req, res, next) {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (e) {
        console.error(e);
    }
}   

