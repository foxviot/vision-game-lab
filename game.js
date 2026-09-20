"use strict";
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const status = document.getElementById('status');
const keys = new Set();
let state = {running:false,paused:false,x:380,score:0,lives:3,elapsed:0,spawn:0,items:[],particles:[],last:0};
let best = 0;
try { best = Number(localStorage.getItem('neon-best')) || 0; } catch (_) {}
function start(){state={running:true,paused:false,x:380,score:0,lives:3,elapsed:0,spawn:0,items:[],particles:[],last:0};}
document.getElementById('start').addEventListener('click',start);
for(const [id,key] of [['left','arrowleft'],['right','arrowright']]){
 const button=document.getElementById(id);button.addEventListener('pointerdown',()=>keys.add(key));button.addEventListener('pointerup',()=>keys.delete(key));button.addEventListener('pointerleave',()=>keys.delete(key));
}
window.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='p'&&state.running){state.paused=!state.paused;return;}if(['ArrowLeft','ArrowRight','a','d','A','D'].includes(e.key)){e.preventDefault();keys.add(e.key.toLowerCase());}});
window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
window.addEventListener('blur',()=>keys.clear());
canvas.addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();state.x=Math.max(18,Math.min(742,(e.clientX-r.left)*760/r.width));});
function frame(t){
 const dt=state.last?Math.min((t-state.last)/1000,.04):0;state.last=t;
 if(state.running&&!state.paused){
  state.elapsed+=dt;state.spawn+=dt;
  state.x=Math.max(18,Math.min(742,state.x+((keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0))*400*dt));
  if(state.spawn>.6){state.spawn=0;state.items.push({x:20+Math.random()*720,y:-20,good:Math.random()<.3});}
  for(const item of state.items){item.y+=(150+Math.min(state.elapsed*5,230))*dt;
   if(Math.abs(item.x-state.x)<29&&Math.abs(item.y-390)<23){
    state.particles.push(...Array.from({length:10},(_,n)=>({x:item.x,y:item.y,vx:(n-5)*18,vy:-40-Math.random()*80,life:.6,color:item.good?'#38bdf8':'#a78bfa'})));
    if(item.good){state.score+=10;item.y=999;}
    else {state.lives-=1;item.y=999;if(state.lives<=0){state.running=false;best=Math.max(best,state.score);try{localStorage.setItem('neon-best',String(best));}catch(_){}break;}}
   }
  }state.items=state.items.filter(i=>i.y<470);for(const p of state.particles){p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;}state.particles=state.particles.filter(p=>p.life>0);
 }
 ctx.clearRect(0,0,760,440);ctx.strokeStyle='#18304d';
 for(let x=0;x<760;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,440);ctx.stroke();}
 ctx.fillStyle='#38bdf8';ctx.shadowColor='#38bdf8';ctx.shadowBlur=16;ctx.fillRect(state.x-18,380,36,20);
 for(const i of state.items){ctx.fillStyle=i.good?'#38bdf8':'#a78bfa';ctx.shadowColor=ctx.fillStyle;ctx.beginPath();if(i.good){ctx.arc(i.x,i.y,10,0,Math.PI*2);ctx.fill();}else ctx.fillRect(i.x-13,i.y-13,26,26);}
 for(const p of state.particles){ctx.globalAlpha=Math.max(0,p.life/.6);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,4,4);}ctx.globalAlpha=1;
 ctx.shadowBlur=0;if(!state.running||state.paused){ctx.fillStyle='#e2e8f0';ctx.font='bold 28px system-ui';ctx.textAlign='center';ctx.fillText(state.paused?'Paused':state.elapsed?'Game over — restart to try again':'Ready? Start your run.',380,210);}
 status.textContent=`Score ${state.score} · Lives ${state.lives} · Best ${best} · ${state.elapsed.toFixed(1)}s`;
 requestAnimationFrame(frame);
}requestAnimationFrame(frame);
