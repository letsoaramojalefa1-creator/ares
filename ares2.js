/* ARES 2.0 layer: career journey, salary intelligence, calendar, evidence-based progress, themes.
   Loaded after app.js. It extends the app and keeps its data, login, sync and VIGIL backend. */
const A2={vctx:'',cv:'month',cd:'',cm:'',tb:'soc',cmp:['soc','cloud']};
const ISO=()=>new Date().toISOString();

/* More AZ-104 practice so the active-exam briefing has real depth. Original practice questions, not official exam items. */
Q.push(
["a104-01","AZ-104","Identity: RBAC scope","A user must restart virtual machines in one resource group only. What is the best assignment?",["Owner on the subscription","Reader on the subscription","Virtual Machine Contributor on that resource group","Contributor on the management group"],[2],"Assign the narrowest role at the narrowest scope that does the job. The others grant far more access than needed."],
["a104-02","AZ-104","Governance: Locks","You must stop accidental deletion of resources in a production resource group. What should you apply?",["A tag","A CanNotDelete resource lock","A Reader role","A network security group"],[1],"A CanNotDelete lock blocks deletion even for users who hold an editing role. Tags only label resources."],
["a104-03","AZ-104","Storage: Redundancy","A storage account must survive a regional outage and allow reads from the secondary region. Which redundancy fits?",["LRS","ZRS","GRS","RA-GRS"],[3],"RA-GRS replicates to a paired region and allows read access to the secondary. GRS replicates but does not allow secondary reads until failover."],
["a104-04","AZ-104","Storage: SAS","A partner needs time-limited, read-only access to one blob without your account keys. What do you use?",["The storage account key","A shared access signature with read permission and an expiry","The Owner role","Anonymous container access"],[1],"A SAS grants scoped, expiring access. Sharing an account key exposes the entire account."],
["a104-05","AZ-104","Compute: Availability","A VM must stay available if one datacentre in a region fails. What should you use?",["A larger VM size","An availability zone deployment","A resource lock","A tag"],[1],"Availability zones are physically separate datacentres within a region. An availability set only protects within one datacentre."],
["a104-06","AZ-104","Networking: Peering","Two virtual networks in the same region must communicate privately. What do you configure?",["A public load balancer","A public DNS zone","VNet peering","A storage firewall"],[2],"VNet peering connects networks over the Azure backbone. Their address spaces must not overlap."],
["a104-07","AZ-104","Networking: NSG","You want to allow HTTPS from the internet to web VMs but block RDP. What is the simplest control?",["A route table","NSG rules allowing 443 and denying 3389 inbound","Azure Backup","A resource lock"],[1],"Network security groups filter traffic by port, protocol and address. Route tables steer traffic but do not filter it."],
["a104-08","AZ-104","Identity: External users","Staff at a partner company need access to one of your apps. Which feature invites them?",["Password hash sync","Azure Bastion","Entra B2B collaboration","An availability set"],[2],"B2B collaboration invites external users as guests using their own identity."],
["a104-09","AZ-104","Compute: Autoscale","You want a web app to add instances automatically when CPU is high. What do you configure?",["A private endpoint","Autoscale rules on the App Service plan","An Azure Policy","A resource lock"],[1],"Autoscale rules on the plan add or remove instances based on metrics such as CPU."]
);

/* ---------- helpers ---------- */
const a2pd=s=>{const p=s.split('-').map(Number);return new Date(Date.UTC(p[0],p[1]-1,p[2]))},a2fd=d=>d.toISOString().slice(0,10),a2ad=(s,n)=>{const d=a2pd(s);d.setUTCDate(d.getUTCDate()+n);return a2fd(d)};
const a2c=id=>S.certs.find(c=>c.id==id),a2has=id=>{const c=a2c(id);return !!c&&c.status=='Completed'};
const a2days=d=>Math.ceil(ms(d)/864e5);
const a2sh=a=>[...a].sort(()=>Math.random()-.5);
function a2active(){a2mig();return S.certs.filter(c=>c.status=='Planned'&&c.date&&ms(c.date)>0).sort((a,b)=>ms(a.date)-ms(b.date))[0]}
function a2conflicts(){const d={};S.certs.filter(c=>c.date).forEach(c=>(d[c.date]=d[c.date]||[]).push(c));
 return Object.entries(d).filter(([,v])=>v.length>1).map(([date,v])=>{const times=v.filter(c=>c.time);let overlap=false;if(times.length>1){const s=times.map(c=>c.time).sort();for(let i=1;i<s.length;i++)if(s[i]==s[i-1])overlap=true}
 return {date,ids:v.map(c=>c.id),overlap:overlap&&times.length==v.length}})}

/* ---------- migration (idempotent, runs on first render of each loaded state) ---------- */
const A2GSEED=[
 {id:'g1',name:'Volkswagen Polo TSI Edition 15',colour:'Black',status:'Wishlist',primary:true,budget:'',when:'',ins:'',fuel:'',maint:'',save:'',other:'',note:''},
 {id:'g2',name:'Volkswagen Polo GTI',colour:'',status:'Wishlist',primary:false,budget:'',when:'',ins:'',fuel:'',maint:'',save:'',other:'',note:''},
 {id:'g3',name:'Hyundai i30 N',colour:'',status:'Wishlist',primary:false,budget:'',when:'',ins:'',fuel:'',maint:'',save:'',other:'',note:''},
 {id:'g4',name:'Volkswagen Golf GTI 8.5',colour:'',status:'Wishlist',primary:false,budget:'',when:'',ins:'',fuel:'',maint:'',save:'',other:'',note:''}
];
const A2SEED=[
 {id:'w1',title:'Stonegate: Microsoft Sentinel SOC and incident response simulation',type:'project',status:'done',note:'Published on GitHub',src:'your notes in chat'},
 {id:'w2',title:'TryHackMe Conti: Splunk ransomware investigation write-up',type:'lab',status:'done',note:'Portfolio write-up',src:'your notes in chat'},
 {id:'w3',title:'TryHackMe After Hours: WMI persistence forensics write-up',type:'lab',status:'done',note:'Portfolio write-up',src:'your notes in chat'},
 {id:'w4',title:'Threat detection and log analysis: Splunk web server logs',type:'project',status:'done',note:'Incident report, Feb 2026',src:'your notes in chat'},
 {id:'w5',title:'Enterprise hybrid Azure SOC lab',type:'project',status:'prog',note:'Ongoing build',src:'your notes in chat'},
 {id:'w6',title:'Sentinel hub-and-spoke lab',type:'project',status:'prog',note:'Paused before the Sentinel and detection stage',src:'your notes in chat'}
];
function a2mig(){if(!S.v2){S.events=S.events||[];S.work=S.work||[];
 const a=a2c('AZ-104'),sc=a2c('SC-500');
 if(a&&a.date=='2026-10-20'){a.hist=(a.hist||[]).concat({from:a.date,at:ISO()});a.date='2026-10-27';a.note='Rescheduled from 20 Oct 2026 to 27 Oct 2026. '+(a.note||'')}
 if(sc&&sc.date=='2026-10-21'){sc.hist=(sc.hist||[]).concat({from:sc.date,at:ISO()});sc.date='2026-12-01';sc.note='Rescheduled from 21 Oct 2026 to 1 Dec 2026. '+(sc.note||'')}
 if(!S.work.length)S.work=A2SEED.map(x=>({...x}));
 S.v2=1}
 if(!S.v21){if(!S.certs.find(c=>c.id=='AZ-901'))S.certs.push({...K('AZ-901','AZ-901 (exam code as you gave it; not yet confirmed against Microsoft Learn)','Certification','Planned','AZ-901'),date:'2026-12-01',note:'Code unconfirmed: you gave AZ-901. ARES has not renamed this to AZ-900 or AI-901; if that was a slip, correct it under Certs.',cost:0,rev:'',hist:[]});
 S.jobs=S.jobs||[];S.garage=S.garage||A2GSEED.map(x=>({...x}));S.v21=1}
 save()}

