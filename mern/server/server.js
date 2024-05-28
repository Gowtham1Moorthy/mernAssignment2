const app = require("express")();
const env = require("dotenv");
const { newuser } = require("./router/newuser");
const { token } = require("./router/token");
const bodyParser = require("body-parser");
const cors = require('cors');
const { decodeToken } = require("./router/tokenDecode");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

env.config();

var users = [{ user: "gowtham", password: "g" }];
let posts = [
    {
        user: "gowtham",
        id: 1,
        image: "",
        title: "Tamil nadu",
        subject: "",
        content: `Kabaddi `,
        date: "28/05/2005",
    },
];
app.post("/signup", async (req, res) => {
    try {
        const newUser = users.find(user => user.user === req.body.user);
        if (!newUser) {
            const result = await new Promise((resolve, reject) => {
                newuser(req.body, (result) => {
                    users.push(result);
                    resolve(result);
                });
            });
            const tokens = await token(req.body.user);
            res.send({ error: false, token: tokens });
        }
    } catch (err) {
        res.send({ error: true });
    }
});

app.post("/login", async (req, res) => {
    try {
        const currentUser = users.find(user => user.user === req.body.user);
        if (currentUser && currentUser.user === req.body.user && currentUser.password === req.body.password) {
            const tokens = await token(req.body.user);
            res.send({ error: false, token: tokens });
        }
    } catch (err) {
        res.send({ error: true });
    }
});

app.post("/token", async (req, res) => {
    try {
        if (req.body.token) {
            const decode = await decodeToken(req.body.token);
            const forum = posts.filter(item => item.user === decode);
            res.send({ error: false, forum });
        }
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal server error" });
    }
});

app.get("/general", async (req, res) => {
    try {
        res.send({ forum: posts });
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal server error" });
    }
});

app.post("/newPost", async (req, res) => {
    try {
        const decode = await decodeToken(req.body.token);
        const id = posts[posts.length - 1].id + 1;
        if (decode) {
            const newpost = {
                user: decode,
                id: id,
                image: req.body.image,
                title: req.body.title,
                subject: req.body.subject,
                content: req.body.content,
                date: new Date(),
                likes: [],
                comment: [],
            }
            posts.push(newpost);
            res.send({ error: false });
        } else {
            res.send({ error: true });
        }
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal server error" });
    }
});

app.put("/edit", async (req, res) => {
    try {
        const decode = await decodeToken(req.body.token);
        if (decode) {
            const id = req.body.id;
            const postIndex = posts.findIndex(post => post.id === id);
            if (postIndex !== -1) {
                const updatedPost = {
                    user: decode,
                    id: id,
                    image: req.body.image,
                    title: req.body.title,
                    subject: req.body.subject,
                    content: req.body.content,
                    date: new Date(),
                    likes: [],
                    comment: []
                };
                posts[postIndex] = updatedPost;
                res.send({ error: false });
            } else {
                res.status(404).send({ error: true, message: "Post not found" });
            }
        } else {
            res.send({ error: true, message: "Invalid token" });
        }
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal server error" });
    }
});

app.post("/delete", async (req, res) => {
    try {
        const id = req.body.id;
        posts = posts.filter(item => item.id !== id);
        res.send({ error: false });
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal server error" });
    }
});

app.post("/findOne", async (req, res) => {
    console.log(req.body)
    try {
        const id = req.body.id;
        const item = posts.find(item => item.id === +id);
        console.log(item)
        res.send({error: false, item: item});
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal server error" });
    }
});



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server is running on port", port);
});