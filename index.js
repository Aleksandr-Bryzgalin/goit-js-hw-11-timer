const refs = {
    timerIdRef: document.querySelector('#timer-1'),
    daysRef: document.querySelector('[data-value="days"]'),
    hoursRef: document.querySelector('[data-value="hours"]'),
    minsRef: document.querySelector('[data-value="mins"]'),
    secsRef: document.querySelector('[data-value="secs"]'),
}

class CountdownTimer {
    constructor({onTick, targetDate, selector}) {
        this.timer = selector;
        this.onTick = onTick;
        this.targetDate = targetDate;
        this.start();        
    }

    start() {
        setInterval(() => {
            const startTime = Date.now()
            const deltaTime = this.targetDate - startTime ;
            const time = this.getTimeComponents(deltaTime);
            
            this.onTick(time);                                               
        }, 1000);
    }

    getTimeComponents(time) {
        const days = this.dubleNumbersPad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.dubleNumbersPad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.dubleNumbersPad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.dubleNumbersPad(Math.floor((time % (1000 * 60)) / 1000));

        return {days, hours, mins, secs}
    }

    dubleNumbersPad(value) {
        return String(value).padStart(2, '0');
    }

    
}


function updateClockfase({ days, hours, mins, secs }) {
    refs.daysRef.textContent = `${days}`;
    refs.hoursRef.textContent = `${hours}`;
    refs.minsRef.textContent = `${mins}`;
    refs.secsRef.textContent = `${secs}`
}


new CountdownTimer({
   selector: '#timer-1',
   targetDate: new Date('Jan 1, 2022'),
   onTick: updateClockfase,
});