/* ---------- theme: automatic by South African time ---------- */
function a2theme(){const m=S.theme||'auto';let t=m;if(m=='auto'){const h=+new Date().toLocaleString('en-GB',{timeZone:TZ,hour:'numeric',hour12:false});t=(h>=6&&h<18)?'light':'dark'}
 document.documentElement.dataset.theme=t;try{localStorage.setItem('ares_theme',m)}catch(e){}}
function a2th(){S.theme=({auto:'light',light:'dark',dark:'auto'})[S.theme||'auto'];save();a2theme();render()}
setInterval(a2theme,60000);addEventListener('focus',a2theme);document.addEventListener('visibilitychange',()=>{if(!document.hidden)a2theme()});

/* ---------- navigation and routing ---------- */
const a2tabs=[['career','Career'],['cal','Calendar'],['jobs','Jobs'],['certs','Certs'],['work','Work'],['prog','Progress'],['vigil','VIGIL']];
function nav(){$('nav').innerHTML='<div class="logo">'+L(26)+'ARES</div>'+a2tabs.map(x=>`<button class="${view==x[0]||(x[0]=='career'&&view=='home')?'on':''}" onclick="go('${x[0]}')">${x[1]}</button>`).join('')+`<div class="more"><button onclick="go('practice')">Practice</button><button onclick="go('week')">Week plan</button><button onclick="go('roadmap')">Roadmap</button><button onclick="go('settings')">Settings</button><button onclick="a2th()">Theme: ${S.theme||'auto'}</button></div>`;orb.style.display=view=='vigil'?'none':'flex'}
function go(v){A2.vctx='';view=v;render();scrollTo(0,0)}
function render(){if(window.LOCK)return;a2mig();nav();const V={home:a2career,career:a2career,cal:a2cal,certs:a2certs,work:a2work,prog:a2prog,jobs:a2jobs,week,practice,vigil,roadmap,money,settings};$('main').innerHTML=(V[view]||a2career)();tick();a2after()}
function a2ask(ctx,q){A2.vctx=ctx;view='vigil';render();scrollTo(0,0);$('vi').value=q;ask()}

/* ---------- VIGIL context ---------- */
function ctx(){const a=S.attempts,ok=a.filter(x=>x.ok).length,w=weak().slice(0,3).map(x=>x[0]+' '+Math.round(x[1]*100)+'% over '+x[2]).join('; ')||'none yet',ac=a2active(),sg=a2stages(),cur=Math.max(0,sg.findIndex(s=>!s.i.every(x=>x.s=='done'))),W=S.why2||{};
 return `Today is ${tk()} (${new Date().toLocaleString('en-GB',{timeZone:TZ,weekday:'long',hour:'2-digit',minute:'2-digit'})}, Africa/Johannesburg). Known context about Jeff: works 08:00-16:30 on weekdays as an IT Support Technician; walks 30-50 minutes each way; wakes about 05:00 on workdays; has a recurring Tuesday 08:30-12:00 slot for sitting exams. Established daily habits (do not remind him): LinkedIn updates, TryHackMe login, HackingHub updates. Credentials he reports (unverified by ARES): ${S.certs.filter(c=>c.status=='Completed'&&c.cat=='Certification').map(c=>c.id).join(', ')}. AZ-104 first attempt on 28 Jul 2026 scored 609 (pass 700) after about 15 days of prep, missing the final module section. Exam dates in ARES: ${S.certs.filter(c=>c.status=='Planned'&&c.date).map(c=>c.id+' '+c.date).join(', ')}; AI-901 and CCST planned late Nov to mid Dec 2026. Active priority exam: ${ac?ac.id+' in '+a2days(ac.date)+' days':'none dated'}. Career journey position: stage ${cur+1} of 8 (${sg[cur].n}); stage list: ${sg.map((s,i)=>(i+1)+' '+s.n+' ['+(s.i.every(x=>x.s=='done')?'complete':'not complete')+']').join('; ')}. Recorded practical work: ${S.work.map(x=>x.title+' ['+x.status+']').join('; ')||'none'}. Upcoming calendar items: ${a2evs().filter(e=>e.date>=tk()&&!e.done).sort((x,y)=>x.date<y.date?-1:1).slice(0,6).map(e=>e.date+' '+e.title).join('; ')||'none'}. Practice: ${a.length} answers (${a.length?Math.round(ok/a.length*100)+'% correct':'no accuracy yet'}); weak topics: ${w}; check-in streak ${streak()}. His WHY (his own words): goal=${W.goal||'not written yet'}; why=${W.why||'not written yet'}; roles=${W.roles||'not written yet'}; milestones=${W.miles||'not written yet'}. Commitment: ${S.why.c}. Dream Garage (personal aspiration, not a target to push): first target ${S.garage[0].name}, status ${S.garage[0].status}${S.garage[0].budget?', his own budget estimate R'+S.garage[0].budget:''}; other aspirations: ${S.garage.slice(1).map(g=>g.name).join(', ')}. Never suggest cutting essentials or savings for this. Job applications: ${S.jobs.length} saved${S.jobs.length?' ('+JST.map(s=>s+':'+S.jobs.filter(j=>j.stage==s).length).filter(x=>!x.endsWith(':0')).join(', ')+')':''}. His personal salary targets are aspirations. ARES shows market ranges from ShiftMate, PayScale, Indeed and Paylab (checked 20 Oct 2026); they differ in basis and disagree, so state ranges with their source and never present his target as a market average. ${A2.vctx?'He opened VIGIL from: '+A2.vctx+'.':''}`}
function mission(){const ac=a2active(),w=weak()[0];if(w&&w[1]<.7)return{t:'Revise '+w[0],why:`Your last ${w[2]} recorded answers on this topic scored ${Math.round(w[1]*100)}%, so a short revision session comes first.`};
 return ac?{t:'Prepare for '+ac.id,why:`${a2days(ac.date)} days to your ${ac.id} exam.`+(ac.id=='AZ-104'?' Your first attempt left the final module section uncovered, so start there.':'')}:{t:'Pick your next exam date',why:'No dated exam is set. Add one under Certs so ARES can prioritise.'}}

