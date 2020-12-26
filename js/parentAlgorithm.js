class parentAlgorithm {
    constructor(processList) {
        this.queue = [];
        this.printQueue = [];
        this.time = 0;
        this.count = 0;
        this.processList = processList;
        //this.getResult(this.queue, this.printQueue, this.time, this.count, this.processList);
    }

    getResult(queue, printQueue, time, count, processList) {
        while(true){
            console.log(count, processList.length);
            
            
            this.insertProcessInQueue(processList, time, queue);
            if(queue.length !== 0) count = this.increasedTTAndCheckFirst(queue, printQueue, count, processList);    // check birst time of first index if queue have process
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

    insertProcessInQueue(processList, time, queue) {
        for(let i=0; i<processList.length; i++) {
            if(time === processList[i].getArrivalTime())
                queue.push(processList[i]);
        }
    }

    increasedTTAndCheckFirst(queue, printQueue, count, processList) {
        for(let i=0; i<queue.length; i++)
            queue[i].upTurnAroundTime();

        let temp = queue[0].getBeforeBurstTime();
        queue[0].downBurstTime();
        printQueue.push(queue[0].getProcessId()+"a");

        if(queue[0].getBurstTime() === 0) {        
            this.addInfo(processList, queue[0].getProcessNumber(), temp, queue[0].getTurnAroundTime()-temp, queue[0].getTurnAroundTime());
            queue.shift();
            count++;
        }
        return count;
    }

    addInfo(processList, index, x, y, z) {        
        processList[index].setBurstTime(x);
        processList[index].setWaitingTime(y);
        processList[index].setTurnAroundTime(z);
        processList[index].setNormalizedTT((z/x).toFixed(1));
    }
    getProcessList() {
        return this.processList;
    }
    setProcessList(p) {
        this.processList = p;
    }
    getPrintQueue() {
        return this.printQueue;
    }
    setPrintQueue(p) {
        this.printQueue = p
    }
    swap(a, i, j) {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}

module.exports = parentAlgorithm;