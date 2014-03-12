var DbHandler = function () {
    var MAIN_URL = "http://local.todo.gl:2345";

    this.action = {
        syncList: {
            name: "/sync_list",
            type: "POST"
        }
    }


    this.callUrl = function (action, onSuccess, onError, postParams) {
        postParams = typeof postParams !== 'undefined' ? postParams : {};
        postParams.user = CLIENT;
        var postParamsStr = JSON.stringify(postParams);
        console.log("here i am ");
        $.ajax({
            url: MAIN_URL + action.name,
            type: action.type,
            data: postParamsStr,
            dataType: "text",
            contentType: "application/json",
            success: function (data) {
                console.log("success!");
                console.log(data);
                var parsedData = JSON.parse(data);
                onSuccess.call(parsedData);
            },
            error: function (xhr, msg, err) {
                console.log("error!");
                console.log(msg, err);
                onError.call();
            }

        });
    }
}