/* ---------- startup questions: the active certification leads ---------- */
function startQuiz(tr){view='practice';const last={};S.attempts.forEach(a=>last[a.id]=a.ok);const sc=q=>last[q[0]]===undefined?0:last[q[0]]?2:1,pk=(arr,n)=>a2sh(arr).sort((x,y)=>sc(x)-sc(y)).slice(0,n);let qs;
 if(typeof tr=='string')qs=pk(Q.filter(q=>q[1]==tr),5);else{const ac=a2active(),mine=ac?pk(Q.filter(q=>q[1]==ac.id),3):[],rest=pk(Q.filter(q=>!ac||q[1]!=ac.id),5);qs=[...mine,...rest].slice(0,5)}
 quiz={qs,i:0,sel:[],shown:false,score:0};render()}

/* ---------- career journey ---------- */
function a2stages(){const W=t=>S.work.filter(w=>w.type==t),it=(t,s,n)=>({t,s,n:n||''}),cr=id=>{const c=a2c(id);return c?(c.status=='Completed'?'done':c.date?'prog':'plan'):'plan'},wk=w=>it(w.title,w.status,w.note),n=S.attempts.length,acc=n>=10?Math.round(S.attempts.filter(a=>a.ok).length/n*100)+'% practice accuracy (estimate)':'Not yet measured',cd=id=>{const c=a2c(id);return c&&c.date?'exam '+c.date:(c&&c.status=='Completed'?'reported, unverified':'')};
 const pl=S.certs.filter(c=>c.status=='Planned').slice(0,8).map(c=>it(c.id,c.date?'prog':'plan',c.date||c.note||''));
 return [
 {n:'Technical foundations',d:'The base you work from every day.',i:[it('IT Support Technician, on-site, since May 2025','done','stated by you'),it('Windows, DNS, DHCP and TCP/IP troubleshooting','done','stated by you')]},
 {n:'Networking, systems and cloud fundamentals',d:'The layer cloud security sits on.',i:[it('AZ-900',cr('AZ-900'),cd('AZ-900')),it('AZ-104',cr('AZ-104'),cd('AZ-104')),it('Networking practice',S.attempts.some(a=>/Network|CCNA/.test(a.track))?'prog':'plan',acc)]},
 {n:'Security foundations and operational experience',d:'Knowledge is reported. Operational experience is still ahead.',i:[it('Security+',cr('Security+'),cd('Security+')),it('CySA+',cr('CySA+'),cd('CySA+')),it('SC-900',cr('SC-900'),cd('SC-900')),it('SC-200',cr('SC-200'),cd('SC-200')),it('Operational SOC experience','plan','not yet, internship is the target')]},
 {n:'Certification milestones',d:'Dated exams and the certifications you have planned.',i:pl.length?pl:[it('No planned certifications','plan','')]},
 {n:'Practical labs and real-world simulations',d:'Evidence that you can do the work.',i:W('lab').length?W('lab').map(wk):[it('Add your first lab under Work','plan','')]},
 {n:'Portfolio projects and demonstrable skills',d:'What an employer can open and judge.',i:W('project').length?W('project').map(wk):[it('Add a project under Work','plan','')]},
 {n:'Entry-level opportunities',d:'Your aspirations, not promises.',i:[it(RM[0][0]+', '+RM[0][1],pr(0)==100?'done':'plan','salary '+fm(sal(0))),it(RM[1][0]+', '+RM[1][1],pr(1)==100?'done':'plan','your target '+fm(sal(1)))]},
 {n:'Specialist roles and long-term growth',d:'Where the journey leads.',i:[2,3,4].map(k=>it(RM[k][0]+', '+RM[k][1],pr(k)==100?'done':'plan','your target '+fm(sal(k))))}
 ]}
function a2stage(s,i,cur){const dn=s.i.every(x=>x.s=='done'),c=dn?'done':i==cur?'cur':'';
 return `<section class="st ${c}" data-i="${i}" data-n="${esc(s.n)}"><span class="nd">${i+1}</span><h3>${esc(s.n)}</h3><p class="note">${esc(s.d)}</p><span class="pill ${dn?'done':''}">${dn?'complete':i==cur?'you are here':'ahead'}</span>
<details style="margin-top:8px"><summary>${s.i.length} item${s.i.length>1?'s':''}</summary>${s.i.map(x=>`<div class="row" style="padding:5px 0"><span class="f">${esc(x.t)}<br><small class="note">${esc(x.n)}</small></span><span class="pill ${x.s=='done'?'done':''}">${x.s=='done'?'done':x.s=='prog'?'in progress':'planned'}</span></div>`).join('')}<button class="s" onclick="a2stageAsk(${i})">Ask VIGIL about this stage</button></details></section>`}
function a2stageAsk(i){const s=a2stages()[i];a2ask('career stage '+(i+1)+': '+s.n,`Explain where I stand on "${s.n}", what is blocking the next step, and what I should prioritise. Use my saved records and separate completed work from plans.`)}
function a2more(){return `<div class="pg"><h3>More</h3><div class="row" style="flex-wrap:wrap"><button class="s" onclick="go('practice')">Practice</button><button class="s" onclick="go('week')">Week plan</button><button class="s" onclick="go('roadmap')">Salary targets and milestones</button><button class="s" onclick="go('money')">Private financial targets</button><button class="s" onclick="go('settings')">Settings</button><button class="s" onclick="a2th()">Theme: ${S.theme||'auto'}</button></div></div>`}
function a2career(){const ac=a2active(),sg=a2stages(),cur=Math.max(0,sg.findIndex(s=>!s.i.every(x=>x.s=='done'))),m=mission(),cf=a2conflicts(),jb=S.jobs,due=jb.filter(j=>j.follow&&j.follow<=a2ad(tk(),3)&&!['Offer','Rejected','Withdrawn'].includes(j.stage));
 return `<div class="row mh" style="margin-bottom:4px">${L(30)}<b style="letter-spacing:.3em">ARES</b></div>
<section class="hero"><p class="eyebrow m" id="clk"></p><h1>${greet()}, ${esc(S.name)}.</h1>
<p class="lede">${ac?`${esc(ac.id)} is your priority: <b class="glow m">${a2days(ac.date)} days</b>, on ${esc(ac.date)}.`:'No dated exam. Set one under Certs.'} You are at stage ${cur+1} of 8: ${esc(sg[cur].n)}.</p>
<p class="note"><span class="m" id="cd"></span> to ${esc(S.target)}, a milestone you set yourself.</p>
${cf.length?cf.map(c=>`<p class="note warn">${c.overlap?'Time conflict':'Same date'}: ${c.ids.join(' and ')} are both set for ${c.date}.${c.overlap?' Their times overlap; one needs a different time.':' Check whether they need separate appointment times.'} <button class="s" onclick="go('cal')">Open calendar</button></p>`).join(''):''}
${due.length?`<p class="note warn">${due.length} job follow-up${due.length>1?'s':''} due within 3 days. <button class="s" onclick="go('jobs')">Open Jobs</button></p>`:''}</section>
<div class="vg" style="margin-top:18px"><input id="hq" aria-label="Ask VIGIL" placeholder="Ask VIGIL: where am I, and what next?" onkeydown="if(event.key=='Enter')hask()"><button class="b" onclick="hask()">Ask</button></div>
<div class="pg"><span class="num">Next action</span><h3>${esc(m.t)}</h3><p class="note">${esc(m.why)}</p><button class="b" onclick="nxt()">Go</button></div>
${a2why()}
<div class="stk"><span class="pill done" id="sk2">Stage ${cur+1}/8</span><span id="sn">${esc(sg[cur].n)}</span></div>
<div class="jy" id="jy"><div class="jl"><i id="jf"></i></div>${sg.map((s,i)=>a2stage(s,i,cur)).join('')}</div>
${a2branch()}${a2salary()}${a2more()}`}
function a2why(){const W=S.why2||{},f=(k,l,p)=>`<label>${l}</label><textarea rows="2" placeholder="${p}" onchange="a2wset('${k}',this.value)">${esc(W[k])}</textarea>`;
 return `<details class="q"><summary>My WHY</summary><p class="note">Written by you. ARES never fills this in for you.</p>${f('goal','Long-term career goal','What do you want to reach?')}${f('why','Why it matters to me','')}${f('roles','Roles and specialisations I want','')}${f('miles','Target milestones and timeframes','')}${f('mean','What professional progress would mean to me','')}
<button class="s" onclick="a2ask('My WHY','Using my WHY and my roadmap, explain how my next recommended action contributes to my larger goal. If my WHY is blank, ask me what to add.')">Ask VIGIL how my next step serves my WHY</button>
<details class="q"><summary>Aspire, Escape and Commit</summary>${[['a','Aspire'],['e','Escape'],['c','Commit']].map(x=>`<label>${x[1]}</label><textarea rows="3" onchange="why('${x[0]}',this.value)">${esc(S.why[x[0]])}</textarea>`).join('')}</details>
<details class="q"><summary>Dream Garage</summary><p class="note">A personal aspiration board, not a target you owe anyone. Figures are your own estimates.</p>${a2garageList()}</details></details>`}
function a2wset(k,v){S.why2=S.why2||{};S.why2[k]=v;save()}

