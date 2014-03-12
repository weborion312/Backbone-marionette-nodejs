var mongoose = require( 'mongoose' );

var TaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String }
});

mongoose.connect('mongodb://localhost/todogl');

mongoose.model('task', TaskSchema);
