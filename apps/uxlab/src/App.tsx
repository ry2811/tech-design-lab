import { useEffect, useMemo, useState } from 'react';
import {
  Activity, ArrowLeft, ArrowRight, BarChart3, Bell, Bot, Check,
  CheckCircle2, ChevronRight, Circle, Clock3, Cloud, Code2, Command,
  ExternalLink, Eye, Gauge, KanbanSquare, LayoutGrid, Menu, MessageSquare,
  MonitorCheck, MoreHorizontal, Plus, Search, Server, Sparkles, Star,
  TicketCheck, Users, X, Zap,
} from 'lucide-react';

type ProjectId = 'flowboard' | 'metrics' | 'support' | 'status' | 'uxlab';
type Route = 'home' | ProjectId;

const projectMeta: Array<{id: ProjectId; no: string; title: string; type: string; desc: string; color: string; url: string; icon: typeof Activity; tags: string[]}> = [
  { id: 'flowboard', no: '01', title: 'Flowboard', type: 'Productivity SaaS', desc: 'Quản lý sprint gọn nhẹ cho team startup.', color: '#7157ff', url: 'https://flowboard-orcin-xi.vercel.app', icon: KanbanSquare, tags: ['Product', 'Frontend', 'Interaction'] },
  { id: 'metrics', no: '02', title: 'Northstar', type: 'Growth Analytics', desc: 'Dashboard theo dõi activation, retention và revenue.', color: '#14a475', url: 'https://northstar-gamma-five.vercel.app', icon: BarChart3, tags: ['Data viz', 'Dashboard', 'UX'] },
  { id: 'support', no: '03', title: 'ReplyAI', type: 'AI Customer Support', desc: 'Helpdesk có trợ lý AI soạn câu trả lời.', color: '#e95f3d', url: 'https://replyai-pi.vercel.app', icon: Bot, tags: ['AI UX', 'Workflow', 'B2B'] },
  { id: 'status', no: '04', title: 'InfraWatch', type: 'DevOps Monitoring', desc: 'Theo dõi uptime và xử lý sự cố hệ thống.', color: '#1677ff', url: 'https://infrawatch-brown.vercel.app', icon: MonitorCheck, tags: ['DevOps', 'Realtime UI', 'IT'] },
  { id: 'uxlab', no: '05', title: 'UX Lab', type: 'Research Platform', desc: 'Lập kế hoạch, ghi nhận và tổng hợp usability test.', color: '#d44993', url: 'https://uxlab-lovat.vercel.app', icon: Users, tags: ['Research', 'Prototype', 'UI/UX'] },
];

function useRoute() {
  const read = (): Route => {
    const value = location.hash.replace('#/', '') as Route;
    return projectMeta.some(p => p.id === value) ? value : 'home';
  };
  const [route, setRoute] = useState<Route>(read);
  useEffect(() => { const fn = () => setRoute(read()); addEventListener('hashchange', fn); return () => removeEventListener('hashchange', fn); }, []);
  return route;
}

function Logo({ light = false }: { light?: boolean }) {
  return <a className={`logo ${light ? 'logo--light' : ''}`} href="#/"><span><Command size={18}/></span>product<span className="logo-dot">lab.</span></a>;
}

function notify(message: string) {
  window.dispatchEvent(new CustomEvent('product-notification', { detail: message }));
}

function ToastHost() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    let timer = 0;
    const handler = (event: Event) => {
      setMessage((event as CustomEvent<string>).detail);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(''), 2600);
    };
    window.addEventListener('product-notification', handler);
    return () => { window.removeEventListener('product-notification', handler); window.clearTimeout(timer); };
  }, []);
  return <div className={`product-toast ${message ? 'show' : ''}`}><CheckCircle2 size={17}/>{message}</div>;
}

function App() {
  const route = useRoute();
  const standalone = import.meta.env.VITE_PROJECT as ProjectId | undefined;
  const isStandalone = projectMeta.some(project => project.id === standalone);
  if (standalone && isStandalone) return <ProjectShell id={standalone} standalone />;
  return route === 'home' ? <Home /> : <ProjectShell id={route} />;
}