/* ---------- branches, route and salary intelligence ---------- */
A2.br=[
 {k:'soc',l:'SOC',n:'SOC analysis and security operations',s:'soc',resp:['Triage and investigate alerts','Escalate and document incidents','Tune detections with the team'],skills:['SIEM and KQL or SPL','Networking and log analysis','Incident handling basics'],certs:['Security+','CySA+','SC-200','BTL1'],ev:['Investigation write-ups','SIEM labs','Simulated incident reports'],entry:['SOC internship or learnership','L1 SOC analyst','MSSP analyst'],prog:['L2 analyst','Threat hunter or incident responder','SOC lead']},
 {k:'cloud',l:'Cloud',n:'Cloud engineering and cloud security',s:'cloud',resp:['Build and secure cloud workloads','Manage identity, networking and policy','Monitor security posture'],skills:['Azure administration','Cloud networking','IAM and policy'],certs:['AZ-900','AZ-104','SC-500','Terraform Associate'],ev:['Hardened lab environments','Infrastructure as code repositories','Posture reviews'],entry:['Junior cloud or support engineer','Cloud operations analyst'],prog:['Cloud engineer','Cloud security engineer','Cloud architect']},
 {k:'det',l:'Detection',n:'Security engineering and detection engineering',s:'soc',resp:['Write and tune detections','Build log pipelines and automation','Reduce false positives'],skills:['KQL or SPL','Scripting','MITRE ATT&CK mapping'],certs:['SC-200','CySA+'],ev:['Detection rule repository','Rules tested on sample logs'],entry:['SOC analyst moving into detection'],prog:['Detection engineer','Security engineer']},
 {k:'iam',l:'IAM',n:'Identity and access management',s:'',resp:['Manage identities and access reviews','Conditional Access and PIM','Support identity incidents'],skills:['Entra ID','RBAC','SAML and OAuth basics'],certs:['SC-300','AZ-104','SC-500'],ev:['Lab with Conditional Access and PIM'],entry:['Service desk or IAM analyst'],prog:['IAM engineer','Identity architect']},
 {k:'ir',l:'IR and DFIR',n:'Incident response and digital forensics',s:'soc',resp:['Contain and investigate incidents','Collect and preserve evidence','Write reports'],skills:['Windows and Linux forensics','Log analysis','Malware triage'],certs:['BTL1','CySA+'],ev:['DFIR case write-ups'],entry:['SOC L1 or L2 with IR duties'],prog:['Incident responder','DFIR specialist']},
 {k:'dso',l:'DevSecOps',n:'DevSecOps and security automation',s:'',resp:['Secure CI/CD pipelines','Automate security checks','Manage secrets and dependencies'],skills:['Git and CI/CD','Infrastructure as code','Scripting'],certs:['Terraform Associate','GH-200','AZ-400'],ev:['Pipeline with scanning and secrets checks'],entry:['Junior DevOps or cloud engineer'],prog:['DevSecOps engineer','Platform security engineer']}
];
const SH='https://shiftmate.co.za/resources/',SHI=SH+'blog/ict-salaries-in-south-africa-2026-what-tech-jobs-really-pay',V20='verified 20 Oct 2026',ND='publication date not shown',NB='Monthly figure. Gross or cost-to-company not stated.';
const A2SAL={
 soc:{n:'SOC and security analyst',note:'Sources disagree sharply: PayScale reports a junior base average of R98,521 per year, far below ShiftMate\'s monthly entry range. Methods and pay basis differ, so treat every figure as rough.',r:[
  ['Entry, 0 to 1 year','R18,000 to R30,000 per month','ShiftMate role guide',NB,ND,SH+'roles/cybersecurity-analyst'],
  ['Mid-level','R30,000 to R55,000 per month','ShiftMate role guide',NB,ND,SH+'roles/cybersecurity-analyst'],
  ['Senior','R55,000 to R90,000 per month','ShiftMate role guide',NB,ND,SH+'roles/cybersecurity-analyst'],
  ['L2 security analyst','R35,000 to R60,000 per month','ShiftMate role guide',NB,ND,SH+'roles/cybersecurity-analyst'],
  ['Senior or incident responder','R60,000 to R100,000 per month','ShiftMate role guide',NB,ND,SH+'roles/cybersecurity-analyst'],
  ['Cybersecurity analyst, entry','R25,000 to R38,000 per month','ShiftMate ICT salaries 2026','Monthly. Basis not stated.','2026, '+ND,SHI],
  ['Cybersecurity analyst, experienced','R50,000 to R80,000 per month','ShiftMate ICT salaries 2026','Monthly. Basis not stated.','2026, '+ND,SHI],
  ['Junior SOC analyst, average base','R98,521 per year (reported spread R654 to R298k)','PayScale','Annual base salary, self-reported. No monthly conversion made.','2026, '+ND,'https://www.payscale.com/research/ZA/Job=Junior_SOC_Analyst/Salary']]},
 cloud:{n:'Cloud engineer (no cloud-security-specific figures found, so this is a proxy)',note:'Indeed shows its own average moving between snapshots (R44,517 from 19 salaries in February 2026, R55,636 from 15 in July 2026). Paylab has fewer than 20 respondents.',r:[
  ['Entry','R30,000 to R45,000 per month','ShiftMate ICT salaries 2026','Monthly. Basis not stated.','2026, '+ND,SHI],
  ['Experienced','R55,000 to R90,000 per month','ShiftMate ICT salaries 2026','Monthly. Basis not stated.','2026, '+ND,SHI],
  ['Average base','R55,636 per month','Indeed South Africa','Base salary, 15 salaries reported.','Updated 21 Jul 2026','https://za.indeed.com/career/cloud-engineer/salaries'],
  ['80% of respondents','R238,236 to R950,412 per year; about R57,463 per month after 5 years','Paylab','Gross. Fewer than 20 respondents.',ND,'https://www.paylab.com/za/salaryinfo/information-technology/cloud-engineer?lang=en']]},
 net:{n:'Network engineer and systems administrator',note:'Only one source found for this role, so there is no cross-check.',r:[
  ['Network engineer','R25,000 to R55,000 per month','ShiftMate ICT overview 2026','Monthly. Basis not stated.','2026, '+ND,SH+'companies/ict'],
  ['Systems or network administrator','R25,000 to R40,000 per month','ShiftMate IT support role guide','Monthly. Basis not stated.',ND,SH+'roles/it-support-technician']]},
 sup:{n:'IT support technician',note:'ShiftMate is a South African jobs marketplace. Pay varies by city.',r:[
  ['Entry','R8,000 to R14,000 per month','ShiftMate role guide','Monthly. Basis not stated.',ND,SH+'roles/it-support-technician'],
  ['Mid-level','R14,000 to R22,000 per month','ShiftMate role guide','Monthly. Basis not stated.',ND,SH+'roles/it-support-technician'],
  ['Senior','R22,000 to R32,000 per month','ShiftMate role guide','Monthly. Basis not stated.',ND,SH+'roles/it-support-technician']]}
};
function a2branch(){const b=A2.br.find(x=>x.k==S.tb)||A2.br[0],gap=b.certs.filter(x=>!a2has(x)),done=S.work.filter(w=>w.status=='done').length,ul=a=>'<ul style="margin:4px 0 10px;padding-left:18px">'+a.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>';
 return `<div class="pg"><span class="num">Possible routes</span><h3>Choose a target route</h3><p class="note">These are possible branches. Choosing one does not commit you to it.</p>
<div class="row" style="flex-wrap:wrap;margin-bottom:10px">${A2.br.map(x=>`<button class="s ${x.k==b.k?'sel':''}" onclick="S.tb='${x.k}';save();render()">${esc(x.l)}</button>`).join('')}</div>
<div class="card feat"><b style="font-size:18px">${esc(b.n)}</b>
<p class="note">General guidance, not a job specification.</p><b>Typical responsibilities</b>${ul(b.resp)}<b>Foundational skills</b>${ul(b.skills)}<b>Useful certifications</b><div style="margin:4px 0 10px">${b.certs.map(x=>`<span class="pill ${a2has(x)?'done':''}">${esc(x)}${a2has(x)?' (reported)':''}</span> `).join('')}</div><b>Evidence employers look for</b>${ul(b.ev)}<b>Entry points</b>${ul(b.entry)}<b>Progression</b>${ul(b.prog)}
<b>Your gaps today</b><p class="note">Certifications from this list not yet reported: ${gap.length?gap.map(esc).join(', '):'none'}. Practical evidence recorded: ${done||'Not yet measured'}${done?' completed item'+(done>1?'s':''):''} under Work. A certification alone does not show job readiness, and ARES has no role-specific threshold, so judge the evidence against real job adverts.</p>
<button class="b" onclick="a2ask('route: ${b.k}','Compare my current position with the ${b.n} route. Which gaps matter most, what evidence is missing, and what should I do next?')">Ask VIGIL about this route</button></div></div>`}
function a2srow(r){return `<div class="sr"><b>${esc(r[0])}: ${esc(r[1])}</b><div class="note">${esc(r[2])} · ${esc(r[3])} · ${esc(r[4])} · ${V20} · <a href="${r[5]}" target="_blank" rel="noopener noreferrer">source</a></div></div>`}
function a2salary(){const ks=Object.keys(A2SAL),sel=i=>`<select aria-label="Path ${i+1}" onchange="A2.cmp[${i}]=this.value;render()">${ks.map(k=>`<option value="${k}" ${A2.cmp[i]==k?'selected':''}>${esc(A2SAL[k].n.split(' (')[0])}</option>`).join('')}</select>`,
 side=k=>{const d=A2SAL[k],b=A2.br.find(x=>x.s==k),g=b?b.certs.filter(x=>!a2has(x)).length+' certification(s) from the '+b.l+' list not yet reported':'No route data for this role';return `<div><b>${esc(d.n)}</b><p class="note">${esc(d.note)}</p>${d.r.map(a2srow).join('')}<p class="note">Learning investment: ${g}.</p></div>`};
 return `<div class="pg"><span class="num">Salary intelligence</span><h3>What these paths pay in South Africa</h3>
<p class="note">Estimates from public sources, not promises and not a prediction for you. Figures use different bases (base, gross, cost-to-company) and are never mixed. International and remote data has not been added. Dollar and euro figures are excluded.</p>
<div class="grid g2">${sel(0)}${sel(1)}</div><div class="grid g2">${side(A2.cmp[0])}${side(A2.cmp[1])}</div>
<div class="card silver"><b>Your personal targets (aspirations, shown separately)</b>${RM.map((m,i)=>`<div class="row" style="padding:4px 0"><span class="f">${esc(m[0])} <span class="note m">${esc(m[1])}</span></span><b class="m glow">${fm(sal(i))}</b></div>`).join('')}</div>
<button class="s" onclick="a2ask('salary intelligence','Using only the salary sources in my records (ShiftMate, PayScale, Indeed, Paylab), compare the paths I am viewing and my personal targets. Say where the sources disagree and what is missing.')">Ask VIGIL about this salary view</button></div>`}

