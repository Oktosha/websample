/*global $ */
$(document).ready(function () {
    'use strict';
    function Todo(todo, checked) {
        this.todo = todo;
        this.checked = checked;
    }
    var todos = [new Todo("find coworking", "checked"),
                 new Todo("find work", "")],
        i;
    for (i = 0; i < todos.length; i += 1) {
        $('.todolist ul')
            .append(
                '<li><input type="checkbox" '
                    + todos[i].checked
                    + '> <p>'
                    + todos[i].todo
                    + '</p><form class="change-current">'
                    + '<input type="submit" value="Edit">'
                    + '<input type="submit" value="Delete">'
                    + '</form></li>'
            );
    }
});