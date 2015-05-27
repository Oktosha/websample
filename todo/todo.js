var $; /* jQuery global variable */
var console;

$(document).ready(function () {
    'use strict';
    function Todo(todo, checked) {
        this.todo = todo;
        this.checked = checked;
    }
    Todo.prototype.addToDOM = function (add_method) {
        $('.todolist ul')
            [add_method](
                '<li><input type="checkbox" '
                    + this.checked
                    + '> <p>'
                    + this.todo
                    + '</p><form class="change-current">'
                    + '<input type="submit" value="Edit">'
                    + '<input type="submit" value="Delete">'
                    + '</form></li>'
            );
    };
    
    var todos = [new Todo('find coworking', 'checked'),
                 new Todo('find work', '')],
        i;
    for (i = 0; i < todos.length; i += 1) {
        todos[i].addToDOM('append');
    }
    console.log(JSON.stringify(todos));
    
    $(document).on('click', 'input[value="Delete"]', function () {
        var cur_element = $(this).parents('li');
        todos.splice($('li').index(cur_element), 1);
        cur_element.fadeOut();
        cur_element.remove();
        event.preventDefault();
        console.log(JSON.stringify(todos));
    });
    $(document).on('click', 'input[value="Edit"]', function () {
        console.log($(this).parents('li').children('p').text());
        event.preventDefault();
    });
    $(document).on('submit', '.change-current', function (event) {
        event.preventDefault();
    });
    $('.add-todo').submit(function (event) {
        var item = new Todo($('.add-todo input').val(), '');
        todos.splice(0, 0, item);
        item.addToDOM('prepend');
        event.preventDefault();
        console.log(JSON.stringify(todos));
    });
});