class processInfoBean {
    constructor(processNumber=0, processId=null, arrivalTime=0, burstTime=0, waitingTime=0, turnAroundTime=0, beforeBurstTime=0, normalizedTT=0) {
        this.processNumber = processNumber;
        this.processId = processId;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.waitingTime = waitingTime;
        this.turnAroundTime = turnAroundTime;
        this.beforeBurstTime = beforeBurstTime;
        this.normalizedTT = normalizedTT;
    }

    getProcessNumber() {
        return this.processNumber;
    }
    setProcessNumber(processNumber) {
        this.processNumber = processNumber;
    }

    getProcessId() {
        return this.processId;
    }
    setProcessId(processId) {
        this.processId = processId;
    }

    getArrivalTime() {
        return this.arrivalTime;
    }
    setArrivalTime(arrivalTime) {
        this.arrivalTime = arrivalTime;
    }
    getBurstTime() {
        return this.burstTime;
    }
    setBurstTime(burstTime) {
        this.burstTime = burstTime;
    }
    downBurstTime() {
        this.burstTime -= 1;
    }
    getBeforeBurstTime() {
        return this.beforeBurstTime;
    }
    setBeforeBurstTime(beforeBurstTime) {
        this.beforeBurstTime = beforeBurstTime;
    }
    getWaitingTime() {
        return this.waitingTime;
    }
    setWaitingTime(waitingTime) {
        this.waitingTime = waitingTime;
    }
    getTurnAroundTime() {
        return this.turnAroundTime;
    }
    setTurnAroundTime(turnAroundTime) {
        this.turnAroundTime = turnAroundTime;
    }
    upTurnAroundTime() {
        this.turnAroundTime += 1;
    }
    getNormalizedTT() {
        return this.normalizedTT;
    }
    setNormalizedTT(normalizedTT) {
        this.normalizedTT = normalizedTT;
    }
}

function test() {
    let a = new processInfoBean(1,2,3,4,5);
    console.log(a.getTurnAroundTime());
    a.upTurnAroundTime();
    console.log(a.getTurnAroundTime());
    
}

module.exports = processInfoBean;