/* ---------- calendar ---------- */
function a2evs(){return S.certs.filter(c=>c.date).map(c=>({id:'c:'+c.id,title:c.id+' exam',date:c.date,type:'exam',cert:c.id,lock:1,done:false})).concat((S.events||[]).map(x=>({...x})))}
function a2mo(n){const p=A2.cm.split('-').map(Number),d=new Date(Date.UTC(p[0],p[1]-1+n,1));A2.cm=a2fd(d).slice(0,7);render()}
function a2today(){A2.cd=tk();A2.cm=A2.cd.slice(0,7);render()}
function a2mv(id,nd){if(!nd)return;if(id.indexOf('c:')==0){const c=a2c(id.slice(2));c.hist=(c.hist||[]).concat({from:c.date,at:ISO()});c.date=nd}else{const e=S.events.find(x=>x.id==id);e.hist=(e.hist||[]).concat({from:e.date,at:ISO()});e.date=nd}save();render()}
function a2tg(id){const e=S.events.find(x=>x.id==id);e.done=!e.done;save();render()}
function a2rm(id){S.events=S.events.filter(x=>x.id!=id);save();render()}
function a2add(){const t=$('ae1').value.trim();if(!t)return;S.events.push({id:'e'+Date.now(),title:t,date:A2.cd,time:$('ae2').value,type:$('ae3').value,cert:$('ae4').value,done:false,hist:[]});save();render()}
function a2er(e){return `<div class="t" style="display:block"><div class="row"><b class="f" style="${e.done?'opacity:.5;text-decoration:line-through':''}">${esc(e.title)}</b><span class="tag">${esc(e.type)}</span></div><div class="note m">${esc(e.date)}${e.time?' '+esc(e.time):''}${e.cert?' · '+esc(e.cert):''}${e.hist&&e.hist.length?' · moved '+e.hist.length+'x':''}</div>
<div class="row" style="flex-wrap:wrap;margin-top:6px">${e.lock?`<label class="note" style="margin:0">Reschedule</label><input type="date" style="width:150px;margin:0" value="${esc(e.date)}" onchange="a2mv('${e.id}',this.value)"><button class="s" onclick="go('certs')">Edit in Certs</button>`:`<button class="s" onclick="a2tg('${e.id}')">${e.done?'Reopen':'Done'}</button><input type="date" style="width:150px;margin:0" aria-label="Reschedule" value="${esc(e.date)}" onchange="a2mv('${e.id}',this.value)"><button class="s" onclick="a2rm('${e.id}')">Remove</button>`}<button class="s" onclick="a2ask('calendar: ${esc(e.title).replace(/'/g,'')}','Is my calendar realistic around &quot;${esc(e.title).replace(/'/g,'')}&quot; on ${e.date}? What should I prioritise before it?')">Ask VIGIL</button></div></div>`}
async function a2ics(){const L2=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//ARES//EN'];a2evs().forEach(e=>{L2.push('BEGIN:VEVENT','UID:'+e.id+'@ares','DTSTAMP:'+ISO().replace(/[-:]/g,'').slice(0,15)+'Z','DTSTART;VALUE=DATE:'+e.date.replace(/-/g,''),'DTEND;VALUE=DATE:'+a2ad(e.date,1).replace(/-/g,''),'SUMMARY:'+e.title.replace(/[,;\n]/g,' '),'END:VEVENT')});L2.push('END:VCALENDAR');const d=window.claude&&await claude.use('downloads');if(d)await d.save({filename:'ares-calendar.ics',data:new Blob([L2.join('\r\n')],{type:'text/calendar'})})}
function a2cal(){A2.cd=A2.cd||tk();A2.cm=A2.cm||A2.cd.slice(0,7);const E=a2evs(),by={};E.forEach(e=>(by[e.date]=by[e.date]||[]).push(e));const ac=a2active(),nx=S.certs.filter(c=>c.status=='Planned'&&c.date&&ms(c.date)>0).sort((a,b)=>ms(a.date)-ms(b.date));
 const head=`<h1>Calendar</h1><p class="sub">${nx.length?nx.map((c,i)=>`${esc(c.id)} ${a2days(c.date)} days${i==0?' (priority)':i==1?' (next)':''}`).join(' · '):'No dated exams yet.'}</p>
<div class="row" style="flex-wrap:wrap;gap:6px">${['month','week','agenda'].map(v=>`<button class="s ${A2.cv==v?'sel':''}" onclick="A2.cv='${v}';render()">${v}</button>`).join('')}<button class="s" onclick="a2today()">Today</button><button class="s" onclick="a2ics()">Export .ics</button></div>`;
 let body='';
 if(A2.cv=='month'){const p=A2.cm.split('-').map(Number),first=new Date(Date.UTC(p[0],p[1]-1,1)),off=(first.getUTCDay()+6)%7,dim=new Date(Date.UTC(p[0],p[1],0)).getUTCDate(),cells=[];for(let i=0;i<off;i++)cells.push('<span></span>');
  for(let d=1;d<=dim;d++){const k=A2.cm+'-'+String(d).padStart(2,'0'),ev=by[k]||[];cells.push(`<button class="dc ${k==A2.cd?'sel':''} ${k==tk()?'td':''}" aria-label="${k}, ${ev.length} item(s)" onclick="A2.cd='${k}';render()">${d}<div>${ev.slice(0,4).map(e=>`<span class="dd ${e.type=='exam'?'ex':''}"></span>`).join('')}</div></button>`)}
  body=`<div class="row" style="margin-top:10px"><button class="s" aria-label="Previous month" onclick="a2mo(-1)">&lsaquo;</button><b class="f" style="text-align:center">${first.toLocaleString('en-GB',{month:'long',year:'numeric',timeZone:'UTC'})}</b><button class="s" aria-label="Next month" onclick="a2mo(1)">&rsaquo;</button></div><div class="mg">${['Mo','Tu','We','Th','Fr','Sa','Su'].map(x=>`<small class="note" style="text-align:center">${x}</small>`).join('')}${cells.join('')}</div>`}
 else if(A2.cv=='week'){const s0=a2ad(A2.cd,-((a2pd(A2.cd).getUTCDay()+6)%7));body=`<div class="row" style="margin-top:10px"><button class="s" onclick="A2.cd=a2ad(A2.cd,-7);render()">&lsaquo;</button><b class="f" style="text-align:center" class="m">Week of ${s0}</b><button class="s" onclick="A2.cd=a2ad(A2.cd,7);render()">&rsaquo;</button></div>`+[0,1,2,3,4,5,6].map(n=>{const k=a2ad(s0,n),ev=by[k]||[];return `<div class="card ${k==tk()?'feat':''}"><b>${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][n]} <span class="m note">${k}</span></b>${ev.map(a2er).join('')||'<p class="note">Free.</p>'}</div>`}).join('')}
 else{const up=E.filter(e=>e.date>=tk()&&e.date<=a2ad(tk(),120)).sort((a,b)=>a.date<b.date?-1:a.date>b.date?1:0);body=`<div style="margin-top:10px">${up.map(a2er).join('')||'<p class="note">Nothing in the next 120 days. Add an event below.</p>'}</div>`}
 const day=(by[A2.cd]||[]);
 return head+body+`<div class="card" style="margin-top:12px"><h2>${esc(A2.cd)}</h2>${A2.cv=='agenda'?'':day.map(a2er).join('')||'<p class="note">Nothing on this day.</p>'}
<label>Add event on this day</label><input id="ae1" placeholder="Title"><div class="row"><input id="ae2" type="time" aria-label="Time"><select id="ae3" aria-label="Type">${['prep','lab','portfolio','application','interview','personal','other'].map(t=>`<option>${t}</option>`).join('')}</select></div><label>Linked certification (optional)</label><select id="ae4"><option value="">None</option>${S.certs.filter(c=>c.status=='Planned').map(c=>`<option>${esc(c.id)}</option>`).join('')}</select><button class="b" onclick="a2add()">Add</button>
<p class="note">Events are saved to your account. There are no in-app reminders yet. Export .ics to use your phone calendar's alerts. Exams come from the Certs records, so changing a date there or here updates both, and the old date stays in the history.</p></div>`}

/* ---------- certs, work, progress ---------- */
function a2certs(){const ac=a2active();return `<div class="card feat"><h2>Practice</h2><p class="note">The daily briefing leads with your active exam${ac?' ('+esc(ac.id)+', '+a2days(ac.date)+' days)':''}, then mixes in other topics. Missed questions come back first.</p><div class="row" style="flex-wrap:wrap"><button class="b" onclick="startQuiz()">Daily briefing</button><button class="s" onclick="startQuiz('AZ-104')">AZ-104 set</button><button class="s" onclick="startQuiz('SC-500')">SC-500 set</button></div></div>`+certs()}
function a2wadd(){const t=$('wt').value.trim();if(!t)return;S.work.push({id:'w'+Date.now(),title:t,type:$('wy').value,status:$('ws').value,note:$('wn').value,src:'added by you'});save();render()}
function a2work(){const T=[['done','Completed'],['prog','In progress'],['plan','Planned']];return `<h1>Practical work</h1><p class="sub">Labs, projects and write-ups. Entries seeded from your notes are your own report, not independently verified.</p>
${S.work.map((w,i)=>`<div class="card"><div class="row"><b class="f">${esc(w.title)}</b><span class="tag">${esc(w.type)}</span></div><p class="note">${esc(w.note||'')}${w.src?' · '+esc(w.src):''}</p><div class="row"><select aria-label="Status" onchange="S.work[${i}].status=this.value;save();render()">${T.map(o=>`<option value="${o[0]}" ${w.status==o[0]?'selected':''}>${o[1]}</option>`).join('')}</select><button class="s" onclick="S.work.splice(${i},1);save();render()">Remove</button></div></div>`).join('')||'<p class="note">Nothing recorded yet.</p>'}
<div class="card"><h2>Add</h2><input id="wt" placeholder="Title"><div class="row"><select id="wy"><option>lab</option><option>project</option></select><select id="ws"><option value="done">Completed</option><option value="prog">In progress</option><option value="plan">Planned</option></select></div><input id="wn" placeholder="Note or link"><button class="b" onclick="a2wadd()">Add</button></div>`}
function a2prog(){const A=S.attempts,n=A.length,ok=A.filter(a=>a.ok).length,w=weak().slice(0,3),last=A.slice(-20),early=A.slice(0,Math.max(0,n-20)),wd=S.work.filter(x=>x.status=='done').length,wp=S.work.filter(x=>x.status=='prog').length,sg=a2stages(),sd=sg.filter(s=>s.i.every(x=>x.s=='done')).length,E=a2evs().filter(e=>e.date>=tk()&&e.date<=a2ad(tk(),30)&&!e.done).length,ci=Object.keys(S.checkins).filter(d=>d>=a2ad(tk(),-13)).length,NM='Not yet measured',
 blk=(h,v,d,c)=>`<div class="pg"><span class="num">${h}</span><h3>${v}</h3><p class="note">${d}</p><p class="note"><i>${c}</i></p></div>`;
 return `<h1>Progress</h1><p class="sub">Four separate measures. They are never combined into one score, because quiz results do not prove job readiness.</p>
${blk('Knowledge',n>=10?Math.round(ok/n*100)+'% correct over '+n+' answers (estimate)':NM,(n>=30?`Last 20: ${Math.round(last.filter(a=>a.ok).length/20*100)}%, earlier: ${Math.round(early.filter(a=>a.ok).length/early.length*100)}%. `:'Trend: '+NM+'. ')+(w.length?'Weakest topics: '+w.map(x=>esc(x[0])+' '+Math.round(x[1]*100)+'%').join(', '):'Weak topics: '+NM),'Reflects practice questions only, mostly written by ARES.')}
${blk('Practical ability',S.work.length?`${wd} completed, ${wp} in progress`:NM,'Counts labs and projects recorded under Work.','Counts entries, not their quality. Evidence still needs your own review.')}
${blk('Career development',`${sd} of 8 stages complete`,`${RM.filter((m,i)=>pr(i)==100).length} of ${RM.length} roadmap milestones ticked. Certifications are reported, not verified.`,'Stage completion shows records, not employability.')}
${blk('Execution',`${E} deadline${E==1?'':'s'} in the next 30 days`,ci?`${ci} check-in${ci==1?'':'s'} in the last 14 days. Streak ${streak()}.`:'Check-ins: '+NM+'.','Consistency matters, but a quiet week is not a failure.')}
<button class="s" onclick="a2ask('progress','Review my progress across knowledge, practical ability, career development and execution. Say what is not yet measured and what evidence is missing.')">Ask VIGIL to review my progress</button>`}

/* ---------- scroll-led journey ---------- */
let a2io=null;
function a2after(){a2theme();if(a2io){a2io.disconnect();a2io=null}const st=[...document.querySelectorAll('.st')];if(!st.length)return;const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
 if('IntersectionObserver' in window&&!rm){a2io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.15});st.forEach(s=>a2io.observe(s))}else st.forEach(s=>s.classList.add('in'));a2sc()}