function Home() {
  return <main className="home">
    <nav className="home-nav"><Logo/><div className="nav-links"><a href="#work">Dự án</a><a href="#about">Về bộ demo</a><a className="nav-cta" href="mailto:hello@example.com">Liên hệ <ArrowRight size={15}/></a></div></nav>
    <section className="hero">
      <div className="hero-kicker"><Sparkles size={15}/> OPEN FOR STARTUP OPPORTUNITIES</div>
      <h1>Tôi biến vấn đề phức tạp<br/>thành sản phẩm <em>dễ dùng.</em></h1>
      <p>5 sản phẩm tương tác thể hiện tư duy product, kỹ năng frontend và khả năng thiết kế trải nghiệm cho môi trường startup.</p>
      <a className="primary-btn" href="#work">Xem dự án <ArrowRight size={17}/></a>
      <div className="hero-stats"><div><strong>05</strong><span>Sản phẩm</span></div><div><strong>15+</strong><span>Luồng tương tác</span></div><div><strong>100%</strong><span>Responsive</span></div></div>
      <div className="orb orb-a"/><div className="orb orb-b"/><div className="grid-mark">+</div>
    </section>
    <section className="work" id="work">
      <div className="section-head"><div><span>SELECTED WORK</span><h2>Những sản phẩm tôi đã xây</h2></div><p>Mỗi dự án giải quyết một bài toán startup khác nhau, từ vận hành nội bộ đến tăng trưởng và hạ tầng.</p></div>
      <div className="project-grid">{projectMeta.map((project, index) => <ProjectCard key={project.id} project={project} index={index}/>)}</div>
    </section>
    <section className="about" id="about"><div><span className="eyebrow">HOW I WORK</span><h2>Design with intent.<br/>Build with care.</h2></div><div className="principles"><p><b>01 — Hiểu vấn đề</b><span>Chuyển nhu cầu người dùng và mục tiêu kinh doanh thành một bài toán rõ ràng.</span></p><p><b>02 — Prototype nhanh</b><span>Ưu tiên luồng chính, kiểm chứng sớm và giảm chi phí thay đổi.</span></p><p><b>03 — Ship & đo lường</b><span>Xây component có thể mở rộng và theo dõi tác động sau khi ra mắt.</span></p></div></section>
    <footer><Logo light/><p>Built with React, TypeScript & product thinking.</p><span>© 2026</span></footer>
  </main>;
}

function ProjectCard({ project, index }: { project: typeof projectMeta[number]; index: number }) {
  const Icon = project.icon;
  return <a href={project.url} target="_blank" rel="noreferrer" className={`project-card project-card--${index}`} style={{'--accent': project.color} as React.CSSProperties}>
    <div className="card-top"><span>{project.no} / {project.type}</span><span className="round-link"><ArrowRight size={18}/></span></div>
    <div className="product-preview">
      <div className="preview-window"><div className="preview-bar"><i/><i/><i/></div><div className="preview-body"><span className="fake-side"><Icon size={21}/><i/><i/><i/></span><span className="fake-main"><b/><i/><i/><i/></span></div></div>
    </div>
    <h3>{project.title}</h3><p>{project.desc}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
  </a>;
}

function ProjectShell({ id, standalone = false }: { id: ProjectId; standalone?: boolean }) {
  const project = projectMeta.find(p => p.id === id)!;
  const [navIndex, setNavIndex] = useState(0);
  const standaloneLinks = [
    { label: 'Overview', icon: LayoutGrid },
    { label: id === 'flowboard' ? 'My tasks' : id === 'metrics' ? 'Reports' : id === 'support' ? 'Inbox' : id === 'status' ? 'Monitors' : 'Studies', icon: id === 'flowboard' ? CheckCircle2 : id === 'metrics' ? BarChart3 : id === 'support' ? MessageSquare : id === 'status' ? Server : Users },
    { label: 'Activity', icon: Activity },
    { label: 'Settings', icon: Command },
  ];
  return <div className={`app-shell project-${id} ${standalone ? 'app-shell--standalone' : ''}`} style={{'--brand': project.color} as React.CSSProperties}>
    <aside className="demo-rail">{!standalone && <a href="#/" className="rail-back"><ArrowLeft size={18}/><span>Portfolio</span></a>}<div className="rail-brand"><project.icon size={23}/><span>{project.title}</span></div><div className="rail-label">{standalone ? 'WORKSPACE' : 'PROJECTS'}</div>{standalone ? standaloneLinks.map((link, index) => <a key={link.label} href={`#${link.label.toLowerCase().replace(' ', '-')}`} onClick={() => {setNavIndex(index); notify(`${link.label} selected`);}} className={navIndex === index ? 'active' : ''}><link.icon size={18}/><span>{link.label}</span></a>) : projectMeta.map(p => <a key={p.id} href={`#/${p.id}`} className={p.id === id ? 'active' : ''}><p.icon size={18}/><span>{p.title}</span></a>)}<div className="rail-user"><span>KN</span><div><b>Khoi Nguyen</b><small>Admin workspace</small></div></div></aside>
    <section className="demo-content"><header className="mobile-demo-head"><Logo/><button aria-label="Open menu" onClick={() => notify('Navigation is available on desktop')}><Menu size={20}/></button></header>{navIndex === 0 ? <>{id === 'flowboard' && <Flowboard/>}{id === 'metrics' && <Metrics/>}{id === 'support' && <Support/>}{id === 'status' && <Status/>}{id === 'uxlab' && <UxLab/>}</> : <WorkspaceSection id={id} section={standaloneLinks[navIndex].label}/>}</section><ToastHost/>
  </div>;
}

