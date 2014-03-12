var ALL_TASKS = {}; //store all tasks for future usage
var TASK_LISTS = [];
var LS_TASK_LISTS = "LS_TASK_LISTS";

var GTaskHandler = function () {


    function taskObjectFactory(params) {

        var taskObj = {
            title: "initial",
            id: "initial",
            assignee: "initial",
            location: { lat: "initial", lng: "initial"},
            parentTaskId: "initial",
            label: { color: "initial", label: "initial"},
            priority: "initial",
            files: []
        }
        for (i in params) taskObj[i] = params[i];

        return taskObj;
    }

    function createTaskListObject(taskList, callback) {
        var request = gapi.client.tasks.tasks.list({
            tasklist: taskList.id
        });

        request.execute(function (resp) {
            var listObj = {
                title: taskList.title,
                tasks: []
            };
            if (resp.items) {
                var listArray = [];
                for (var i = 0; i < resp.items.length; i++) {
                    var task = resp.items[i];
                    if (task.title.trim() == "")
                        continue;
                    var taskObj = taskObjectFactory({
                        title: task.title,
                        id: task.id,
                        status: task.status,
                        completed: task.completed,
                        updated: task.updated,
                        due: task.due
                    });
                    listArray.push(taskObj);
                }
                ;
                listObj.tasks = listArray;
                callback(listObj);
            } else {
                callback([]);
            }
        });
    }


    this.fetchTaskLists = function (successCallback, errorCallback) {
        var request = gapi.client.tasks.tasklists.list();
        var localListsCreated = 0;
        request.execute(function (resp) {
            if (resp.items) {
                for (var index = 0; index < resp.items.length; index++) {
                    (function closure(i) {
                        var t = resp.items[i];
                        TASK_LISTS.push(t);
                        ALL_TASKS[t.id] = {title: "", tasks: []};
                        createTaskListObject(t, function (tasksObject) {
                            ALL_TASKS[t.id].tasks = tasksObject.tasks;
                            ALL_TASKS[t.id].title = tasksObject.title;
                            localListsCreated++;
                            if (localListsCreated === resp.items.length) {
                                //store all tasks for offline usage
                                window.localStorage.setItem(LS_TASK_LISTS, JSON.stringify(ALL_TASKS));
                                successCallback.call();
                            }
                        });
                    })(index);
                }

            } else {
                errorCallback.call();
            }
        });
    }


    function countTaskListsLoaded() {
        var count = 0;
        for (var k in ALL_TASKS) {
            if (ALL_TASKS.hasOwnProperty(k)) {
                ++count;
            }
        }
        return count;
    }
}