function a2sc(){const jy=$('jy');if(!jy)return;const r=jy.getBoundingClientRect(),vh=innerHeight,p=Math.max(0,Math.min(1,(vh*.5-r.top)/r.height));$('jf').style.height=(p*100)+'%';let best=null,bd=1e9;document.querySelectorAll('.st').forEach(s=>{const b=s.getBoundingClientRect(),d=Math.abs(b.top+40-vh*.45);if(d<bd){bd=d;best=s}s.classList.remove('act')});if(best){best.classList.add('act');const n=$('sn');if(n){n.textContent=best.dataset.n;$('sk2').textContent='Stage '+(+best.dataset.i+1)+'/8'}}}
addEventListener('scroll',a2sc,{passive:true});
a2theme();

/* ---------- Dream Garage ---------- */
const A2GS=['Wishlist','Researching','Planning','Saving','Financial Readiness Review','Achieved'];
function a2gset(i,k,v){S.garage[i][k]=v;save()}
function a2gtotal(g){const n=x=>+x||0;return n(g.ins)+n(g.fuel)+n(g.maint)+n(g.other)}
function a2garageList(){return `<div class="gc">${S.garage.map((g,i)=>`<div class="gcard ${g.primary?'go':''}"><div class="row"><b class="f">${esc(g.name)}</b>${g.primary?'<span class="pill done">first target</span>':''}</div>
<select aria-label="status" onchange="a2gset(${i},'status',this.value)">${A2GS.map(s=>`<option ${g.status==s?'selected':''}>${s}</option>`).join('')}</select>
<label>Colour</label><input value="${esc(g.colour)}" onchange="a2gset(${i},'colour',this.value)">
<label>Target budget (your estimate, R)</label><input type="number" value="${g.budget}" onchange="a2gset(${i},'budget',this.value)">
<label>Preferred timeframe</label><input value="${esc(g.when)}" placeholder="e.g. 2028" onchange="a2gset(${i},'when',this.value)">
<details><summary>Estimated monthly running costs (optional)</summary>
<label>Insurance (R/month)</label><input type="number" value="${g.ins}" onchange="a2gset(${i},'ins',this.value)">
<label>Fuel (R/month)</label><input type="number" value="${g.fuel}" onchange="a2gset(${i},'fuel',this.value)">
<label>Servicing and tyres (R/month)</label><input type="number" value="${g.maint}" onchange="a2gset(${i},'maint',this.value)">
<label>Other (licensing etc, R/month)</label><input type="number" value="${g.other}" onchange="a2gset(${i},'other',this.value)">
<p class="note">Estimated running cost: R${a2gtotal(g).toLocaleString('en-US')}/month, on top of any deposit, financing and interest you enter separately. These are your own figures, not sourced quotes.</p></details>
<label>Notes</label><textarea rows="2" onchange="a2gset(${i},'note',this.value)">${esc(g.note)}</textarea></div>`).join('')}</div>
<p class="note">This is personal motivation, not a target you owe anyone. ARES never suggests cutting savings or essentials to fund it.</p>`}

