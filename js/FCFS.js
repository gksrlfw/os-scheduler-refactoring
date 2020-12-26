const parentAlgorithm = require("./parentAlgorithm");

// perfectly same with parentAlgorithm
class FCFS extends parentAlgorithm {
   constructor(processList) {
       console.log("FCFS");
       
       super(processList);
       super.getResult(this.queue, this.printQueue, this.time, this.count, this.processList);
   }
}

module.exports = FCFS;