/*
When we need an object to represent a command
When we need an undo/rallback
Marco recording

Command pattern = object which represents an instruction to represent an action
*/

let Action = Object.freeze({
    deposit: 0,
    withdraw: 1,
    getActionDescriptionByCode(code) {
        switch (code) {
            case Action.deposit:
                return 'deposit';
            case Action.withdraw:
                return 'withdraw';
        }
    }
});

// I would like to count retries
class Command {
    constructor(action, amount) {
        this.action = action;
        this.amount = amount;
        this.success = false;
    }
}

class Account {
    constructor() {
        this.balance = 0;
    }

    process(cmd) {

        console.log(`Command ${Action.getActionDescriptionByCode(cmd.action)} started`);
        switch (cmd.action) {
            case Action.deposit:
                this.balance = this.balance + cmd.amount;
                cmd.success = true;
                console.log(`Command ${Action.getActionDescriptionByCode(cmd.action)} succeded`);
                return;
            case Action.withdraw:
                if (this.balance < cmd.amount) {
                    cmd.success = false;
                    console.log(`Command ${Action.getActionDescriptionByCode(cmd.action)} failed`);
                    return;
                } else {
                    this.balance = this.balance - cmd.amount;
                    cmd.success = true;
                    console.log(`Command ${Action.getActionDescriptionByCode(cmd.action)} succeded`);
                    return;
                }
        }
        return;
    }
}


let account = new Account(100);

// Like transaction
let cmd1 = new Command(Action.deposit, 50);
account.process(cmd1);
console.log(account.balance);
console.log(cmd1.success);


let cmd2 = new Command(Action.withdraw, 1100);
account.process(cmd2);
console.log(account.balance);
console.log(cmd2.success);