function WorkspaceSection({ id, section }: { id: ProjectId; section: string }) {
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const featureContent: Record<ProjectId, string[]> = {
    flowboard: ['Tasks assigned to me', 'Due this week', 'Recently completed'],
    metrics: ['Revenue performance', 'Activation cohorts', 'Channel attribution'],
    support: ['Urgent conversations', 'Waiting for customer', 'Recently resolved'],
    status: ['HTTP monitors', 'Database checks', 'Background workers'],
    uxlab: ['Active studies', 'Participant responses', 'Research repository'],
  };
  if (section === 'Activity') return <div className="workspace-section"><DemoHeader eyebrow="Workspace" title="Recent activity"/><div className="workspace-card"><div className="activity-item"><CheckCircle2/><div><b>Workspace data updated</b><p>Metrics and statuses were synced just now.</p></div><small>Now</small></div><div className="activity-item"><Users/><div><b>New collaborator joined</b><p>An Nguyen accepted the workspace invitation.</p></div><small>2h</small></div><div className="activity-item"><MessageSquare/><div><b>Team comment added</b><p>“Ready for the next product review.”</p></div><small>Yesterday</small></div></div></div>;
  if (section === 'Settings') return <div className="workspace-section"><DemoHeader eyebrow="Workspace" title="Settings"/><div className="workspace-card settings-card"><h3>Notifications</h3><label><span><b>Product updates</b><small>Important changes and release notes</small></span><input type="checkbox" checked={emailUpdates} onChange={e=>setEmailUpdates(e.target.checked)}/></label><label><span><b>Weekly digest</b><small>A summary delivered every Monday</small></span><input type="checkbox" checked={weeklyDigest} onChange={e=>setWeeklyDigest(e.target.checked)}/></label><button className="solid-btn" onClick={()=>notify('Workspace preferences saved')}>Save preferences</button></div></div>;
  return <div className="workspace-section"><DemoHeader eyebrow="Workspace" title={section}/><div className="workspace-overview">{featureContent[id].map((item,index)=><div className="workspace-card" key={item}><span>0{index+1}</span><h3>{item}</h3><p>{index===0?'Items that need attention today.':index===1?'Current progress across the workspace.':'A clear record of recent work.'}</p><div className="mini-progress"><i style={{width:`${72-index*14}%`}}/></div><b>{72-index*14}% complete</b></div>)}</div></div>;
}

const initialTasks = [
  {id: 1, title: 'Interview 5 power users', status: 'Backlog', label: 'Research', user: 'AN'},
  {id: 2, title: 'Map onboarding drop-offs', status: 'Backlog', label: 'Growth', user: 'MK'},
  {id: 3, title: 'Design empty states', status: 'In progress', label: 'Design', user: 'TN'},
  {id: 4, title: 'Build billing settings', status: 'In progress', label: 'Frontend', user: 'JL'},
  {id: 5, title: 'Setup event tracking', status: 'Review', label: 'Data', user: 'AN'},
  {id: 6, title: 'Improve search latency', status: 'Done', label: 'Backend', user: 'MK'},
];

function DemoHeader({ eyebrow, title, children }: {eyebrow: string; title: string; children?: React.ReactNode}) {
  return <div className="demo-header"><div><span>{eyebrow}</span><h1>{title}</h1></div><div className="header-actions"><button className="icon-btn" aria-label="Search" onClick={() => notify('Search opened — press ⌘ K')}><Search size={18}/></button><button className="icon-btn" aria-label="Notifications" onClick={() => notify('You have 1 new product update')}><Bell size={18}/><i/></button>{children}</div></div>;
}

