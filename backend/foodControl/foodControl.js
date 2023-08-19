const { ObjectId } = require('mongodb');
const foodModel = require('../foodModel/foodModel').foods;
const PRIVATE_KEY = "today";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.addOwner = (async (req, res) => {
    try {
        const obj = req.body;
        const password = req.body.password;
        const hashed = bcrypt.hashSync(password, 10);
        obj.password = hashed;
        const rst = await foodModel.addOwner(obj);
        res.send(rst)
    } catch (error) {
        res.send(error.message)
    }
});


exports.validateEmail = (async (req, res, next) => {
    try {
        const obj = req.body;
        const existingOwner = await foodModel.validateEmail();
        let rst = existingOwner.filter(item => item.email === obj.email)
        if (rst.length !== 0) {
            return res.send('Email already exists');
        }
        next();
        console.log(existingOwner);
        res.send(existingOwner)
    } catch (error) {
        res.send(error.message)
    }
});


exports.editOwner = async (req, res) => {
    try {
        const ownerId = req.params.ownerId;
        const obj = req.body;
        const rst = await foodModel.editOwner(ownerId, obj);
        res.send(rst);
    } catch (error) {
        res.send(error.message);
    }
};


exports.deleteOwner = async (req, res) => {
    try {
        const { ownerId } = req.params;
        const rst = await foodModel.deleteOwner(ownerId);
        res.send(rst);
    } catch (error) {
        res.send(error.message)
    }
};


exports.getOwners = async (req, res) => {
    try {
        const rst = await foodModel.getOwners();
        res.send(rst)
    } catch (error) {
        console.log(error.message);
        res.send(error.message)

    }
};



exports.addFoods = (async (req, res) => {
    try {
        const ownerId = req.params.ownersId;
        const obj = req.body;
        obj._id = new ObjectId();
        obj.date = new Date().toLocaleDateString();
        const rst = await foodModel.addFoods(ownerId, obj);
        res.send(rst)
    } catch (error) {
        res.send(error.message)
    }
});


exports.editFood = (async (req, res) => {
    try {
        const { foodId, ownersId } = req.params;
        const obj = req.body;
        const rst = await foodModel.editFood(ownersId, foodId, obj);
        res.send(rst);
    } catch (error) {
        res.send(error.message);
    }
});


exports.deleteFood = (async (req, res) => {
    try {
        const { foodId, ownersId } = req.params;
        const rst = await foodModel.deleteFood(ownersId, foodId);
        res.send(rst);
    } catch (error) {
        res.send(error.message)
    }
});


exports.viewAllFoods = (async (req, res) => {
    try {
        const ownersId = req.params.ownersId;
        const rst = await foodModel.viewAllFoods(ownersId);
        res.send(rst);
    } catch (error) {
        res.send(error.message)
    }
});


exports.addNotes = (async (req, res) => {
    try {
        const ownerId = req.params.ownersId;
        const obj = req.body;
        const rst = await foodModel.addNotes(ownerId, obj);
        res.send(rst)
    } catch (error) {
        res.send(error.message)
    }
});


exports.editNote = (async (req, res) => {
    try {
        const ownerId = req.params.ownersId;
        const nCode = req.params.code;
        const obj = req.body;
        const rst = await foodModel.editNote(ownerId, nCode, obj);
        res.send(rst);
    } catch (error) {
        res.send(error.message);
    }
});


exports.deleteNote = (async (req, res) => {
    try {
        const { ownersId, code } = req.params;
        const rst = await foodModel.deleteNote(ownersId, code);
        res.send(rst);
    } catch (error) {
        res.send(error.message)
    }
});


exports.viewAllNotes = async (req, res) => {
    try {
        console.log("ownersId");
        const ownId = new ObjectId(req.params.owne);

        const rst = await foodModel.viewAllNotes(ownId);
        res.send(rst);
    } catch (error) {
        res.send(error.message)
    }
};


exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const data = await foodModel.getOwnerByEmail(userName);
        const rst = data.find((item) => item.email === userName && bcrypt.compareSync(password, item.password));

        console.log(rst.name);
        if (!rst) {
            return res.send({ success: false, data: "Invalid username" });
        }
        const token = jwt.sign(
            {
                name: rst.name,
            }, PRIVATE_KEY
        );
        res.send({ success: true, token: token, currentUser: rst });
    } catch (error) {
        res.send(error.message);
    }
}


exports.validateTkn = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return next(new Error("Invalid token"))
        }
        const arr = req.headers.authorization.split(" ");
        if (arr.length != 2) {
            return next(new Error("Please use bearer schema"));
        }
        const token = arr[1];
        const payload = jwt.verify(token, PRIVATE_KEY);
        if (payload) {
            next();
        }
    } catch (error) {
        res.send("Invalid token");
    }
};


