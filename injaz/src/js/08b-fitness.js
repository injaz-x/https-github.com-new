/* ========== الرياضة والصحة: معايير عالمية ==========
   المراجع: إرشادات منظمة الصحة العالمية للنشاط البدني 2020، معادلة Mifflin-St Jeor للسعرات،
   Compendium of Physical Activities (قيم MET)، EFSA للماء، AASM/NSF للنوم. القيم تقديرية وليست استشارة طبية. */
const SPORTS=[
  /* [id, اسم, MET, مجموعة, قوة(1/0)] */
  ['gym','جيم وأوزان',5,'قوة',1],['cal','كاليستينكس (وزن الجسم)',8,'قوة',1],['cross','كروس فيت / HIIT',8,'قوة',1],['climb','تسلق',8,'قوة',1],
  ['walk','مشي سريع',4.3,'كارديو',0],['run','جري',9.8,'كارديو',0],['jog','هرولة خفيفة',7,'كارديو',0],['bike','دراجة',7.5,'كارديو',0],['swim','سباحة',7,'كارديو',0],
  ['rope','حبل القفز',11.8,'كارديو',0],['hike','هايكنج / تسلق جبال',6,'كارديو',0],['aero','إيروبيكس / زومبا / رقص',6,'كارديو',0],['stairs','صعود الدرج',8.8,'كارديو',0],
  ['foot','كرة القدم',7,'كرات',0],['bask','كرة السلة',6.5,'كرات',0],['vol','الكرة الطائرة',4,'كرات',0],['hand','كرة اليد',8,'كرات',0],
  ['ten','التنس',7.3,'كرات',0],['pong','تنس الطاولة',4,'كرات',0],['bad','الريشة الطائرة',5.5,'كرات',0],['padel','البادل',6,'كرات',0],
  ['box','ملاكمة',7.8,'قتال',0],['karate','كاراتيه / تايكوندو / جودو',10.3,'قتال',0],['wrest','مصارعة',6,'قتال',1],
  ['yoga','يوغا',2.5,'مرونة',0],['pil','بيلاتس',3,'مرونة',1],['stretch','إطالة واستطالة',2.3,'مرونة',0],['mob','حركية ومرونة المفاصل',2.5,'مرونة',0],
  ['homel','تمارين منزلية خفيفة',3.5,'أخرى',0],['slow','مشي هادئ',3,'أخرى',0],['horse','ركوب الخيل',5.5,'أخرى',0]
];
const SPG=['قوة','كارديو','كرات','قتال','مرونة','أخرى'];
const spOf=id=>SPORTS.find(x=>x[0]===id);
const SUG={
  m:['gym','foot','run','swim','box','cal','bike','bask'],
  f:['stretch','yoga','pil','walk','aero','homel','swim','bad']
};
/* روتينات جاهزة: [اسم الحركة، ثواني] */
const ROUTINES=[
  {id:'r_am',n:'إطالة الصباح',sp:'stretch',w:'f',d:'تنشّط الجسم قبل يومك',steps:[['دوران الرقبة ببطء',30],['دوران الكتفين',30],['القطة والبقرة (على اليدين والركبتين)',60],['وضعية الطفل',45],['مدّ عضلة الفخذ الخلفية – الرجل اليمنى',30],['مدّ عضلة الفخذ الخلفية – الرجل اليسرى',30],['مدّ مثنيات الورك (طعنة) – يمين',30],['مدّ مثنيات الورك (طعنة) – يسار',30],['فتح الصدر وشدّ الذراعين للخلف',30],['الانحناء الأمامي واقفاً',40]]},
  {id:'r_post',n:'استطالة بعد التمرين',sp:'stretch',w:'a',d:'تهدئة وتقليل الشدّ العضلي',steps:[['مدّ الصدر عند الحائط',30],['مدّ الكتف المتقاطع – يمين',25],['مدّ الكتف المتقاطع – يسار',25],['مدّ الفخذ الأمامي – يمين',30],['مدّ الفخذ الأمامي – يسار',30],['مدّ الفخذ الخلفي جالساً',40],['مدّ الورك (وضعية الحمامة) – يمين',40],['مدّ الورك (وضعية الحمامة) – يسار',40],['مدّ السمانة عند الحائط',40],['تنفّس عميق مستلقياً',60]]},
  {id:'r_back',n:'الظهر والوضعية',sp:'mob',w:'a',d:'لمن يجلس ساعات طويلة للمذاكرة',steps:[['إمالة الرقبة جانباً – يمين',25],['إمالة الرقبة جانباً – يسار',25],['سحب الكتفين للخلف',40],['القطة والبقرة',60],['التفاف العمود الفقري جالساً – يمين',30],['التفاف العمود الفقري جالساً – يسار',30],['الكوبرا (رفع الصدر مستلقياً)',30],['وضعية الطفل',45],['تمرين الطائر والكلب (Bird-dog)',60]]},
  {id:'r_tone',n:'تشكيل منزلي بسيط',sp:'homel',w:'f',d:'بدون أدوات، 40 ثانية عمل و20 راحة',steps:[['سكوات',40],['راحة',20],['جسر الألوية (Glute bridge)',40],['راحة',20],['ضغط على الحائط أو الركبتين',40],['راحة',20],['طعنات للخلف (Reverse lunge)',40],['راحة',20],['بلانك على الساعدين',30],['راحة',20],['ركلات الحمار (Donkey kicks)',40],['راحة',20],['تمرين الطائر والكلب',40]]},
  {id:'r_glute',n:'الأرداف والحوض',sp:'homel',w:'f',d:'تقوية الأرداف والحوض وعضلات القاع',steps:[['جسر الألوية',40],['راحة',15],['المحارة (Clamshell) – يمين',30],['المحارة (Clamshell) – يسار',30],['رفع الساق الجانبي – يمين',30],['رفع الساق الجانبي – يسار',30],['راحة',15],['تمارين كيجل (انقباض وإرخاء)',60],['وضعية الضفدع المرنة',45]]},
  {id:'r_yoga',n:'يوغا للمبتدئين',sp:'yoga',w:'f',d:'مرونة وهدوء وتنفّس',steps:[['وقفة الجبل والتنفس',45],['تحية الشمس – تدفق بطيء',90],['الكلب المقلوب',45],['المحارب الأول – يمين',40],['المحارب الأول – يسار',40],['وضعية الشجرة – يمين',30],['وضعية الشجرة – يسار',30],['وضعية الطفل',60],['الاسترخاء النهائي',90]]},
  {id:'r_body',n:'دائرة وزن الجسم',sp:'cal',w:'m',d:'جسم كامل، 40 ثانية عمل و20 راحة',steps:[['ضغط (Push-ups)',40],['راحة',20],['سكوات',40],['راحة',20],['طعنات متبادلة',40],['راحة',20],['بلانك',40],['راحة',20],['بيربي',30],['راحة',30],['تسلق الجبل (Mountain climbers)',40],['راحة',20],['ضغط ألماسي',30]]},
  {id:'r_hiit',n:'كارديو HIIT قصير',sp:'cross',w:'m',d:'30 ثانية شدة قصوى و30 راحة',steps:[['القفز بالنجمة (Jumping jacks)',30],['راحة',30],['ركبة عالية',30],['راحة',30],['سكوات قفز',30],['راحة',30],['بيربي',30],['راحة',30],['تسلق الجبل',30],['راحة',30],['قفز جانبي',30],['راحة',30]]},
  {id:'r_core',n:'البطن والجذع',sp:'cal',w:'a',d:'تقوية الجذع لحماية الظهر',steps:[['بلانك',40],['راحة',15],['بلانك جانبي – يمين',30],['بلانك جانبي – يسار',30],['راحة',15],['رفع الأرجل مستلقياً',30],['كرانش بطيء',40],['راحة',15],['الحشرة الميتة (Dead bug)',40],['الدراجة الهوائية',40]]},
  {id:'r_warm',n:'إحماء 5 دقائق',sp:'mob',w:'a',d:'قبل أي رياضة أو جيم',steps:[['مشي في المكان',45],['دوران الذراعين',30],['دوران الورك',30],['سكوات هوائي',40],['قفز النجمة',40],['اندفاع أمامي مع التفاف',40],['مرجحة الساقين',40]]}
];
const FITP=()=>st.get('fitp',{});
const FITL=()=>st.get('fit',{});
function fitW(){const p=FITP(),bw=st.get('bw',{}),ks=Object.keys(bw).sort();return ks.length?+bw[ks[ks.length-1]]:(+p.w||0)}
function fitAge(){const a=+FITP().age;return a>=5&&a<=100?a:0}
function fitMode(){const a=fitAge();return a&&a<18?'teen':a>=65?'old':'adult'}
function intensity(met){return met<3?['خفيف',0]:met<6?['معتدل',1]:['شديد',2]}
function fitAdd(sp,min,note){
  const s=spOf(sp);if(!s||!(min>0))return null;
  const a=FITL(),k=td();a[k]=a[k]||[];
  const w=fitW()||70,kc=Math.round(s[2]*w*min/60);
  const e={id:uid(),sp:sp,min:Math.round(min),kcal:kc,at:Date.now()};if(note)e.n=note;
  a[k].push(e);st.set('fit',a);return e;
}
function fitWeek(){
  const a=FITL(),days=ago(7);let mod=0,vig=0,light=0,kc=0,tot=0,act=0;const sd=new Set(),ad=new Set();
  days.forEach(d=>(a[d]||[]).forEach(e=>{
    const s=spOf(e.sp);if(!s)return;const lv=intensity(s[2])[1];tot+=e.min;kc+=e.kcal||0;ad.add(d);
    if(lv===0)light+=e.min;else if(lv===1)mod+=e.min;else vig+=e.min;
    if(s[4])sd.add(d);
  }));
  return{mod:mod,vig:vig,light:light,eq:mod+vig*2,kcal:kc,total:tot,strength:sd.size,active:ad.size};
}
function fitStreak(){const a=FITL();let n=0;for(let i=0;i<365;i++){const d=addDays(td(),-i);if((a[d]||[]).length)n++;else if(i>0)break}return n}
function fitTargets(){
  const m=fitMode();
  if(m==='teen')return{lbl:'المراهقون (5–17 سنة)',eq:420,eqTxt:'60 دقيقة يومياً في المتوسط بنشاط معتدل إلى شديد (≈ 420 دقيقة أسبوعياً)',str:3,strTxt:'3 أيام على الأقل أسبوعياً للنشاط الشديد وتقوية العضلات والعظام'};
  if(m==='old')return{lbl:'65 سنة فأكثر',eq:150,eqTxt:'150–300 دقيقة معتدلة أسبوعياً مع تمارين توازن 3 أيام',str:2,strTxt:'يومان على الأقل لتقوية العضلات'};
  return{lbl:'البالغون (18–64 سنة)',eq:150,eqTxt:'150–300 دقيقة معتدلة (أو 75–150 دقيقة شديدة) أسبوعياً',str:2,strTxt:'يومان على الأقل أسبوعياً لتقوية العضلات'};
}
function sleepRange(){const a=fitAge();return a&&a<=12?[9,12]:a&&a<=17?[8,10]:[7,9]}
function bmiInfo(w,h,a){
  if(!w||!h)return null;const b=w/Math.pow(h/100,2);let c='';
  if(a&&a<19)c='للأقل من 19 سنة يُقيَّم بمنحنيات النمو حسب العمر؛ اسأل طبيبك.';
  else c=b<18.5?'نحافة':b<25?'وزن طبيعي':b<30?'وزن زائد':'سمنة';
  return{v:Math.round(b*10)/10,c:c};
}
function bmrOf(sex,w,h,a){if(!sex||!w||!h||!a)return 0;return Math.round(10*w+6.25*h-5*a+(sex==='m'?5:-161))}
const ACTLV=[[1.2,'قليل الحركة (جلوس معظم اليوم)'],[1.375,'خفيف (1–3 أيام رياضة)'],[1.55,'متوسط (3–5 أيام)'],[1.725,'عالٍ (6–7 أيام)']];
let fitGrp='قوة';
/* ---------- العرض ---------- */
RD.fit=()=>{
  const p=FITP(),sex=p.sex,w=fitW(),h=+p.h||0,age=fitAge(),tg=fitTargets(),wk=fitWeek(),a=FITL(),today=a[td()]||[];
  let setup='';
  if(!sex){
    setup=card('أخبرنا عنك لنضبط الرياضة على مقاسك','<p class="mut sm">نستخدم هذا لاقتراح الرياضات والروتينات المناسبة وحساب أهدافك الصحية وفق معايير منظمة الصحة العالمية. يبقى على جهازك.</p>'+fitForm(p),{cls:'full glow'});
  }
  const ring=(v,mx,lbl,sub)=>{const pc=Math.min(100,Math.round(v/mx*100));return '<div class="tile"><b>'+v+(mx?' / '+mx:'')+'</b><span>'+lbl+'</span><div style="height:6px;border-radius:4px;background:rgba(127,127,127,.2);margin-top:8px;overflow:hidden"><div style="height:100%;width:'+pc+'%;background:var(--acc)"></div></div><div class="mut sm" style="margin-top:4px">'+sub+'</div></div>'};
  const wkc=card('نشاطك في آخر 7 أيام','<div class="grid w2">'+ring(wk.eq,tg.eq,'دقائق نشاط (الشديد ×2)',tg.eqTxt)+ring(wk.strength,tg.str,'أيام تقوية',tg.strTxt)+'</div>'+
    '<div class="tiles" style="margin-top:10px"><div class="tile"><b>'+wk.total+'</b><span>إجمالي الدقائق</span></div><div class="tile"><b>'+wk.kcal+'</b><span>سعرات تقديرية</span></div><div class="tile"><b>'+fitStreak()+'</b><span>أيام متتالية</span></div></div>'+
    '<div class="mut sm" style="margin-top:8px">المعيار: '+tg.lbl+'. المرونة والإطالة (نشاط خفيف: '+wk.light+' د) مفيدة لكنها لا تُحسب ضمن دقائق النشاط المعتدل أو الشديد.</div>');
  const sug=SUG[sex]||[];
  const grp=SPG.map(g=>chip(g===fitGrp,'data-a="fitgrp" data-g="'+g+'"',g)).join('');
  const list=SPORTS.filter(s=>s[3]===fitGrp).map(s=>{const lv=intensity(s[2]);return chip(0,'data-a="fitpick" data-s="'+s[0]+'"',(sug.includes(s[0])?'★ ':'')+s[1]+' · '+lv[0])}).join('');
  const sugRow=sug.length?'<div class="mut sm" style="margin-bottom:4px">مقترح لك ★</div><div class="chips">'+sug.map(id=>{const s=spOf(id);return chip(0,'data-a="fitpick" data-s="'+id+'"','★ '+s[1])}).join('')+'</div>':'';
  const tl=today.map(e=>{const s=spOf(e.sp)||[0,e.sp];return '<li><span class="t">'+esc(s[1])+(e.n?' <span class="mut sm">'+esc(e.n)+'</span>':'')+'</span><b class="num">'+e.min+' د</b><span class="mut sm">'+(e.kcal||0)+' سعرة</span><button class="x" data-a="fitdel" data-id="'+e.id+'" aria-label="حذف">×</button></li>'}).join('');
  const logc=card('سجّل نشاطك اليوم',sugRow+'<div class="chips" style="margin:8px 0">'+grp+'</div><div class="chips">'+list+'</div>'+
    '<div style="margin-top:10px">'+(tl?'<ul class="list">'+tl+'</ul>':'<div class="empty">لا نشاط مسجّل اليوم. اختر رياضة من الأعلى.</div>')+'</div>');
  const order=ROUTINES.slice().sort((x,y)=>((y.w===sex)-(x.w===sex)));
  const rts=order.map(r=>{
    const tot=Math.round(r.steps.reduce((s,x)=>s+x[1],0)/60);
    return '<div class="tile" style="text-align:right"><b>'+esc(r.n)+(r.w===sex?' ★':'')+'</b><span>'+tot+' د · '+r.steps.filter(x=>x[0]!=='راحة').length+' حركات</span><div class="mut sm" style="margin:4px 0">'+esc(r.d)+'</div><button class="btn s" data-a="rtgo" data-id="'+r.id+'">ابدأ الآن</button></div>'}).join('');
  const rc=card('روتينات يومية جاهزة','<div class="mut sm" style="margin-bottom:8px">مؤقّت يرشدك حركة بحركة، وعند الانتهاء يُسجَّل النشاط تلقائياً.'+(sex?' ★ = الأنسب لك.':'')+'</div><div class="grid w2">'+rts+'</div>');
  /* الأرقام الصحية */
  const bm=bmiInfo(w,h,age),bmr=bmrOf(sex,w,h,age),act=+p.act||1.2,tdee=bmr?Math.round(bmr*act):0;
  const sr=sleepRange(),wat=sex==='f'?2.0:sex==='m'?2.5:0;
  let hc='';
  if(sex&&w&&h&&age){
    const adult=age>=18,floor=sex==='m'?1500:1200;
    const cut=Math.max(floor,Math.round(tdee*.85/10)*10),gain=Math.round(tdee*1.1/10)*10;
    hc='<div class="tiles"><div class="tile"><b>'+bm.v+'</b><span>مؤشر كتلة الجسم</span></div><div class="tile"><b>'+bmr+'</b><span>حرق الراحة (سعرة)</span></div><div class="tile"><b>'+tdee+'</b><span>احتياجك اليومي</span></div></div>'+
      '<p class="sm" style="margin:8px 0">'+esc(bm.c)+'</p>'+
      '<div class="row"><button class="btn s g" data-a="fitkcal" data-v="'+tdee+'">ثبات '+tdee+'</button>'+(adult?'<button class="btn s g" data-a="fitkcal" data-v="'+cut+'">تخفيف تدريجي '+cut+'</button><button class="btn s g" data-a="fitkcal" data-v="'+gain+'">بناء '+gain+'</button>':'')+'</div>'+
      '<div class="mut sm" style="margin:6px 0">أزرار السعرات تضبط هدفك في قسم الأكل. '+(adult?'التخفيف لا ينزل عن '+floor+' سعرة.':'لمن دون 18 سنة نعتمد الثبات فقط، ولا يُنصح بحمية دون إشراف طبيب.')+'</div>'+
      '<ul class="list"><li><span class="t">البروتين</span><b class="num">'+Math.round(w*(age<18?.9:.8))+' – '+Math.round(w*(age<18?1.4:1.6))+' جم</b></li>'+
      '<li><span class="t">الماء الكلي (طعام + شراب)</span><b class="num">≈ '+wat+' لتر</b></li>'+
      '<li><span class="t">النوم المناسب لعمرك</span><b class="num">'+sr[0]+' – '+sr[1]+' ساعات</b></li></ul>';
  }else hc='<p class="mut">أكمل بياناتك (النوع، العمر، الطول، وزن الجسم من قسم التمارين) لتظهر أهدافك الشخصية.</p>';
  const profc=card('ملفي الصحي',hc+'<div class="row" style="margin-top:10px"><button class="btn g s" data-a="fitedit">تعديل بياناتي</button></div><div class="mut sm" style="margin-top:8px">المراجع: منظمة الصحة العالمية 2020 (النشاط البدني)، معادلة Mifflin-St Jeor، Compendium of Physical Activities، EFSA (الماء)، AASM (النوم). تقديرات عامة وليست استشارة طبية؛ استشر طبيباً قبل بدء برنامج شديد أو عند وجود حالة صحية.</div>');
  return '<div class="grid">'+setup+wkc+logc+rc+profc+'</div>';
};
function fitForm(p){
  return '<div id="fitf" style="display:flex;flex-direction:column;gap:10px"><div class="chips"><button class="chip'+(p.sex==='m'?' on':'')+'" data-a="fitsex" data-v="m">ذكر</button><button class="chip'+(p.sex==='f'?' on':'')+'" data-a="fitsex" data-v="f">أنثى</button></div>'+
  '<div class="row"><label class="f">العمر<input type="number" inputmode="numeric" min="5" max="100" id="fi-age" value="'+(p.age||'')+'" style="width:90px"></label><label class="f">الطول (سم)<input type="number" inputmode="numeric" min="90" max="230" id="fi-h" value="'+(p.h||'')+'" style="width:100px"></label><label class="f">الوزن (كجم)<input type="number" inputmode="decimal" step="0.1" id="fi-w" value="'+(fitW()||'')+'" style="width:100px"></label></div>'+
  '<label class="f">مستوى نشاطك المعتاد<select id="fi-act">'+opts(ACTLV,p.act||1.2)+'</select></label>'+
  '<button class="btn" data-a="fitsave">حفظ</button></div>';
}
let fitSexTmp=null;
ACT.fitsex=t=>{fitSexTmp=t.dataset.v;$$('[data-a=fitsex]').forEach(b=>b.classList.toggle('on',b===t))};
ACT.fitsave=()=>{
  const p=FITP(),sex=fitSexTmp||p.sex;if(!sex){toast('اختر ذكر أو أنثى');return}
  const age=parseInt($('#fi-age').value,10),h=parseInt($('#fi-h').value,10),w=num($('#fi-w').value),act=+$('#fi-act').value;
  const np={sex:sex,age:age>=5&&age<=100?age:'',h:h>=90&&h<=230?h:'',act:act||1.2};
  if(w>=15&&w<=300){np.w=w;const bw=st.get('bw',{});bw[td()]=w;st.set('bw',bw)}
  st.set('fitp',Object.assign({},p,np));fitSexTmp=null;closeSheet();renderSec('fit');toast('تم حفظ بياناتك');
};
ACT.fitedit=()=>{fitSexTmp=null;sheet('<h3>بياناتي</h3>'+fitForm(FITP()))};
ACT.fitgrp=t=>{fitGrp=t.dataset.g;renderSec('fit')};
ACT.fitpick=t=>{
  const s=spOf(t.dataset.s);if(!s)return;const lv=intensity(s[2]);
  sheet('<h3>'+esc(s[1])+'</h3><p class="mut sm">الشدة: '+lv[0]+(s[4]?' · تقوية عضلات':'')+'. كم دقيقة مارستها؟</p><div class="chips" style="margin:8px 0">'+[10,15,20,30,45,60,90].map(m=>chip(0,'data-a="fitmin" data-s="'+s[0]+'" data-m="'+m+'"',m+' د')).join('')+'</div><div class="row"><input type="number" inputmode="numeric" id="fi-min" placeholder="دقائق أخرى" style="width:120px"><button class="btn" data-a="fitmin" data-s="'+s[0]+'" data-m="0">تسجيل</button></div>');
};
ACT.fitmin=t=>{
  let m=+t.dataset.m;if(!m){m=parseInt(($('#fi-min')||{}).value,10)}
  if(!(m>0&&m<=600)){toast('أدخل مدة صحيحة');return}
  const e=fitAdd(t.dataset.s,m);closeSheet();renderSec('fit');if(e)toast('سُجّل '+e.min+' د · ≈ '+e.kcal+' سعرة');
};
ACT.fitdel=t=>{const a=FITL(),k=td();a[k]=(a[k]||[]).filter(e=>e.id!==t.dataset.id);st.set('fit',a);renderSec('fit')};
ACT.fitkcal=t=>{const v=+t.dataset.v;if(v>=1000&&v<=4000){cfg.kcal=v;saveCfg();toast('هدف السعرات '+v)}else toast('القيمة خارج النطاق المسموح')};
/* ---------- مشغّل الروتين ---------- */
let rtT=null;
ACT.rtgo=t=>{
  const r=ROUTINES.find(x=>x.id===t.dataset.id);if(!r)return;
  let i=0,left=r.steps[0][1],run=true;
  sheet('<h3>'+esc(r.n)+'</h3><div id="rt" style="text-align:center"></div>',s=>{
    const box=s.querySelector('#rt');
    const draw=()=>{
      const st0=r.steps[i];
      box.innerHTML='<div class="mut sm">الحركة '+(i+1)+' من '+r.steps.length+'</div><div class="big-n ac" style="margin:6px 0">'+fmtT(left)+'</div><div class="b" style="font-size:1.15em;margin-bottom:6px">'+esc(st0[0])+'</div>'+
        (r.steps[i+1]?'<div class="mut sm">التالي: '+esc(r.steps[i+1][0])+'</div>':'<div class="mut sm">آخر حركة</div>')+
        '<div class="row" style="justify-content:center;margin-top:12px"><button class="btn g" id="rt-p">'+(run?'إيقاف مؤقت':'متابعة')+'</button><button class="btn g" id="rt-n">تخطّي</button><button class="btn d" id="rt-x">إنهاء</button></div>';
      box.querySelector('#rt-p').onclick=()=>{run=!run;draw()};
      box.querySelector('#rt-n').onclick=()=>next();
      box.querySelector('#rt-x').onclick=()=>{clearInterval(rtT);finish(true)};
    };
    const finish=early=>{
      clearInterval(rtT);
      const done=early?r.steps.slice(0,i).reduce((a,x)=>a+x[1],0)+(r.steps[i][1]-left):r.steps.reduce((a,x)=>a+x[1],0);
      const min=Math.round(done/60);
      if(min>=1){const e=fitAdd(r.sp,min,r.n);try{ping()}catch(x){}box.innerHTML='<h3>أحسنت</h3><p>أنهيت «'+esc(r.n)+'» ('+min+' د)'+(e?' · ≈ '+e.kcal+' سعرة':'')+'. سُجّل في نشاطك.</p><button class="btn" data-close>تم</button>';renderSec('fit')}
      else{box.innerHTML='<p>لم يُسجَّل شيء لأن المدة أقل من دقيقة.</p><button class="btn" data-close>إغلاق</button>'}
    };
    const next=()=>{i++;if(i>=r.steps.length){finish(false);return}left=r.steps[i][1];try{ping()}catch(x){}draw()};
    draw();clearInterval(rtT);
    rtT=setInterval(()=>{
      if(!document.body.contains(box)){clearInterval(rtT);return}
      if(!run||!box.querySelector('#rt-p'))return;
      left--;if(left<=0){next();return}
      const n=box.querySelector('.big-n');if(n)n.textContent=fmtT(left);
    },1000);
  });
};
