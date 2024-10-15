const User = require("./user.model.js");

const getAll = async (req, res) => {
    try {
        const categories = await User.find();

        return res.status(200).json(categories);
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err,
        })
    }
}

const createOne = async (req, res) => {
    try {
        const cate = await User.findOne({ username: req.body.username });
        if (cate) {
            return res.status(403).json({
                message: "Username is already exist",
            })
        }

        const newCate = await new User(req.body);
        await newCate.save();

        return res.status(200).json({
            message: "Created successfully",
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err,
        })
    }
}

const updateOne = async (req, res) => {
    try {
        const cate = await User.findById(req.params.id);
        if (!cate) {
            return res.status(403).json({
                message: "User is not exist",
            })
        }

        await cate.updateOne(req.body);

        return res.status(200).json({
            message: "Updated successfully",
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err,
        })
    }
}

const deleteOne = async (req, res) => {
    try {
        const cate = await User.findById(req.params.id);
        if (!cate) {
            return res.status(403).json({
                message: "User is not exist",
            })
        }

        await cate.deleteOne();

        return res.status(200).json({
            message: "Deleted successfully",
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err,
        })
    }
}

const getOneById = async (req, res) => {
    try {
        const cate = await User.findById(req.params.id);
        if (!cate) {
            return res.status(403).json({
                message: "User is not exist",
            })
        }

        return res.status(200).json(cate);
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err,
        })
    }
}

module.exports = {
    getAll,
    createOne,
    updateOne,
    deleteOne,
    getOneById,
}