function Flowboard() {
  const [tasks, setTasks] = useState(initialTasks); const [showAdd, setShowAdd] = useState(false); const [title, setTitle] = useState(''); const [filter, setFilter] = useState(false);
  const columns = ['Backlog', 'In progress', 'Review', 'Done'];
  const visibleTasks = filter ? tasks.filter(task => ['Research', 'Design'].includes(task.label)) : tasks;
  useEffect(()=>{if(import.meta.env.VITE_PROJECT!=='flowboard')return;const cached=localStorage.getItem('flowboard-tasks');if(cached){try{setTasks(JSON.parse(cached));return;}catch{/* use API */}}fetch('/api/tasks').then(r=>r.json()).then(data=>setTasks(data.tasks)).catch(()=>notify('Working from offline task data'));},[]);
  useEffect(()=>{if(import.meta.env.VITE_PROJECT==='flowboard')localStorage.setItem('flowboard-tasks',JSON.stringify(tasks));},[tasks]);
  const add = async () => { if (!title.trim()) { notify('Enter a task title first'); return; } let task={id:Date.now(),title,status:'Backlog',label:'Product',user:'KN'};try{const response=await fetch('/api/tasks',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title})});if(response.ok)task=(await response.json()).task;}catch{/* local-first fallback */}setTasks([...tasks, task]); setTitle(''); setShowAdd(false); notify('Task saved and synced'); };
  const move = (id: number) => { const task = tasks.find(item => item.id === id)!; const next = columns[Math.min(columns.indexOf(task.status)+1, 3)]; setTasks(tasks.map(t => t.id === id ? {...t, status: next} : t)); notify(next === task.status ? 'Task is already completed' : `Moved to ${next}`); };
  return <div className="demo-page"><DemoHeader eyebrow="Workspace / Product" title="Q3 Product Sprint"><button className="solid-btn" onClick={() => setShowAdd(true)}><Plus size={17}/> New task</button></DemoHeader>
    <div className="toolbar"><div className="avatar-stack"><span>AN</span><span>MK</span><span>KN</span><span>+4</span></div><button onClick={() => notify('Board view is active')}><LayoutGrid size={16}/> Board</button><button className={filter ? 'active-filter' : ''} onClick={() => {setFilter(!filter); notify(filter ? 'Showing all tasks' : 'Showing research & design tasks');}}>Filter{filter ? ' · 2' : ''}</button><span className="spacer"/><small>{visibleTasks.length} tasks · {Math.round(tasks.filter(t => t.status === 'Done').length / tasks.length * 100)}% complete</small></div>
    <div className="kanban">{columns.map(col => <div className="kanban-col" key={col}><div className="col-title"><span><i className={`dot dot-${col.replace(' ', '')}`}/>{col}</span><b>{visibleTasks.filter(t => t.status === col).length}</b><MoreHorizontal size={17}/></div>{visibleTasks.filter(t => t.status === col).map(t => <button className="task-card" key={t.id} onClick={() => move(t.id)}><span className={`label label-${t.label}`}>{t.label}</span><strong>{t.title}</strong><div><small><Clock3 size={13}/> Sep {10 + t.id}</small><span>{t.user}</span></div></button>)}<button className="add-task" onClick={() => setShowAdd(true)}><Plus size={15}/> Add task</button></div>)}</div>
    {showAdd && <div className="modal-wrap"><div className="modal"><button className="modal-x" onClick={() => setShowAdd(false)}><X size={18}/></button><span>NEW TASK</span><h2>What needs to be done?</h2><input autoFocus value={title} onChange={e => setTitle(e.target.value)} onKeyDown={e => {if(e.key==='Enter')void add();}} placeholder="e.g. Redesign checkout flow"/><div className="modal-actions"><button onClick={() => setShowAdd(false)}>Cancel</button><button className="solid-btn" onClick={()=>void add()}>Create task</button></div></div></div>}
  </div>;
}