/* ---------- Job tracker ---------- */
const JST=['Saved','Preparing','Applied','Recruiter Contact','Assessment','Interview','Offer','Rejected','Withdrawn'];
function a2jadd(){const t=$('jt1').value.trim();if(!t)return;S.jobs.push({id:'j'+Date.now(),employer:t,title:$('jt2').value,loc:$('jt3').value,url:$('jt4').value,stage:'Saved',saved:tk(),applied:'',follow:'',req:$('jt5').value,notes:'',cv:'',hist:[{to:'Saved',at:ISO()}]});save();render()}
function a2jset(i,k,v){const j=S.jobs[i];if(k=='stage'){j.hist=(j.hist||[]).concat({to:v,at:ISO()});if(v=='Applied'&&!j.applied)j.applied=tk()}j[k]=v;save();render()}
function a2jrm(i){if(!confirm('Remove this job record?'))return;S.jobs.splice(i,1);save();render()}
function a2jfit(i){const j=S.jobs[i],req=(j.req||'').split(/\n|,/).map(x=>x.trim()).filter(Boolean);if(!req.length){alert('Add role requirements first, one per line, then try again.');return}
 const have=S.certs.filter(c=>c.status=='Completed').map(c=>c.id.toLowerCase()),work=S.work.map(w=>w.title.toLowerCase()),dem=[],rel=[],miss=[];
 req.forEach(r=>{const lr=r.toLowerCase();if(have.some(h=>lr.includes(h))||work.some(w=>lr.includes(w.split(' ')[0])))dem.push(r);else if(/cloud|network|security|soc|siem|incident/.test(lr))rel.push(r);else miss.push(r)});
 j.fit={dem,rel,miss,at:ISO()};save();render()}
