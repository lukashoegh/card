export default class Option<T> {
    public valueIsPresent: boolean;
    private value: T;

    constructor(value?: T) {
        if (value === undefined) {
            this.valueIsPresent = false;
            this.value = null;
        }
        else {
            this.valueIsPresent = true;
            this.value = value;
        }
    }

    public getValue(): T {
        if (this.valueIsPresent) return this.value;
        else throw new ReferenceError("Tried to access value of empty option");
    }
}