function Metrics() {
  const [period, setPeriod] = useState('30D'); const multiplier = period === '7D' ? .28 : period === '90D' ? 2.7 : 1;
  const [remote,setRemote]=useState<{revenue:number;users:number;activation:number;churn:number;series:number[]}|null>(null);
  useEffect(()=>{if(import.meta.env.VITE_PROJECT!=='metrics')return;fetch(`/api/metrics?period=${period}`).then(r=>r.json()).then(setRemote).catch(()=>notify('Showing cached analytics'));},[period]);
  const values = remote?.series || [12,18,15,26,23,35,31,46,43,56,62,58,72,69,84];
  const points = values.map((v,i) => `${i/(values.length-1)*100},${90-v}`).join(' ');
  return <div className="demo-page metrics-page"><DemoHeader eyebrow="Analytics / Overview" title="Good morning, Khoi"><button className="date-btn" onClick={() => {setPeriod(period === '30D' ? '90D' : '30D'); notify('Reporting period updated');}}><Clock3 size={16}/> {period === '90D' ? 'Jul 1 — Sep 30' : 'Sep 1 — Sep 30'}</button></DemoHeader>
    <div className="period-tabs">{['7D','30D','90D'].map(p => <button className={period === p ? 'active' : ''} onClick={() => setPeriod(p)} key={p}>{p}</button>)}</div>
    <div className="metric-cards"><Metric label="Revenue" value={`$${(remote?.revenue??Math.round(42840*multiplier)).toLocaleString()}`} change="+18.2%" icon={Zap}/><Metric label="Active users" value={(remote?.users??Math.round(12784*multiplier)).toLocaleString()} change="+12.4%" icon={Users}/><Metric label="Activation rate" value={`${remote?.activation??64.8}%`} change="+5.1%" icon={Gauge}/><Metric label="Churn" value={`${remote?.churn??2.4}%`} change="−0.8%" icon={Activity}/></div>
    <div className="analytics-grid"><section className="panel chart-panel"><div className="panel-head"><div><span>REVENUE</span><h3>$42,840 <small>+18.2%</small></h3></div><MoreHorizontal/></div><svg className="line-chart" viewBox="0 0 100 100" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#14a475" stopOpacity=".3"/><stop offset="1" stopColor="#14a475" stopOpacity="0"/></linearGradient></defs><polygon points={`0,100 ${points} 100,100`} fill="url(#area)"/><polyline points={points} fill="none" stroke="#14a475" strokeWidth="2" vectorEffect="non-scaling-stroke"/></svg><div className="chart-labels"><span>Sep 1</span><span>Sep 8</span><span>Sep 15</span><span>Sep 22</span><span>Sep 30</span></div></section>
      <section className="panel source-panel"><div className="panel-head"><div><span>ACQUISITION</span><h3>Top channels</h3></div><MoreHorizontal/></div>{[['Organic search',42,'#14a475'],['Direct',28,'#7157ff'],['Referral',18,'#ffb340'],['Social',12,'#e95f3d']].map(([n,v,c]) => <div className="bar-row" key={n as string}><span>{n}</span><div><i style={{width:`${v}%`, background:c as string}}/></div><b>{v}%</b></div>)}</section></div>
    <section className="panel funnel"><div className="panel-head"><div><span>CONVERSION FUNNEL</span><h3>From visitor to customer</h3></div><button onClick={() => notify('Detailed funnel report prepared')} >View report <ChevronRight size={15}/></button></div><div className="funnel-steps">{[['Visitors','48,290','100%'],['Signed up','12,784','26.5%'],['Activated','8,284','64.8%'],['Paid','2,147','25.9%']].map((s,i) => <div key={s[0]}><span>{s[0]}</span><strong>{s[1]}</strong><small>{s[2]} conversion</small>{i<3 && <ArrowRight/>}</div>)}</div></section>
  </div>;
}

function Metric({label,value,change,icon:Icon}:{label:string;value:string;change:string;icon:typeof Zap}) { return <div className="metric"><div><span>{label}</span><Icon size={18}/></div><strong>{value}</strong><small>{change} <i>vs last period</i></small></div> }

