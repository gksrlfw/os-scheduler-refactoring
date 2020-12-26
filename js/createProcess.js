const processInfoBean = require("./processInfoBean");

class createProcess {
    constructor(at, bt) {
        this.process = this.setProcessInfo(at, bt);
    }
    setProcessInfo(at, bt) {
        
        let process = [];
        for(let i=0; i<at.length; i++) {            
            process.push(new processInfoBean());
            process[i].setProcessNumber(i);
            process[i].setProcessId("p"+i);
            process[i].setArrivalTime(at[i]);
            process[i].setBurstTime(bt[i]);
            process[i].setBeforeBurstTime(bt[i]);
            process[i].setWaitingTime(0);
            process[i].setTurnAroundTime(0);
            process[i].setNormalizedTT(0);
        }
        return process;
    }
    getPorcess() {
        return this.process;
    }

}

function test() {
    let at = [1,2,3];
    let bt = [4,5,6];
    
    let a = new createProcess(at, bt);
    console.log(a.getPorcess());
}
// test();
module.exports = createProcess;