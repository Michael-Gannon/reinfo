function Cat(name) {
    // private variables
    message = null;

    // public variables
    this.feet = 4;
    this.friends = null;

    // private methods
    foo = function() {
    };

    // public methods
    this.callOver = function(){ alert(message); },

    intialize = function(name) {
        message = name + ' ignores you';
        this.friends[0] = new Cat('bill');
        this.friends[1] = new Cat('meg');
    };

    intialize(name);
}