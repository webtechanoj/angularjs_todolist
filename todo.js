// Created by MIZO PRO (ハムザ)

/*!
 * To-do App v1.0.2
 * Author: MizoPro
 *
 * License: MIT, (C) 2018
 */

/**
 * To-do app module
 */
const app = angular.module('todoApp', ['ngAlertify']);

/**
 * Main app controller
 */
app.controller('main', function($scope, alertify) {

    // Greeting message
    alertify
    .delay(2000)
    .success("Wecome Driver 750");

    /**
     * to-do list data
     */
    $scope.todos = [{
        text: 'Croydon',
        done: false
    },{
        text: 'Abbotsford',
        done: false
    }];

    /**
     * Add a new item
     */
    $scope.add = function() {

        const text = $scope.todoInput;

        if (!text)
            return;

        if (alreadyExist(text)) {
            alertify
            .delay(2500)
            .error("Item already exists!");
            return;
        }

        $scope.todos.push({
                text: text,
                done: false
        });

        $scope.todoInput = "";
    
        alertify
        .delay(3000)
        .success("Item was successfully added!");

    };

    /**
     * Edit an unfinished item
     *
     * @param {Object} item
     */
    $scope.edit = function(item) {

        if (item.done) {
            // items which are done, are ineditable
            alertify
            .delay(4000)
            .error("Cannot edit already finished items!");
            return;
        }
        
        const msg = "Editing item: `" +item.text+ "`";
        
        alertify
        .defaultValue(item.text)
        .prompt(msg, function(val, e) {
            if (val === item.text) {

                alertify
                .delay(2500)
                .closeLogOnClick(true)
                .log("No modification was made.");

            } else if (alreadyExist(val)) {

                alertify
                .delay(3000)
                .error("Item already exists!");

            } else if (val) {

                item.text = val;
                $scope.$apply();
                alertify
                .delay(2000)
                .success("Item was successfully edited!");

            } else {

                alertify
                .delay(3000)
                .error("Cannot edit your item!");

            }
        });
    };

    /**
     * *Permanentally* remove an item
     *
     * @param {Object} item
     */
    $scope.remove = function(item) {

        var msg = (item.done) ? 
            "Are you sure you want to delete this item." : 
            "You are about to remove an unfinished task.\nAre you sure?";

        alertify
        .confirm(msg, function() {

            const i = $scope.todos.indexOf(item);
            $scope.todos.splice(i, 1);
            $scope.$apply();

            alertify
            .delay(2000)
            .success("Item was successfully removed");

        }, function() {
    
            alertify
            .delay(1500)
            .log("Operation was aborted");

        });
    };
    
    /**
     * Check if an item already exists
     *
     * @param {String} itemText
     * @api private
     */
    function alreadyExist(itemText) {

        const duplicates = $scope
            .todos
            .filter(function (todo) {
                return itemText === todo.text;
            });

        return duplicates.length > 0;
    }
});

const HIDDEN = 'hidden';

window.onload = function() {

    var togglers = document.querySelectorAll(".js-toggler[data-target]");

    []
    .forEach
    .call(togglers, function(elem) {
        elem.addEventListener('click',
            onJsTogglerClicked,
            false);
    });

}

/**
 * Callback for clicking on toggler
 *
 * @param {Event} e
*/
function onJsTogglerClicked(e) {

    e.preventDefault();

    var targetName = this
        .getAttribute('data-target');

    var target = document
        .querySelector(".js-" + targetName);

    if (target && target.classList)
        target.classList.toggle(HIDDEN); // target.style.display = (target.style.display === "none") ? "block" : "none";

}