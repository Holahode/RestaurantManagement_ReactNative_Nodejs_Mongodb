const { MongoClient, ObjectId } = require('mongodb');
let uri = "mongodb+srv://abaynehmichael:mg330927@cluster0.rdvomzg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
let db = null;
async function main() {
    try {
        await client.connect();
        db = client.db("CS571");
        console.log("DB connected...");
    } catch (error) {
        console.log(error);
    }
}
const COLLECTION_NAME = 'finalProject-foods';

class foods {

    static async validateEmail(obj) {
        try {
            const rst = await db.collection(COLLECTION_NAME).find({}).toArray();
            return rst;
        } catch (error) {
            console.log(error);
        }
    }

    static async addOwner(obj) {
        try {

            const rst = await db.collection(COLLECTION_NAME).insertOne(obj);
            console.log(rst);
        } catch (error) {
            console.log(error);
        }
    }

    static async editOwner(oId, obj) {
        try {
            const rst = await db.collection(COLLECTION_NAME).updateOne(
                { _id: new ObjectId(oId) },

                { $set: { name: obj.name, phone: obj.phone, password: obj.password, address: obj.address } }
            )
            console.log(rst);
        } catch (error) {
            console.log(error);
        }
    }


    static async deleteOwner(id) {
        try {
            const rst = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) })
            console.log(rst);
        } catch (error) {
            console.log(error);
        }
    }


    static async getOwners() {
        try {
            const rst = await db.collection(COLLECTION_NAME).find({}).toArray();
            return rst;
        } catch (error) {
            console.log(error);
        }
    }

    static async getOwnerByEmail(email) {
        try {
            const rst = await db.collection(COLLECTION_NAME).find({ email: email }).toArray();
            return rst;
        } catch (error) {
            console.log(error);
        }
    }


    static async addFoods(ownerId, obj) {
        try {
            const rst = await db.collection(COLLECTION_NAME).updateOne(
                { _id: new ObjectId(ownerId) },
                { $push: { foods: obj } });
            console.log(rst);
        } catch (error) {
            console.log(error);
        }
    }


    static async editFood(oId, fId, obj) {
        try {
            const rst = await db.collection(COLLECTION_NAME).updateOne(
                { _id: new ObjectId(oId), "foods._id": new ObjectId(fId) },

                { $set: { "foods.$.name": obj.name, "foods.$.origin": obj.origin, "foods.$.price": obj.price } }
            )
            console.log(rst);
        } catch (error) {
            console.log(error);
        }
    }


    static async deleteFood(ownersId, foodId) {
        try {
            const rst = await db.collection(COLLECTION_NAME).updateOne(
                { _id: new ObjectId(ownersId) },
                { $pull: { foods: { _id: new ObjectId(foodId) } } }
            )
            console.log(rst);
        } catch (error) {
            console.log(error);
        }
    }


    static async viewAllFoods(ownersId) {
        try {
            const rst = await db.collection(COLLECTION_NAME).find(
                { _id: new ObjectId(ownersId), "foods._id": { $exists: true } },
                { projection: { _id: 0, "foods.name": 1, "foods.price": 1, "foods.Origin": 1, } }
            ).toArray();
            return rst
            console.log(rst);

        } catch (error) {
            console.log(error);
        }
    }

    static async addNotes(ownerId, obj) {
        try {
            const rst = await db.collection(COLLECTION_NAME).updateOne(
                { _id: new ObjectId(ownerId) },
                { $push: { notes: obj } });
            console.log(rst);
        } catch (error) {
            console.log(error);
        }
    }

    static async editNote(oId, code, obj) {
        try {
            code = code;
            const rst = await db.collection(COLLECTION_NAME).updateOne(
                { _id: new ObjectId(oId), "notes.code": code },

                { $set: { "notes.$.header": obj.header, "notes.$.comment": obj.comment } }
            )
            console.log(rst);
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteNote(ownersId, code) {
        try {
            const rst = await db.collection(COLLECTION_NAME).updateOne(
                { _id: new ObjectId(ownersId) },
                { $pull: { notes: { code: code } } }
            )
            console.log(rst);
        } catch (error) {
            console.log(error);
        }
    }

    static async viewAllNotes(ownersId) {
        try {
            const rst = await db.collection(COLLECTION_NAME).find(
                { _id: ownersId, "notes.code": { $exists: true } },
                { projection: { _id: 0, "notes.header": 1, "notes.comment": 1, "notes.date": 1, "notes.date": 1 } }
            ).toArray();
            return rst
            console.log(rst);

        } catch (error) {
            console.log(error);
        }
    }















}

module.exports = { main, foods };