const processInfoBean = require("./js/processInfoBean");
const createProcess = require("./js/createProcess");
const parentAlgorithm = require("./js/parentAlgorithm");
const FCFS = require("./js/FCFS");
const SPN = require("./js/SPN");
const RR = require("./js/RR");
const SRTN = require("./js/SRTN");
const HRRN = require("./js/HRRN");
const {dialog} = require('electron').remote;
const draw = require("./js/view").draw;
const informate = require("./js/view").informate;


// alert message (if I use alert in electron, Input tag will be changed like readOnly, so I can not input anything)
const empty_inputs = {
    type: 'question',                                   // Kinds
    title: 'Inputs empty',                              // title
    message: 'Arrival 혹은 Burst Time을 입력해주세요',   // message
};
const bt_error = {
    type: 'question',
    title: 'Invalid value',
    message: 'burstTime은 0 보다 큰 값을 입력하세요',
};
const empty_tm = {
    type: 'question',
    title: 'Time Limit empty',
    message: 'Time Limit을 입력해주세요',
};
const input_error = {
    type: 'question',
    title: 'Invalid value',
    message: '모든 입력값은 1000000 이하로 입력하세요',
};
const empty_qt = {
    type: 'question',
    title: 'Quantums empty',
    message: '퀀텀을 입력하세요',
};
const switching_TLS = {
    type: 'question',
    title: 'TLS Error',
    message: 'TLS를 사용하려면 처음부터 선택 후 TIMELIMT를 입력해주세요',
};
const empty_error = {
    type: 'question',
    title: 'empty Error',
    message: '프로세스를 입력해주세요',
};
const over_process_num = {
    type: 'question',
    title: 'process Error',
    message: '프로세스 개수가 15개를 초과합니다',
};

// Colors for animation
const BLACK = 'black';  // if printQueue has "X"
const COLORS = ['#8F8681', '#E4B660', '#7BC5AE', '#85B8CB', '#A46843', '#9BCFB8', '#FE7773', '#FCD3D1', '#A13E97', '#40686A', '#19B3B1', '#BDBDBF', '#1E646E', '#B98D72', '#EAD6BD'];

// Find tag for code
const createTag = str => document.createElement(str);
const findTag = str => document.querySelector(str);
const inputs = document.querySelectorAll('.inputs');         // at, bt, quantum input
const processT = findTag('#process table');                  // process table
const btnAdd = findTag('.btnAdd');                           // add button
const reset = findTag('.reset');                             // reset button
const quantumName = findTag('.quantum');                     // quantum name
const quantumInput = document.getElementById('quantum');     // quantum value
const btnStart = findTag('.btnStart');

let processNumber = 0;          // Remember How many process are coming
let at = [];                    // For arrival time (under 1000000)
let bt = [];                    // For burst time (under 1000000)
let text = ""                   // For algorithm name


// Show the quantum input box if the algorithm is RR
window.addEventListener('click', (e) => {
    e.preventDefault();
    text = selectAlgorithm();
    if(text === 'RR' || text === 'RR multi') {
        quantumName.style.display ='inline';
        quantumInput.style.display ='inline';
    }
    else {
        quantumName.style.display ='none';
        quantumInput.style.display ='none';
    }
});


// Click reset button
reset.addEventListener('click', (e) => {
    location.reload();
});


// Click add button
btnAdd.addEventListener('click', (e) => {
    e.preventDefault();
    text = selectAlgorithm();

    // Exception for input like empty input, over value etc...
    if(inputs[0].value==='' || inputs[1].value==='') return dialog.showMessageBox(null, empty_inputs);
    if(inputs[1].value === '0') return dialog.showMessageBox(null, bt_error);
    if(Number(inputs[0].value) > 1000000 || Number(inputs[1].value) > 1000000 || inputs[2].value > 1000000) return dialog.showMessageBox(null, input_error);
    if(processNumber === 15) return dialog.showMessageBox(null, over_process_num);

    
    // Set process name, arrival time and birst time
    const tr = createTag('tr');
    const tdName = createTag('td');
    tdName.textContent = 'P' + processNumber;                  // Set process name
    tr.appendChild(tdName);
    let index=0;
    inputs.forEach(input => {
        if(!input.classList.value.includes('quantum')) {
            const tds = createTag('td');
            tds.textContent = input.value;
            tr.appendChild(tds);
            processT.appendChild(tr);
            if(index === 0) at.push(Number(input.value));       // set at, bt
            else bt.push(Number(input.value));
            index++;
            input.value = '';                                   
        }
    });
    document.getElementById('arrival').focus();
    processNumber++;
});

