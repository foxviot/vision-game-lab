"use strict";
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const status = document.getElementById('status');
const keys = new Set();
let state = {running:false,x:380,score:0,elapsed:0,spawn:0,items:[],last:0};
let best = 0;
try { best = Number(localStorage.getItem('neon-best')) || 0; } catch (_) {}
function start(){state={running:true,x:380,score:0,elapsed:0,spawn:0,items:[],last:0};}
document.getElementById('start').addEventListener('click',start);
window.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','a','d','A','D'].includes(e.key)){e.preventDefault();keys.add(e.key.toLowerCase());}});
window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
window.addEventListener('blur',()=>keys.clear());
canvas.addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();state.x=Math.max(18,Math.min(742,(e.clientX-r.left)*760/r.width));});
function frame(t){
 const dt=state.last?Math.min((t-state.last)/1000,.04):0;state.last=t;
 if(state.running){
  state.elapsed+=dt;state.spawn+=dt;
  state.x=Math.max(18,Math.min(742,state.x+((keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0))*400*dt));
  if(state.spawn>.6){state.spawn=0;state.items.push({x:20+Math.random()*720,y:-20,good:Math.random()<.3});}
  for(const item of state.items){item.y+=(150+Math.min(state.elapsed*5,230))*dt;
   if(Math.abs(item.x-state.x)<29&&Math.abs(item.y-390)<23){
    if(item.good){state.score+=10;item.y=999;}
    else {state.running=false;best=Math.max(best,state.score);try{localStorage.setItem('neon-best',String(best));}catch(_){}break;}
   }
  }state.items=state.items.filter(i=>i.y<470);
 }
 ctx.clearRect(0,0,760,440);ctx.strokeStyle='#18304d';
 for(let x=0;x<760;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,440);ctx.stroke();}
 ctx.fillStyle='#38bdf8';ctx.shadowColor='#38bdf8';ctx.shadowBlur=16;ctx.fillRect(state.x-18,380,36,20);
 for(const i of state.items){ctx.fillStyle=i.good?'#38bdf8':'#a78bfa';ctx.shadowColor=ctx.fillStyle;ctx.beginPath();if(i.good){ctx.arc(i.x,i.y,10,0,Math.PI*2);ctx.fill();}else ctx.fillRect(i.x-13,i.y-13,26,26);}
 ctx.shadowBlur=0;if(!state.running){ctx.fillStyle='#e2e8f0';ctx.font='bold 28px system-ui';ctx.textAlign='center';ctx.fillText(state.elapsed?'Game over — restart to try again':'Ready? Start your run.',380,210);}
 status.textContent=`Score ${state.score} · Best ${best} · ${state.elapsed.toFixed(1)}s`;
 requestAnimationFrame(frame);
}requestAnimationFrame(frame);