const tickets = [
  {id:1, name:'Linh Pham', subject:'Cannot export my report', time:'2m', priority:'Urgent', text:'Hi team, I have tried exporting the monthly report three times but it keeps getting stuck...'},
  {id:2, name:'Marco Silva', subject:'Question about team billing', time:'18m', priority:'Normal', text:'Can you help me understand how adding new seats affects our next invoice?'},
  {id:3, name:'Emma Wilson', subject:'Love the new dashboard!', time:'1h', priority:'Low', text:'Just wanted to say the latest update is fantastic. Great work by the team!'},
];
function Support() {
  const [selected, setSelected] = useState(0); const [reply, setReply] = useState(''); const [thinking,setThinking] = useState(false); const [tab,setTab] = useState('Unassigned'); const [closed,setClosed] = useState(false); const [note,setNote] = useState(false); const ticket=tickets[selected];
  const generate=async()=>{setThinking(true);try{const response=await fetch('/api/draft',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(ticket)});if(!response.ok)throw new Error('draft failed');const data=await response.json();setReply(data.draft);notify(`AI draft ready · ${Math.round(data.confidence*100)}% confidence`);}catch{setReply(`Hi ${ticket.name.split(' ')[0]},\n\nThanks for reaching out. I checked your workspace and have a quick solution ready. Please refresh the page, then try the action once more.\n\nBest,\nKhoi`);notify('Offline draft generated');}finally{setThinking(false)}};
  return <div className="support-layout"><div className="inbox"><DemoHeader eyebrow="Support / Inbox" title="Conversations"><button className="icon-btn" aria-label="Search conversations" onClick={() => notify('Search is focused on conversations')}><Search size={17}/></button></DemoHeader><div className="inbox-tabs">{[['Unassigned',8],['Mine',3],['All',11]].map(([name,count])=><button key={name} className={tab===name?'active':''} onClick={()=>{setTab(name as string);notify(`Showing ${String(name).toLowerCase()} conversations`);}}>{name} {name!=='All'&&<b>{count}</b>}</button>)}</div>{tickets.map((t,i)=><button key={t.id} className={`ticket ${selected===i?'active':''}`} onClick={()=>{setSelected(i);setClosed(false);}}><span className="customer-avatar">{t.name.split(' ').map(x=>x[0]).join('')}</span><div><strong>{t.name}</strong><b>{t.subject}</b><p>{t.text}</p></div><small>{t.time}</small></button>)}</div>
    <div className="conversation"><div className="conversation-head"><div><strong>{ticket.subject}</strong><span><i/> {ticket.priority} priority · #{2040+ticket.id}</span></div><button onClick={()=>{setClosed(!closed);notify(closed?'Conversation reopened':'Conversation closed');}}><CheckCircle2 size={16}/> {closed?'Reopen':'Close'}</button><MoreHorizontal size={19}/></div><div className="messages"><div className="message customer-msg"><span className="customer-avatar">{ticket.name.split(' ').map(x=>x[0]).join('')}</span><div><b>{ticket.name}<small>Today, 10:42</small></b><p>{ticket.text}</p><p>Could you please help me resolve this?</p></div></div><div className="ai-summary"><Sparkles size={16}/><div><b>AI summary</b><p>Customer needs help with “{ticket.subject.toLowerCase()}”. Sentiment is neutral; likely solvable with a standard troubleshooting response.</p></div></div></div><div className="composer"><div className="composer-tabs"><button className={!note?'active':''} onClick={()=>setNote(false)}>Reply</button><button className={note?'active':''} onClick={()=>setNote(true)}>Internal note</button><button className="ai-button" onClick={generate}><Sparkles size={14}/>{thinking?'Writing…':'Draft with AI'}</button></div><textarea value={reply} onChange={e=>setReply(e.target.value)} placeholder={note?'Write a private note…':'Write a reply…'}/><div className="composer-foot"><span>Press ⌘ Enter to send</span><button className="send-btn" onClick={()=>{if(!reply.trim()){notify('Write a message first');return;}setReply('');notify(note?'Internal note added':'Reply sent to customer');}}>{note?'Add note':'Send reply'} <ArrowRight size={15}/></button></div></div></div>
    <aside className="customer-info"><span className="customer-avatar large">{ticket.name.split(' ').map(x=>x[0]).join('')}</span><h3>{ticket.name}</h3><p>{ticket.name.toLowerCase().replace(' ','.')}@acme.co</p><div className="info-block"><span>COMPANY</span><b>Acme Studio</b><span>PLAN</span><b>Pro · $49/month</b><span>CUSTOMER SINCE</span><b>March 2025</b></div><div className="info-block"><span>RECENT ACTIVITY</span><p><Check size={14}/> Upgraded to Pro</p><p><Eye size={14}/> Viewed billing page</p></div></aside>
  </div>;
}

