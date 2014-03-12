//this file is not used at the momment but has methods that we might use in the future
function findTasksExtras() {
    var FOUND_FOLDER = false;
    var initialRequest = gapi.client.drive.files.list({
        q: " title = 'todogl' and mimeType='application/vnd.google-apps.folder'",
        maxResults: 1
    });
    initialRequest.execute(function (resp) {
        if (!resp.items) {
            createFolder("todogl", function (resp) {
                TODOGL_FOlDER_ID = resp.id
            });
        } else {
            TODOGL_FOlDER_ID = resp.items[0].id;
            FOUND_FOLDER = true;
        }
        if (DEBUG) console.log("Found Folder:" + FOUND_FOLDER);
        //search for tasklists we have in google task
        for (var i = 0; i < TASK_LISTS.length; i++) {
            var taskList = TASK_LISTS[i];
            ALL_TASKS[taskList.id] = {title: taskList.title, tasks: []};
            (function (t) {
                var requestTaskFile = gapi.client.drive.files.list({
                    q: " title = '" + t.id + "'",
                    maxResults: 1
                });
                requestTaskFile.execute(function (resp) {
                    // Let's also get the task information and store in ALL_TASKS
                    if (DEBUG) console.log("requesting task file:" + t.id);
                    createTaskListObject(t, function (tasksObject) {
                        ALL_TASKS[t.id].tasks = tasksObject.tasks;
                        ALL_TASKS[t.id].title = tasksObject.title;
                        if (resp.items) {
                            console.log("found file,downloading:" + t.id);
                            downloadFile(resp.items[0], function (text) {
                                updateLocalTaskList(t.id, JSON.parse(text));
                            });
                        } else {
                            console.log("not found file,creating:" + t.id);
                            setTimeout(function () {
                                insertFile(t.id, TODOGL_FOlDER_ID, tasksObject, function (item) {

                                    downloadFile(item, function (text) {
                                        console.log("Created file, downloaded:" + text);
                                        if (text != null) {
                                            updateLocalTaskList(t.id, JSON.parse(text));
                                        }
                                    });
                                });
                            }, 2000);
                        }

                    });
                });
            })(taskList);
        }
        //fetch task lists we dont have in google task
        var shareFolderRequest = gapi.client.drive.files.list({
            q: " title = 'todogl_shared' and mimeType='application/vnd.google-apps.folder'",
            maxResults: 1
        });
        shareFolderRequest.execute(function (folders) {
            console.log("response from shared folder:", folders);
            if (!folders.items) { //if we dont have the folder there is no shared files.
                createFolder("todogl_shared", function (resp) {
                    IS_LOADED_SHARED_LISTS = true;
                    if (DEBUG) console.log("created shared folder");
                    if (!LAYOUT_DASHBOARD && TASKLISTS_UPDATED === TASK_LISTS.length)
                        layoutDashboard();
                });
            } else { //if we have the folder read the shared files and add the list as usual
                console.log('requesting child from:', folders.items[0].id);
                var childrenRequest = gapi.client.drive.children.list({
                    'folderId': folders.items[0].id
                });
                childrenRequest.execute(function (sharedListsFiles) {
                    console.log("shared files:", sharedListsFiles);
                    if (sharedListsFiles.items) {
                        for (var i = 0; i < sharedListsFiles.items.length; i++) {
                            var request = gapi.client.drive.files.get({
                                'fileId': sharedListsFiles.items[i].id
                            });

                            request.execute(function (sharedListFile) {
                                downloadFile(sharedListFile, function (text) {

                                    var parsedText = JSON.parse(text);
                                    sharedListFile.title = parsedText.title;
                                    console.log("pushing:", sharedListFile);
                                    TASK_LISTS.push(sharedListFile);
                                    IS_LOADED_SHARED_LISTS = true;
                                    updateLocalTaskList(sharedListFile.id, parsedText);
                                });
                            });
                        }
                    } else {
                        IS_LOADED_SHARED_LISTS = true;
                    }

                });
            }
        });


    });
}

function updateLocalTaskList(tasklistId, driveTaskList) {
    if (ALL_TASKS[tasklistId] === undefined)
        ALL_TASKS[tasklistId] = {title: "", tasks: []};

    var driveTasks = driveTaskList.tasks;
    var taskList = ALL_TASKS[tasklistId];
    taskList.title = driveTaskList.title;
    var taskListTasks = taskList.tasks;
    outerloop:
        for (var i = 0; i < driveTasks.length; i++) {
            var driveTask = driveTasks[i];
            for (var j = 0; j < taskListTasks.length; j++) { //maybe good to replace this with a dictionary?
                var task = taskListTasks[j];
                if (task.id === driveTask.id) {
                    for (var key in driveTask)
                        task[key] = driveTask[key]
                    continue outerloop;
                }
            }
            ALL_TASKS[tasklistId].tasks.push(driveTask);
        }
    console.log("calling from here 1")
    localTaskListsUpdated();
}


function createFolder(name, callback) {
    if (DEBUG) console.log("Creating folder:" + name);
    const boundary = '-------314159265358979323846';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";
    var contentType = 'application/vnd.google-apps.folder';
    var metadata = {
        'title': name,
        'mimeType': contentType
    };

    var multipartRequestBody =
        delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            close_delim;

    var request = gapi.client.request({
        'path': '/upload/drive/v2/files',
        'method': 'POST',
        'params': {'uploadType': 'multipart'},
        'headers': {
            'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
        },
        'body': multipartRequestBody});
    request.execute(callback)
}


function downloadFile(file, callback) {
    if (file.downloadUrl) {
        var accessToken = gapi.auth.getToken().access_token;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', file.downloadUrl);
        xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        xhr.onload = function () {
            callback(xhr.responseText);
        };
        xhr.onerror = function () {
            callback(null);
        };
        xhr.send();
    } else {
        callback(null);
    }
};

function insertFile(filename, parent, jsonObject, callback) {
    console.log("inserting: ", filename, parent);
    const boundary = '-------314159265358979323846';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";

    var content = JSON.stringify(jsonObject);
    var base64Data = btoa(content);
    var contentType = 'text/plain';
    var metadata = {
        'title': filename,
        'mimeType': contentType,
        'parents': [
            {id: parent}
        ]
    };

    var multipartRequestBody =
        delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + contentType + '\r\n' +
            'Content-Transfer-Encoding: base64\r\n' +
            '\r\n' +
            base64Data +
            close_delim;

    var request = gapi.client.request({
        'path': '/upload/drive/v2/files',
        'method': 'POST',
        'params': {'uploadType': 'multipart'},
        'headers': {
            'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
        },
        'body': multipartRequestBody});
    if (!callback) {
        callback = function (file) {

        };
    }
    request.execute(function (resp) {


        var body = {
            'value': "",
            'type': "anyone",
            'role': "writer"
        };
        var request = gapi.client.drive.permissions.insert({
            'fileId': resp.id,
            'resource': body
        });

        request.execute(function (secresp) {
            callback(resp);
        });


    });
}
