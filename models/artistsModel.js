//all принимает коллбек находит в бд записи и возвращает в коллбек ответ в виде объекта
var mongoose = require('mongoose');



var ObjectID = require('mongodb').ObjectID;
var db = require('C:/openserver/domains/pureNodeApi/db');

var artistsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

exports.all = function (cb) {
    db.get().collection('artists').find().toArray(
        function (err, docs) {
            cb(err, docs);
        })
};

exports.findById = function (id, cb) {
    //т.к все id_ это объекты необходимо конвертировать
    db.get().collection('artists').findOne(
        {
            _id: ObjectID(id)
        },
        function (err, doc) {
            cb(err, doc)
        }
    );
};

exports.create = function (artist, cb) {
    db.get().collection('artists').insertOne(artist, function (err, result) {
        cb(err, result);
    })
};

exports.update = function (id, newData, cb) {
    db.get().collection('artists').updateOne(
        {_id: ObjectID(id)},
        newData,
        function (err, result) {
            cb(err, result)
        }
    );
};

exports.delete = function (id, cb) {
    db.get().collection('artists').deleteOne(
        {
            _id: ObjectID(id)
        },
        function (err, result) {
            cb(err, result);
        }
    );
};

mongoose.model('artists', artistsSchema);