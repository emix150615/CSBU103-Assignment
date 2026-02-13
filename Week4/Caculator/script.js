// ====== SCRIPT.JS ======
const result = document.getElementById("result");
const buttons = document.querySelectorAll(".btn:not(#clear):not(#equals):not(#sqrt)");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
const sqrtBtn = document.getElementById("sqrt");
const historyList = document.getElementById("historyList");
const copyBtn = document.getElementById("copyBtn");
const themeToggle = document.getElementById("themeToggle");
const soundToggle = document.getElementById("soundToggle");

let soundEnabled = true;
const clickSound = new Audio('https://www.fesliyanstudios.com/play-mp3/387');

function playClick(){ if(soundEnabled) clickSound.play(); }

// ====== BUTTONS ======
buttons.forEach(btn=>{
    btn.addEventListener('click',()=>{
        playClick();
        result.value += btn.textContent;
    });
});

// ====== CLEAR ======
clear.addEventListener('click',()=>{ playClick(); result.value=''; });

// ====== EQUALS ======
equals.addEventListener('click',()=>{
    playClick();
    try{
        if(result.value.trim()==='') return;
        let expr = result.value.replace(/×/g,'*').replace(/÷/g,'/');
        if(!/^[0-9+\-*/().%\s]+$/.test(expr)) throw 'Invalid';
        const output = Function('"use strict"; return ('+expr+')')();
        const li = document.createElement('li');
        li.textContent = `${result.value} = ${output}`;
        historyList.appendChild(li);
        historyList.scrollTop = historyList.scrollHeight;
        result.value = output;
    }catch{ result.value='Error'; }
});

// ====== SQUARE ROOT ======
sqrtBtn.addEventListener('click',()=>{
    playClick();
    try{
        if(result.value.trim()==='') throw 'Empty';
        let expr = result.value.replace(/×/g,'*').replace(/÷/g,'/');
        if(!/^[0-9+\-*/().\s]+$/.test(expr)) throw 'Invalid';
        const value = Function('"use strict"; return ('+expr+')')();
        if(value<0) throw 'Negative';
        const output = Math.sqrt(value);
        const li = document.createElement('li');
        li.textContent = `√(${result.value}) = ${output}`;
        historyList.appendChild(li);
        historyList.scrollTop = historyList.scrollHeight;
        result.value = output;
    }catch{ result.value='Error'; }
});

// ====== COPY ======
copyBtn.addEventListener('click',()=>{
    playClick();
    navigator.clipboard.writeText(result.value);
    copyBtn.textContent='Copied!';
    setTimeout(()=> copyBtn.textContent='Copy',1200);
});

// ====== THEME ======
themeToggle.addEventListener('click',()=>{ document.body.classList.toggle('dark-mode'); });

// ====== SOUND ======
soundToggle.addEventListener('click',()=>{ soundEnabled = !soundEnabled; soundToggle.textContent = soundEnabled ? '🔊':'🔇'; });