
// Draw chart
function draw(queue) {
    const table = findTag('#animation table');
    const trTime = createTag('tr');
    const trAni = createTag('tr');
    let time = 0;                       // check time
    let index = 0;                      // check index of queue
    text = selectAlgorithm();

    // record kinds of algorithm
    const name = createTag('tr');
    name.textContent = text;
    name.style.borderTop = 'hidden';
    table.append(name);

    // record time
    while(index<queue.length) {
        const td = createTag('td');
        let str = "" + queue[index];                         // queue[index] : 프로세스 이름
        if(str === 'X') td.textContent = time++;             // X 일때 = 프로세스 실행이 없을 때 => 따로 처리한다.

        // 멀티코어에서 각각의 코어에서 같은 시간에 일했다면 출력값이 P1a, P2b, P3c ... 이런식으로 출력됨
        // 만약 P1a, P2a, P3a ... 이런식으로 a밖에 없다면 코어 하나에서 실행된 것을 의미
        if(str.indexOf('a')>-1) td.textContent = time++;
        if(str.indexOf('b')>-1) td.textContent = time-1;
        if(str.indexOf('c')>-1) td.textContent = time-1;
        if(str.indexOf('d')>-1) td.textContent = time-1;
        trTime.appendChild(td);
        index++;
    }
    table.appendChild(trTime);
    let i = 1;                                                                  // queue의 진행 상태를 위한 인덱스
    const td = createTag('td');
    while(true) {
        const td = createTag('td');
        if (queue[i - 1] !== 'X') queue[i - 1] = queue[i - 1].slice(0, -1);              // X 일때는 따로 slice하지 않는다
        td.textContent = queue[i - 1];
        trAni.appendChild(td);
        if (queue[i - 1] === 'X') td.style.backgroundColor = BLACK;                     // 작업하지 않을 경우 black
        else td.style.backgroundColor = COLORS[Number(queue[i - 1].slice(1))];          // 프로세스 번호마다 색을 부여한다.
        i++;
        if(i===queue.length+1) break;
    }
    table.appendChild(trAni);
}

// Draw at, bt, wt, tt and ntt
function informate(queue) {
    const table = findTag('#result table');
    const tr2 = createTag('tr');
    for(let i=0; i<queue.length; i++) {
        const tr = createTag('tr');
        let td = createTag('td');
        td.textContent = queue[i].getProcessId();
        tr.appendChild(td);
        td = createTag('td');
        td.textContent = queue[i].getArrivalTime();
        tr.appendChild(td);
        td = createTag('td');
        td.textContent = queue[i].getBurstTime();
        tr.appendChild(td);
        td = createTag('td');
        td.textContent = queue[i].getWaitingTime();
        tr.appendChild(td);
        td = createTag('td');
        td.textContent = queue[i].getTurnAroundTime();
        tr.appendChild(td);
        td = createTag('td');
        td.textContent = queue[i].getNormalizedTT();
        tr.appendChild(td);
        if (i === queue.length - 1)
            tr.style.borderBottom = '10px solid grey';

        table.appendChild(tr);
    }
}

module.exports = { draw, informate };