// Click start button
btnStart.addEventListener('click', (e) => {
    e.preventDefault();
    if(at.length === 0) return dialog.showMessageBox(null, empty_error);
    runAlgorithm(processNumber, at, bt);
});

// Get arrival time, burst time and core number and print scheduling result 
function runAlgorithm(size, at, bt) {
    text = selectAlgorithm();
    let coreNumber = Number(selectCores());       
    let createProcesses = new createProcess(at, bt);
    createProcesses = createProcesses.getPorcess();
    let resultOfScheduling;

    if(text === 'FCFS') resultOfScheduling = new FCFS(createProcesses);
    else if(text === 'RR') {
        if(quantumInput.value === '') return dialog.showMessageBox(null, empty_qt);
        resultOfScheduling = new RR(createProcesses, Number(quantumInput.value));
    }
    else if(text === 'HRRN') resultOfScheduling = new HRRN(createProcesses);
    else if(text === 'SPN') resultOfScheduling = new SPN(createProcesses);
    else if(text === 'SRTN') resultOfScheduling = new SRTN(createProcesses);
    else if(text === 'FCFS multi') resultOfScheduling = new FCFS_multi(createProcesses, coreNumber);
    else if(text === 'SPN multi') resultOfScheduling = new SPN_multi(createProcesses, coreNumber);
    else if(text === 'HRRN multi') resultOfScheduling = new HRRN_multi(createProcesses, coreNumber);
    else if(text === 'SRTN multi') resultOfScheduling = new SRTN_multi(createProcesses, coreNumber);
    else if(text === 'RR multi') {
        if(quantum.value === '') return dialog.showMessageBox(null, empty_qt);
        resultOfScheduling = new RR_multi(createProcesses, quantum_input.value, coreNumber);
    }
    draw(resultOfScheduling.getPrintQueue());        // Draw printQueue like chart
    informate(resultOfScheduling.processList);       // Draw scheduling result
}

// Get algorithm name
function selectAlgorithm() {
    const numSelect = document.getElementById('algorithm');
    const text = numSelect.options[findTag('#algorithm').selectedIndex].text;
    return text;
}

// Get core number
function selectCores() {
    const numSelect = document.getElementById('cores');
    const text = numSelect.options[findTag('#cores').selectedIndex].text;
    return text;
}

// Input restriction but enter key and number
function numKeyCheck(e) {
    let keyValue = event.keyCode;
    if(((keyValue >= 48) && (keyValue <= 57)) || keyValue === 13) return true;
    else return false;
}

///////////////////////////////////////////////////////////












































// let at = [0,1,3,5,6];
// let bt = [3,7,2,5,3];

// let processList = new createProcess(at, bt);

// function testParent() {
//     let result = new parentAlgorithm(processList.getPorcess());
//     console.log(result.getPrintQueue());
// }

// function testFCFS() {
//     let result = new FCFS(processList.getPorcess());
//     console.log(result.getPrintQueue());
// }

// function testRR() {
//     let result = new RR(processList.getPorcess(), quantum=2);
//     console.log(result.getPrintQueue());
// }

// function testSPN() {
//     let result = new SPN(processList.getPorcess());
//     console.log(result.getPrintQueue());
// }

// function testSRTN() {
//     let result = new SRTN(processList.getPorcess());
//     console.log(result.getPrintQueue());
// }

// function testHRRN() {
//     let result = new HRRN(processList.getPorcess());
//     console.log(result.getPrintQueue());
// }

// testParent();
// testFCFS();
// testRR();
// testSPN();
// testSRTN();
// testHRRN();


// function countP(count) {
//     count+=1;
// }
// function b(a) {
//     a[1]=5;
// }
// function test5() {
//     let count = 0;
//     let a = [1,2,3];
//     countP(count);
//     b(a);
//     console.log(count, a);
    
// }
// test5();



function test6() {
    let a = [1,3,2,4,5];
    // a.sort((p1, p2) => p1-p2);

    a.sort(function(p1, p2) {
        return p1-p2;
    });
    console.log(a);
    
}

