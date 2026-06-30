const Person = require('./person');

class Principal extends Person {
    constructor(name, email, id, members) {
        super(name, email, id);
        this.members = members;
    }

    addMember(member) {
        this.members.push(member);
    }

    removeMember(identifier) {
        const index = this.members.findIndex(member => member.id === identifier || member.name === identifier);

        if (index !== -1) {
            this.members.splice(index, 1);
        }
    }

    listMembers() {
        return this.members;
    }

    describeRole() {
        return `${this.name} is the principal`;
    }
}

module.exports = Principal;