function Status() {
 const [services,setServices]=useState([{n:'API Gateway',up:true,ms:82},{n:'Web application',up:true,ms:124},{n:'PostgreSQL',up:true,ms:18},{n:'Background jobs',up:false,ms:0}]);
 const [showAll,setShowAll]=useState(false);
 const [serverInfo,setServerInfo]=useState<{region:string;latency:number;checkedAt:string}|null>(null);
 const checkBackend=async()=>{try{const response=await fetch('/api/health');const data=await response.json();setServerInfo(data);notify(`Backend healthy · ${data.latency}ms · ${data.region}`);}catch{notify('Health endpoint is temporarily unavailable');}};
 useEffect(()=>{if(import.meta.env.VITE_PROJECT==='status')void checkBackend();},[]);
 const uptime=useMemo(()=>((services.filter(s=>s.up).length/services.length)*100).toFixed(2),[services]);
 return <div className="demo-page status-page"><DemoHeader eyebrow="Infrastructure / Overview" title="System health"><button className="outline-btn" onClick={()=>void checkBackend()}><Activity size={16}/> Check API</button><button className="solid-btn" onClick={()=>{if(services.some(s=>s.n==='Redis cache')){notify('Redis monitor already exists');return;}setServices([...services,{n:'Redis cache',up:true,ms:12}]);notify('Redis cache monitor created');}}><Plus size={16}/> New monitor</button></DemoHeader><div className={`overall ${services.every(s=>s.up)?'all-up':''}`}><span><Activity size={24}/></span><div><b>{services.every(s=>s.up)?'All systems operational':'Partial system outage'}</b><p>Uptime across all services: {uptime}% {serverInfo&&`· API ${serverInfo.latency}ms · ${serverInfo.region}`}</p></div><small>{serverInfo?'Checked by backend':'Checking API…'}</small></div>
 <div className="status-grid"><section className="panel services"><div className="panel-head"><div><span>LIVE STATUS</span><h3>Services</h3></div><button aria-label="Service options" onClick={()=>notify('All monitors refresh every 30 seconds')}><MoreHorizontal/></button></div>{services.map((s,i)=><button className="service-row" key={s.n} onClick={()=>{setServices(services.map((x,j)=>j===i?{...x,up:!x.up,ms:x.up?0:Math.floor(20+Math.random()*100)}:x));notify(`${s.n} marked ${s.up?'down':'operational'}`);}}><span className={s.up?'service-icon up':'service-icon down'}>{s.up?<Check size={16}/>:<X size={16}/>}</span><div><b>{s.n}</b><small>{s.up?'Operational':'Major outage'}</small></div><div className="uptime-bars">{Array.from({length:18}).map((_,j)=><i className={!s.up&&j>14?'bad':''} key={j}/>)}</div><strong>{s.up?`${s.ms} ms`:'Down'}</strong></button>)}</section>
 <section className="panel latency"><div className="panel-head"><div><span>PERFORMANCE</span><h3>Response time</h3></div><span className="live"><i/> Live</span></div><div className="latency-number"><strong>82</strong><span>ms<br/><small>average</small></span></div><div className="latency-chart">{[30,42,36,58,47,62,55,74,68,52,64,49,44,59,53,38,43,36,51,39].map((v,i)=><i style={{height:`${v}%`}} key={i}/>)}</div><div className="latency-foot"><span>P50 <b>62ms</b></span><span>P95 <b>142ms</b></span><span>P99 <b>280ms</b></span></div></section></div>
 <section className="panel incidents"><div className="panel-head"><div><span>INCIDENT HISTORY</span><h3>Recent incidents</h3></div><button onClick={()=>{setShowAll(!showAll);notify(showAll?'Showing recent incidents':'Full incident history loaded');}}>{showAll?'Show recent':'View all'} <ChevronRight size={15}/></button></div><div className="incident-row"><span className="incident-date">SEP<br/><b>08</b></span><div><b>Delayed background jobs</b><p>Queue workers experienced elevated processing time.</p></div><span className="resolved">Resolved</span><small>32 min</small></div><div className="incident-row"><span className="incident-date">AUG<br/><b>24</b></span><div><b>API increased error rate</b><p>A deployment caused intermittent 500 responses.</p></div><span className="resolved">Resolved</span><small>18 min</small></div>{showAll&&<div className="incident-row"><span className="incident-date">JUL<br/><b>11</b></span><div><b>Database connection saturation</b><p>Read replicas briefly reached their connection limit.</p></div><span className="resolved">Resolved</span><small>41 min</small></div>}</section></div>;
}

