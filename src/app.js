const express = require("express");
const app = express();
const User = require('./models/User.js');

app.use(express.json());

app.post('/', async (req, res, next)=>{
    try {
        const user = await User.create(req.body);
        if (!user) {
            throw new Error("No User Created");
        }
        res.send(user.username);
    } catch (error) {
        next(error);
    }
})

app.get('/', async (req, res, next) =>{
    try {
        const users = await User.findAll({});
        if (!users) {
            throw new Error("No Users Found!")
        }
        res.send(users);
    } catch (error) {
        next(error)
    }
});

app.get('/:username', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { username: req.params.username }
        })
        if (!user) {
            throw new error("No user found")
        } 
        res.send(user);
    } catch (error) {
        next(error);
    }
})

app.put('/:username', async (res,req,next) => {
    try {
        const updated = await User.update(req.body, {
            where: {username: req.params.username}
        });
        console.log(updated)
        if(updated[0] === 0) {
            throw new error ("No update made");
        }
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
});

app.delete('/:username', async (req, res, next) => {
    try {
        const deleted = await User.destroy({
            where: { username: req.params.username }
        });
        if (deleted === 0) {
            throw new Error("No User Deleted")
        }
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
});

module.exports = app;