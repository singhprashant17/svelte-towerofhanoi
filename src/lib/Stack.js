class Stack {

    // Array is used to implement stack 
    constructor(name, items = []) {
        this.items = items;
        this.name = name
    }
    // push function 
    push(element) {
        // push element into the list items 
        this.items.push(element);
    }
    // pop function 
    pop() {
        if (this.items.length == 0)
            return "Underflow";
        let pop = this.items.pop()
        return pop;
    }

    // isEmpty function 
    isEmpty() {
        // return true if stack is empty 
        return this.items.length == 0;
    }

    // peek function 
    peek() {
        return this.items[this.items.length - 1];
    }

    length() {
        return this.items.length;
    }

    getAsArray() {
        let newArray = this.items.slice();
        return newArray
    }
}
export default Stack
