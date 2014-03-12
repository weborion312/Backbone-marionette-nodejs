var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');

describe('Routing', function() {
    var url = 'http://localhost:9000';
    before(function(done) {
        mongoose.connect('mongodb://localhost/test');
        done();
    });
    describe('Tasks', function() {
        var testTaskId
        it('should return "ok"" trying to save task', function(done) {
            var task = {
                name: 'test'
            };

            request(url)
                .post('/task')
                .send(task)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    res.body.status.should.equal('ok')
                    testTaskId = res.body.task._id
                    done();
                });
        });
        it('should return list of task', function(done) {
            request(url)
                .get('/task/list')
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    res.body.should.be.type('object')
                    res.body.length.should.not.equal(0)
                    done();
                });
        });

        it('should return task with new name', function(done) {
            request(url)
                .put('/task/'+testTaskId)
                .send({name: 'new name'})
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    res.body.task.name.should.equal('new name');
                    done();
                });
        });

        it('should return status 200', function(done) {
            request(url)
                .del('/task/'+testTaskId)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    res.text.should.equal('deleted');
                    done();
                });
        });

    });
});




























