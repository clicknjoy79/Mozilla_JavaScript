// 모든 오브젝트에는 __proto__ property가 존재한다.
// 단, Object.prototype 오브젝트에는 __proto__ 가 존재하지 않는다
var idCounter = 1;

function Employee(name, dept) {
    this.name = name || '';
    this.dept = dept || 'general';
    this.id = idCounter++;
}

function Manager(name, dept, reports) {
    Employee.call(this, name, dept);
    this.reports = reports || [];
}
Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager;

function WorkerBee(name, dept, projects) {
    Employee.call(this, name, dept);
    this.projects = projects || [];
}
WorkerBee.prototype = Object.create(Employee.prototype);
WorkerBee.prototype.constructor = WorkerBee;

function SalesPerson(name, projects, quota) {
    WorkerBee.call(this, name, 'sales', projects);
    this.quota = quota || 100;
}
SalesPerson.prototype = Object.create(WorkerBee.prototype);
SalesPerson.prototype.constructor = SalesPerson;

function Engineer(name, projects, machine) {
    WorkerBee.call(this, name, 'engineering', projects);
    this.machine = machine || '';
}
Engineer.prototype = Object.create(WorkerBee.prototype);
Engineer.prototype.constructor = Engineer;

var vayne = new SalesPerson('Vayne, Alice', ['Spring Data'], 70);
var chris = new Engineer('Pigman, Chris', ['jsd'], 'fiji');
console.log(chris);

console.log(chris.__proto__ == Engineer.prototype); // true
console.log(chris.__proto__.__proto__ == WorkerBee.prototype); // true
console.log(chris.__proto__.__proto__.__proto__ == Employee.prototype);  // true
console.log(chris.__proto__.__proto__.__proto__.__proto__ == Object.prototype); // true
console.log(chris.__proto__.__proto__.__proto__.__proto__.__proto__ == null);  // true

function instanceOf(object, constructor) {
    object = object.__proto__;
    while (object != null) {
        if (object == constructor.prototype)
            return true;
        if (typeof object == 'xml') {
            return constructor.prototype == XML.prototype;
        }
        object = object.__proto__;
    }
    return false;
}

console.log(instanceOf(chris, Engineer));   // true
console.log(instanceOf(chris, WorkerBee));  // true
console.log(instanceOf(chris, Employee));   // true
console.log(instanceOf(chris, Object));     // true

console.log(instanceOf(chris, SalesPerson));    // false

console.log(chris.id);  // 2
console.log(vayne.id);  // 1
console.log(idCounter);     // 3
console.log(vayne);



























