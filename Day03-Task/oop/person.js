class Person {
    #email;
    #id;

    constructor(name, email, id) {
        this.name = name;
        this.email = email;
        this.id = id;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        if (typeof value !== 'string' || !value.includes('@')) {
            throw new Error('Invalid email');
        }

        this.#email = value;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        if (value === undefined || value === null || value === '') {
            throw new Error('Invalid ID');
        }

        this.#id = value;
    }

    describeRole() {
        return `${this.name} is a person`;
    }
}

module.exports = Person;