function a2jump(i){const j=S.jobs[i];return `<div class="jb"><div class="row"><b class="f">${esc(j.employer)}${j.title?' \u2014 '+esc(j.title):''}</b><span class="tag">${esc(j.stage)}</span></div>
<div class="note">${esc(j.loc||'')}${j.url?` · <a href="${esc(j.url)}" target="_blank" rel="noopener noreferrer">posting</a>`:''}${j.applied?' · applied '+esc(j.applied):''}</div>
<div class="pipe">${JST.map(s=>`<span class="${j.stage==s?'on':''}" style="cursor:pointer" onclick="a2jset(${i},'stage','${s}')">${s}</span>`).join('')}</div>
<label>Follow-up date</label><input type="date" value="${esc(j.follow)}" onchange="a2jset(${i},'follow',this.value)">
<label>Role requirements (paste from the ad, one per line)</label><textarea rows="2" onchange="a2jset(${i},'req',this.value)">${esc(j.req)}</textarea>
<button class="s" onclick="a2jfit(${i})">Check fit against my records</button>
${j.fit?`<div class="why"><b>Demonstrated:</b> ${j.fit.dem.join('; ')||'none matched'}<br><b>Related evidence:</b> ${j.fit.rel.join('; ')||'none'}<br><b>Not yet demonstrated:</b> ${j.fit.miss.join('; ')||'none'}<br><small class="note">Matched by keyword against your reported certifications and work log, not a real assessment. A certification alone is not proof of readiness.</small></div>`:''}
<label>Notes</label><textarea rows="2" onchange="a2jset(${i},'notes',this.value)">${esc(j.notes)}</textarea>
<div class="row"><button class="s" onclick="a2ask('job: ${esc(j.employer).replace(/'/g,'')}','Help me prepare for this application: &quot;${esc(j.employer).replace(/'/g,'')}&quot;${j.title?' ('+esc(j.title).replace(/'/g,'')+')':''}. Use the role requirements and fit check I have recorded.')">Ask VIGIL</button><button class="s" onclick="a2jrm(${i})">Remove</button></div></div>`}
function a2jobs(){const jb=S.jobs,ct=s=>jb.filter(j=>j.stage==s).length,due=jb.filter(j=>j.follow&&j.follow<=a2ad(tk(),3)&&!['Offer','Rejected','Withdrawn'].includes(j.stage));
 return `<h1>Jobs</h1><p class="sub">Your own saved applications. ARES never invents vacancies, salaries or outcomes, and never applies or contacts anyone for you.</p>
<div class="grid g4">${[['Saved',ct('Saved')],['Applied',ct('Applied')],['Interview',ct('Interview')],['Offer',ct('Offer')]].map(x=>`<div class="card"><h2>${x[0]}</h2><div class="big m">${x[1]}</div></div>`).join('')}</div>
${due.length?`<div class="card silver"><h2>Follow-ups due soon</h2>${due.map(j=>`<div class="row"><span class="f">${esc(j.employer)}</span><span class="m note">${esc(j.follow)}</span></div>`).join('')}</div>`:''}
<div class="card"><h2>Add a role</h2><input id="jt1" placeholder="Employer"><input id="jt2" placeholder="Job title"><div class="row"><input id="jt3" placeholder="Location"><input id="jt4" placeholder="Posting URL"></div><textarea id="jt5" rows="2" placeholder="Requirements, one per line (optional)"></textarea><button class="b" onclick="a2jadd()">Add</button></div>
${jb.length?jb.map((j,i)=>a2jump(i)).join(''):'<p class="note">Nothing saved yet.</p>'}`}
