const BOT_TOKEN = "7939028110:AAGAfrpvacCos-B9ldkVRgbW7O0Rmp3nYgE";
const CHAT_ID = "@rajcoin7bot";

async function sendToTelegram(text){
  try{
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const body = { chat_id: CHAT_ID, text };
    const res = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
    const data = await res.json();
    console.log('telegram result', data);
    return data;
  }catch(e){ console.error('telegram send error', e); }
}

function canPlay(key, limit){
  const today = new Date().toISOString().slice(0,10);
  let obj = JSON.parse(localStorage.getItem(key) || 'null');
  if(!obj || obj.date !== today) obj = { date: today, count: 0 };
  if(obj.count < limit){ obj.count++; localStorage.setItem(key, JSON.stringify(obj)); return true; }
  return false;
}

// Game functions
function playGame1(){
  if(!canPlay('game1_limit',1)){ alert('Game 1: আজকের লিমিট শেষ।'); return; }
  const court = document.getElementById('court').value;
  const color = document.getElementById('color').value;
  const number = document.getElementById('number').value;
  const msg = `Game1 | court=${court} ; color=${color} ; number=${number}`;
  document.getElementById('result').textContent = 'Sent to Telegram.';
  sendToTelegram(msg);
}

function playGame2(){
  if(!canPlay('game2_limit',1)){ alert('Game 2: আজকের লিমিট শেষ।'); return; }
  const col = document.getElementById('ballColor').value;
  const msg = `Game2 | ballColor=${col}`;
  document.getElementById('result').textContent = 'Sent to Telegram.';
  sendToTelegram(msg);
}

function playGame3(){
  if(!canPlay('game3_limit',1)){ alert('Game 3: আজকের লিমিট শেষ।'); return; }
  const num = document.getElementById('choiceNumber').value;
  const msg = `Game3 | number=${num}`;
  document.getElementById('result').textContent = 'Sent to Telegram.';
  sendToTelegram(msg);
}

function playGame4(){
  if(!canPlay('game4_limit',5)){ alert('Game 4: আজকের লিমিট শেষ।'); return; }
  document.getElementById('result').textContent = 'Aspen spun!';
}

function playGame5(){
  if(!canPlay('game5_limit',2)){ alert('Game 5: আজকের লিমিট শেষ।'); return; }
  document.getElementById('result').textContent = 'Diamond box opened!';
}

function playGame6(){
  if(!canPlay('game6_limit',5)){ alert('Game 6: আজকের লিমিট শেষ।'); return; }
  document.getElementById('result').textContent = 'Math played!';
}

let game7score = 0;
function playGame7(){
  game7score++;
  document.getElementById('score').textContent = 'Score: '+game7score;
}

// wallet helpers
function getWallet(){ return Number(localStorage.getItem('wallet')||0); }
function setWallet(v){ localStorage.setItem('wallet', String(v)); if(document.getElementById('wallet')) document.getElementById('wallet').textContent = 'Wallet: '+v+' Coins'; }

window.addEventListener('load', ()=>{ if(document.getElementById('wallet')) document.getElementById('wallet').textContent = 'Wallet: '+getWallet()+' Coins'; });
