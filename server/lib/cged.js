'use strict';

var mongoose = require('mongoose');
exports.CGED = CGED;

function CGED(model) {
  var crudModel = {
    getAll: getAll,
    create: create,
    editById: editById,
    getById: getById,
    deleteById: deleteById
  };

  return crudModel;

  function getAll(req, res) {
    model.find(function(err, user) {
      res.json(user);
    });
  };

  function create(req, res) {
    var modelCreate = new model(req.body);
    modelCreate.save(function(err, userSaved) {
      if(err) {
        return res.status(500).send(err);
      }
      return res.status(201).json(userSaved);
    });
  };


  function editById(req, res) {
    model.findOne({ "_id": req.params.id }, function(err, user) {
      if(err) {
        res.status(500).send(err);
        return;
      }
      user = req.body;
      user.save(function(errSave, newuser) {
        if(errSave) {
          res.status(500).send(errSave);
          return;
        }
        return res.status(200).json(newuser);
      });

    });
  };

  function getById(req, res) {
    model.findOne({ "_id": req.params.id }, function(err, user) {
      if(err) {
        return res.status(500).send(err);
      }

      return res.status(200).json(user);
    });
  };

  function deleteById(req, res) {
    model.remove({ "_id": req.params.id }, function(err, user) {
      if(err) {
        return res.status(500).send(err);
      }

      return res.status(200).json({ message: "success" });
    });
  };
}