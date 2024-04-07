#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
let todos = [];
let conditions = true;
while (conditions) {
    let options = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "Select one option:",
            choices: ["Add", "View", "Update", "Delete", "Exit"],
        },
    ]);
    //Add task in the todo list
    let todoAdded = false;
    if (options.select === "Add") {
        while (!todoAdded) {
            let addTodo = await inquirer.prompt([
                {
                    name: "todo",
                    type: "input",
                    message: "Add your task to list:",
                },
            ]);
            // to validate that user enter input or not
            if (addTodo.todo.trim() === "") {
                console.log("Please enter your task into the list");
            }
            else {
                todos.push(addTodo.todo);
                todoAdded = true;
                todos.forEach((todo, index) => console.log(chalk.magentaBright(`${index + 1}. ${todo}`)));
            }
        }
    }
    // update task in the todo list
    else if (options.select === "Update") {
        let updateTodo = await inquirer.prompt([
            {
                name: "todo",
                type: "list",
                message: "Select to update",
                choices: todos.map((task) => task),
            },
        ]);
        let addToupdate = await inquirer.prompt([
            {
                name: "todo",
                type: "input",
                message: "Add task in your list:",
            },
        ]);
        let updatedTask = todos.filter((value) => value !== updateTodo.todo);
        todos = [...updatedTask, addToupdate.todo];
        todos.forEach((todo, index) => console.log(chalk.yellowBright(`${index + 1}. ${todo}`)));
    }
    //view todo list
    else if (options.select === "View") {
        todos.forEach((todo, index) => console.log(chalk.greenBright(`${index + 1}. ${todo}`)));
    }
    // delete task from todo list
    else if (options.select === "Delete") {
        let deleteTodo = await inquirer.prompt([
            {
                name: "todo",
                type: "list",
                message: "Select to delete",
                choices: todos.map((task) => task),
            },
        ]);
        let deletedtask = todos.filter((value) => value !== deleteTodo.todo);
        todos = [...deletedtask];
        todos.forEach((todo, index) => console.log(chalk.redBright(`${index + 1}. ${todo}`)));
    }
    // exiting from program
    else if (options.select === "Exit") {
        console.log(chalk.bgMagenta("Exiting program..."));
        conditions = false;
    }
}