function UxLab() {
 const steps=['Welcome','Background','Task 1','Task 2','Wrap up']; const [step,setStep]=useState(0); const [rating,setRating]=useState(0);
 const [serverScore,setServerScore]=useState(8.4);
 const share=()=>{void navigator.clipboard?.writeText(location.href).then(()=>notify('Study link copied to clipboard')).catch(()=>notify('Share link is ready'));};
 const analyze=async()=>{try{const response=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({rating,taskSeconds:42})});const data=await response.json();setServerScore(data.usabilityScore);notify(`${data.difficulty} task · analysis saved`);}catch{notify('Response saved locally');}setStep(4);};
 return <div className="demo-page ux-page"><DemoHeader eyebrow="Research / Study #12" title="Checkout usability test"><button className="outline-btn" onClick={()=>{setStep(0);setRating(0);notify('Participant preview restarted');}}><Eye size={16}/> Preview</button><button className="solid-btn" onClick={share}>Share study <ExternalLink size={15}/></button></DemoHeader><div className="study-meta"><div><span>STATUS</span><b><i/> Recruiting</b></div><div><span>RESPONSES</span><b>8 / 12</b></div><div><span>COMPLETION</span><b>72%</b></div><div><span>AVG. TIME</span><b>6m 24s</b></div></div>
 <div className="ux-grid"><section className="panel prototype"><div className="prototype-top"><span>INTERACTIVE PROTOTYPE</span><div>{steps.map((_,i)=><i className={i<=step?'active':''} key={i}/>)}</div><small>{step+1} / {steps.length}</small></div><div className="phone"><div className="phone-island"/><div className="phone-body">{step===0&&<><span className="mini-logo"><Sparkles size={18}/></span><h3>Help us improve checkout</h3><p>This quick study takes about 5 minutes. There are no wrong answers.</p><button onClick={()=>setStep(1)}>Get started <ArrowRight size={15}/></button></>}{step===1&&<><small>ABOUT YOU</small><h3>How often do you shop online?</h3>{['Every week','A few times a month','Rarely'].map(x=><button className="choice" onClick={()=>setStep(2)} key={x}><Circle size={15}/>{x}</button>)}</>}{step===2&&<><small>TASK 1 OF 2</small><h3>Find a pair of running shoes under $100</h3><div className="mock-product"><div>👟</div><b>Cloud Runner</b><span>$89</span></div><button onClick={()=>setStep(3)}>Add to cart</button></>}{step===3&&<><small>TASK 2 OF 2</small><h3>How easy was that task?</h3><div className="ratings">{[1,2,3,4,5].map(n=><button className={rating===n?'active':''} onClick={()=>setRating(n)} key={n}><Star size={19}/>{n}</button>)}</div><button disabled={!rating} onClick={()=>void analyze()}>Analyze response</button></>}{step===4&&<><span className="success-mark"><Check size={28}/></span><h3>Thank you!</h3><p>Your feedback was analyzed and added to the research report.</p><button onClick={()=>setStep(0)}>Restart prototype</button></>}</div></div><div className="prototype-controls"><button disabled={step===0} onClick={()=>setStep(Math.max(0,step-1))}><ArrowLeft size={15}/> Previous</button><span>{steps[step]}</span><button disabled={step===4} onClick={()=>setStep(Math.min(4,step+1))}>Next <ArrowRight size={15}/></button></div></section>
 <aside className="panel insights"><div className="panel-head"><div><span>LIVE INSIGHTS</span><h3>What we learned</h3></div><Sparkles size={18}/></div><div className="insight-score"><div><strong>{serverScore}</strong><small>/ 10</small></div><span>Usability score<b>Analyzed by research API</b></span></div><h4>TOP THEMES</h4>{[['Users expect filters above results',6],['Delivery cost appears too late',4],['Guest checkout is easy to find',3]].map(([x,n],i)=><div className="theme" key={x as string}><span>{i+1}</span><p>{x}</p><b>{n} mentions</b></div>)}<h4>KEY QUOTE</h4><blockquote>“I found what I wanted quickly, but I wish I knew the delivery fee before the last step.”<small>— Participant 04</small></blockquote><button className="insight-link" onClick={()=>notify('Research report generated with 8 responses')}>Open research report <ArrowRight size={15}/></button></aside></div></div>;
}

export default App;
