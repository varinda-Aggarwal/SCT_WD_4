// NAV scroll
window.addEventListener('scroll',()=>{
  document.getElementById('mainNav').classList.toggle('scrolled',window.scrollY>30);
});

// Demo tasks
let tasks=[
  {id:1,text:'Morning yoga 🧘',done:true,date:'2026-05-04'},
  {id:2,text:'Review study notes 📚',done:true,date:'2026-05-04'},
  {id:3,text:'Plan weekly goals 📝',done:false,date:'2026-05-05'},
  {id:4,text:'Drink 8 glasses of water 💧',done:false,date:'2026-05-04'},
  {id:5,text:'Call mom 📞',done:false,date:'2026-05-06'},
];
let nid=10;
const todayStr=new Date().toISOString().split('T')[0];
function isOverdue(d){return d&&d<todayStr}

function updateProgress(){
  const done=tasks.filter(t=>t.done).length,total=tasks.length;
  const pct=total?Math.round(done/total*100):0;
  document.getElementById('progFill').style.width=pct+'%';
  document.getElementById('progPercent').textContent=pct+'%';
  const left=total-done;
  document.getElementById('taskBadge').textContent=left+' left';
}
function renderTasks(){
  document.getElementById('demoTasks').innerHTML=tasks.map(t=>`
    <div class="demo-task" onclick="toggleTask(${t.id})">
      <div class="demo-cb ${t.done?'checked':''}">${t.done?'✓':''}</div>
      <div class="demo-task-info">
        <div class="demo-task-text ${t.done?'done':''}">${t.text}</div>
        ${t.date?`<div class="demo-task-date ${isOverdue(t.date)&&!t.done?'overdue':''}">${isOverdue(t.date)&&!t.done?'⚠ Overdue: ':''}`+t.date+`</div>`:''}
      </div>
    </div>`).join('');
  updateProgress();
}
function toggleTask(id){const t=tasks.find(x=>x.id===id);if(t){t.done=!t.done;renderTasks();}}
function addDemoTask(){
  const inp=document.getElementById('demoInput'),val=inp.value.trim();
  if(!val)return;
  tasks.push({id:nid++,text:val,done:false,date:''});
  inp.value='';renderTasks();
}
document.getElementById('demoInput').addEventListener('keydown',e=>{if(e.key==='Enter')addDemoTask();});
renderTasks();

// Mini week calendar
const now=new Date();
const dayLabels=['S','M','T','W','T','F','S'];
const taskedDays=[1,3,5];
const weekGrid=document.getElementById('miniWeek');
weekGrid.innerHTML=dayLabels.map((d,i)=>{
  const date=new Date(now);
  date.setDate(now.getDate()-now.getDay()+i);
  const dn=date.getDate();
  const isToday=date.toDateString()===now.toDateString();
  const hasTask=taskedDays.includes(i);
  return `<div class="day-cell ${isToday?'today':''} ${hasTask?'has-task':''}">
    <span style="font-size:9px;opacity:.7">${d}</span>
    <span class="day-num">${dn}</span>
  </div>`;
}).join('');

// Quotes
const quotes=[
  {text:'"Small steps every day lead to big changes over time."',author:'Daily Planner Wisdom 🌸'},
  {text:'"You don\'t have to be perfect, just consistent."',author:'Habit Science 📊'},
  {text:'"A goal without a plan is just a wish."',author:'Antoine de Saint-Exupéry 🎯'},
  {text:'"Organize your life, free your mind."',author:'My Planner Community 📋'},
  {text:'"Progress, not perfection — every tick counts."',author:'Your Future Self ✅'},
];
let qi=0;
function nextQuote(){qi=(qi+1)%quotes.length;const q=quotes[qi];document.getElementById('quoteText').textContent=q.text;}

