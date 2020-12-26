const parentAlgorithm = require("./parentAlgorithm");

// SPN decided priority with birst time which is the only different with parentAlgorithm
class SPN extends parentAlgorithm {
    constructor (processList) {
        super(processList);
        this.getResult(this.queue, this.printQueue, this.time, this.count, this.processList);
    }
    
    getResult(queue, printQueue, time, count, processList) {
        while(true){
            super.insertProcessInQueue(processList, time, queue);
            if(queue.length>0 && queue[0].getBeforeBurstTime()==queue[0].getBurstTime()) this.setPriority(queue);   // non preemptive algorithm
            if(queue.length !== 0) count = this.increasedTTAndCheckFirst(queue, printQueue, count, processList);
            else printQueue.push("X");
            if(count === processList.length) break;
            time++;
        }
        this.queue = queue;
        this.printQueue=printQueue;
        this.time=time;
        this.count=count;
        this.processList=processList;
    }

    // only check birst time
    // Just sorted by arrival time if there are many same birst time.
    setPriority(processList) {
        processList.sort((p1, p2) => p1.getBeforeBurstTime() - p2.getBeforeBurstTime());
        for(let i=0; i<processList.length; i++) {
            for(let j=0; j<i; j++) {
                if(processList[i].getBeforeBurstTime() !== processList[j].getBeforeBurstTime()) break;
                if(processList[i].getBeforeBurstTime() === processList[j].getBeforeBurstTime()
                && processList[i].getArrivalTime() < processList[j].getArrivalTime())
                    super.swap(processList, i, j);
            }
        }
    }
}

module.exports = SPN;