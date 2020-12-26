const parentAlgorithm = require("./parentAlgorithm");

class RR extends parentAlgorithm {
    constructor (processList, quantum) {
        super(processList);
        this.quantum = quantum;
        this.getResult(this.queue, this.printQueue, this.time, this.count, this.processList, this.quantum);
    }

    getResult(queue, printQueue, time, count, processList, quantum) {
        let Qcount = 0;
        while(true) {
            super.insertProcessInQueue(processList, time, queue);
        
            if(Qcount === quantum) {
                queue.push(queue[0]);
                queue.shift();
                Qcount = 0;
            }
            let temp;
            if(queue.length !== 0) {
                for(let i=0; i<queue.length; i++) 
                    queue[i].upTurnAroundTime();
                temp = queue[0].getBeforeBurstTime();
                queue[0].downBurstTime();
                printQueue.push(queue[0].getProcessId()+"a");
                Qcount++;
                
                if(queue[0].getBurstTime() === 0) {
                    this.addInfo(processList, queue[0].getProcessNumber(), temp, queue[0].getTurnAroundTime()-temp, queue[0].getTurnAroundTime());
                    queue.shift();
                    count++;
                    Qcount = 0;
                }
            }
            else {
                for(let i=0; i<processList.length; i++){
                    if(time === processList[i].getArrivalTime())
                        queue.push(processList[i]);
                }
                if(queue.length !== 0) {
                    for(let i=0; i<queue.length; i++)
                        queue[i].upTurnAroundTime();
                    temp = queue[0].getBeforeBurstTime();
                    queue[0].downBurstTime();
                    printQueue.push(queue[0].getProcessId()+"a");
                    Qcount++;
                }
                if(queue.length === 0) printQueue.push('X');
            }
            if(count === processList.length) break;
            time++;
        }
        this.queue = queue;
        this.printQueue = printQueue;
        this.time = time;
        this.count = count;
        this.processList = processList;
    }
}

module.exports = RR;