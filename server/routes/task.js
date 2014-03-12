/**
 * Tasks controller
 *
 * @description Server API for tasks
 *
 * @author Timur Zagidullin
 */

var mongoose = require('mongoose')
    , Task = mongoose.model( 'task' )
//    , web = require('../routes/web');

exports.boot = function(app) {

    /**
     * Get tasks list
     *
     * @param {String} userId - id of the user ( req.session )
     */
    app.get('/list', function(req, res){
        Task.find({}, function(err, list) {
            if (err) {
                res.send(400)
            } else {
                res.send(list)
            }
        });
    })

    /**
     * Delete a task
     *
     * @param {String} task_id - task Id
     */
    app.del('/:task_id',  function(req, res){
        console.log('try!!!!!!!!!!!!!')
        var _id = req.params.task_id
        Task.findOne({_id: _id}, function(err, task) {
            if (err || !task) {
                res.send(400)
                return
            } else {
                task.remove()
                res.send('deleted')
            }
        });
    })

    /**
     * Update a task
     *
     * @param {String} task_id - task Id
     */
    app.put('/:task_id', function(req, res){
        var _id = req.params.task_id
            , name = req.body.name
        Task.findOne({_id: _id}, function(err, task) {
            console.log("reeee", err, task)
            if (err || !task) {
                res.send(400)
                return
            } else {
                task.name = name
                task.save()
                res.send({task: task})
            }
        })
    })

    /**
     * Create a task
     *
     * @param {String} name - name of the task
     * @param {String} userId - id of the user ( req.session )
     */
    app.post('/', function(req, res){
        var name = req.body.name || ''
        new Task({name: name}).save(function(err, new_task) {
            if (err) {
                res.send(400)
                return
            }

            res.send({
                task: new_task,
                status: 'ok'
            })
        });
    })

}