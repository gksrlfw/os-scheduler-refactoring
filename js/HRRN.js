const parentAlgorithm = require("./parentAlgorithm");



class HRRN extends parentAlgorithm {
    constructor (processList) {
        super(processList);
        this.getResult(this.queue, this.printQueue, this.time, this.count, this.processList, this.quantum);
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

    // check birst time and waiting time (aging)
    // Just sorted by arrival time if there are many same birst time.
    setPriority(processList) {

        processList.sort(function(p1, p2) {
            if((p1.getBeforeBurstTime()+p1.getTurnAroundTime())/p1.getBeforeBurstTime() <
                (p2.getBeforeBurstTime()+p2.getTurnAroundTime())/p2.getBeforeBurstTime())
                return 1;
            if((p1.getBeforeBurstTime()+p1.getTurnAroundTime())/p1.getBeforeBurstTime() >
                (p2.getBeforeBurstTime()+p2.getTurnAroundTime())/p2.getBeforeBurstTime())
                return -1;
            return 0;
        });


        // processList.sort((p1, p2) => {
        //     (p1.getBeforeBurstTime()+p1.getTurnAroundTime())/p1.getBeforeBurstTime() >
        //     (p2.getBeforeBurstTime()+p2.getTurnAroundTime())/p2.getBeforeBurstTime() ? 1 : -1
        // });

    
        for(let i=0; i<processList.length; i++) {
            for(let j=0; j<i; j++) {
                //if(processList[i].getBeforeBurstTime() !== processList[j].getBeforeBurstTime()) break;
                if(processList[i].getBeforeBurstTime() === processList[j].getBeforeBurstTime()
                && processList[i].getArrivalTime() < processList[j].getArrivalTime())
                    super.swap(processList, i, j);
            }
        }
    }
}

module.exports = HRRN