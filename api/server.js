const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();




server.get("/api/accounts", (req, res) => {
    db("accounts")
    .then((users) => res.status(200).json(users).end())
    .catch((err) =>
        res.status(500).json({ message: "We are unable to find users" }).end()
    );
});

    server.get("/api/accounts/:id", (req, res) => {
    const id = req.params.id;

    db("accounts").where({ id }).then((users) => {

        if (users.length) {
        res.status(200).json(users).end();
        } else {
        res.status(404).json({ message: "We could not find that user" }).end();
        }
    })
    .catch((err) =>
        res
        .status(500)
        .json({
            message: "error",
        })
        .end()
    );
});

server.post("/api/accounts", (req, res) => {
    if (req.body.name === "" || req.body.budget === "") {
    res.status(400).json({ message: "Och, try again" }).end();
    } else {
    db("accounts").insert(req.body).then((user) => {

        if (user.length) {
            db("accounts").where({ id: user[0] }).then((user) => {
                
                if (user.length) {
                res.status(201).json(user[0]).end();
                } else {
                res
                    .status(500)
                    .json({ message: "We were unable to add user" })
                    .end();
                }
            })
            .catch((err) => {
                res.status(500).json({ message: "Oh No!" }).end();
            });
        } else {
            res.status(400).json({ message: "We were unable to add user" }).end();
        }
        })
        .catch((err) => {
        res.status(500).json({ message: "error" }).end();
        });
    }
});
server.put("/api/accounts/:id", (req, res) => {
    const id = req.params.id
    if (req.body.name === "" || req.body.budget === "") {
        res.status(400).json({ message: "Oh No!" }).end();
        } else {
        db("accounts").where({ id }).update(req.body).then((user) => {

            if (user.length) {
                db("accounts").where({ id }).then((user) => {

                    if (user.length) {
                    res.status(201).json(user).end();
                    } else {
                    res
                        .status(404)
                        .json({ message: "We are having trouble locating your user" })
                        .end();
                    }
                })
                .catch((err) => {
                    res.status(500).json({ message: "Oh No!" }).end();
                });
            } else {
                res.status(400).json({ message: "We were unable to add user" }).end();
            }
            })
            .catch((err) => {
            res.status(500).json({ message: "error" }).end();
            });
        }
});
server.delete("api/accounts/:id", (req, res) => {
const id = req.params.id

db("accounts").where({ id }).del().then(num => {

    if(num = 1){
        res.status(204).json({message: "Succesfully deleted"}).end()
    }else{
        res.status(404).json({message: "We are unable to fin you delete request"}).end()
    }
})
.catch(err => {
    res.status(500).json({message: "Oh No!"}).end()
})
});


module.exports = server;