var $; /* jQuery global variable */
var console;

$(document).ready(function () {
    'use strict';
    
    var todos = [],
        i;
    
    function Todo(todo, checked) {
        this.todo = todo;
        this.checked = checked;
    }
    
    Todo.prototype.addToDOM = function (add_method) {
        $('.todolist ul')[add_method](
            '<li><input type="checkbox" '
                + this.checked
                + '> <p contenteditable="true">'
                + this.todo
                + '</p><form class="change-current">'
                + '<input type="submit" value="Delete">'
                + '</form></li>'
        );
    };
    
    function deleteItem(item) {
        todos.splice($('li').index(item), 1);
        item.fadeOut('slow', function () {
            $(this).remove();
        });
        
    }
    
    for (i = 0; i < todos.length; i += 1) {
        todos[i].addToDOM('append');
    }
    
    $(document).on('click', 'input[value="Delete"]', function (event) {
        var cur_element = $(this).parents('li');
        deleteItem(cur_element);
        event.preventExtensions();
        event.preventDefault();
    });
    
    $(document).on('click', 'input[value="Edit"]', function () {
        $(this).parents('li').find('p').attr('contenteditable', 'true');
    });
    
    $(document).on('click', 'input[type="checkbox"]', function (event) {
        event.preventExtensions();
    });
    
    $(document).on('submit',
                   '.change-current, .change-all',
                   function (event) {
            event.preventDefault();
        });
    
    $('.add-todo').submit(function (event) {
        var item = new Todo($('.add-todo input').val(), '');
        todos.splice(0, 0, item);
        item.addToDOM('prepend');
        event.preventDefault();
        $('.add-todo input').val('');
    });
    
    $(document).on('click', 'li', function () {
        $(this).find('p').focus();
    });
    
    $(document).on('click', 'input[value="Mark all"]', function () {
        $('input[type="checkbox"]').prop('checked', true);
    });
    
    $(document).on('click', 'input[value="Clear complete"]', function () {
        console.log('clear complete');
        $('input[type="checkbox"]:checked')
            .parents('li').each(function () {
                deleteItem($(this));
            });
    });
});