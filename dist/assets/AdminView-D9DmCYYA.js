import{_ as D,r as g,a as u,c as w,b as s,e as b,v as $,h as r,q as I,g as V,t as n,i as f,p as A,k as S,u as E,s as L,A as M,F as k,l as T,x as B,y,n as C,z as U}from"./index-BZYuOb9C.js";const q=d=>(A("data-v-e23f62c6"),d=d(),S(),d),N={class:"section modal__section"},O={class:"container modal__container grid-column gap-25 ac-c"},W=q(()=>s("h3",{class:"h3 modal__title w-600 ta-c"},"Дата завершения",-1)),z={__name:"AcceptComponent",props:["id"],emits:["close","update"],setup(d,{emit:_}){let i=g("");const p=_,m=d;let h=g("");const x=()=>{console.log(i.value),i.value.trim()?f.put("http://localhost:3000/api/order/"+m.id,{date:i.value}).then(v=>{v.data.success&&(p("update"),p("close"))}):h.value="Заполните дату!"};return(v,l)=>(u(),w("section",N,[s("div",{class:"modal__close w-700 h4 color-white",onClick:l[0]||(l[0]=e=>p("close"))},"✗"),s("div",O,[W,b(s("input",{"onUpdate:modelValue":l[1]||(l[1]=e=>I(i)?i.value=e:i=e),type:"date",id:"date",class:"input",placeholder:""},null,512),[[$,r(i)]]),b(s("div",{class:"color-red ta-c"},n(r(h)),513),[[V,r(h)]]),s("button",{onClick:l[2]||(l[2]=e=>x()),class:"btn-main"},"Принять")])]))}},F=D(z,[["__scopeId","data-v-e23f62c6"]]),o=d=>(A("data-v-835e6310"),d=d(),S(),d),Y={class:"section admin__section"},G={class:"container admin__container gap-50"},R=o(()=>s("h2",{class:"h2 admin__title js-s w-700"}," Управление заказами ",-1)),H={class:"admin__card grid grid-row gap-25 ai-c jc-sb width-100"},J={class:"admin-card__first grid grid-row gap-25 jc-s ai-e"},K={class:"admin-card__column grid grid-column gap-25 ac-s ji-s"},P={class:"h4 w-600 admin-card__title"},Q={class:"admin-card__text w-200 grid grid-column gap-10"},X={class:"grid grid-row gap-10 jc-s ai-c"},Z=o(()=>s("span",{class:"w-600 h6"},"Тип:",-1)),ss={class:"admin-card__txt2 w-400"},ts={class:"grid grid-row gap-10 jc-s ai-c"},as=o(()=>s("span",{class:"w-600 h6"},"Дата:",-1)),es={class:"admin-card__txt2 w-400"},is={class:"grid grid-row gap-10 jc-s ai-c"},cs=o(()=>s("span",{class:"w-600 h6"},"Дата заверш.:",-1)),ns={class:"admin-card__txt2 w-400"},os={class:"grid grid-row gap-10 jc-s ai-c"},ds=o(()=>s("span",{class:"w-600 h6"},"Адрес:",-1)),ls={class:"admin-card__txt2 w-400"},_s={class:"grid grid-row gap-10 jc-s ai-c"},ps=o(()=>s("span",{class:"w-600 h5"},"Стоимость:",-1)),rs={class:"admin-card__txt2 w-600 h6 color-dark"},hs={class:"admin-card__column grid grid-column gap-25 ac-s ji-s"},us={class:"admin-card__text w-200 grid grid-column gap-10"},gs={class:"grid grid-row gap-10 jc-s ai-c"},ws=o(()=>s("span",{class:"w-600 h6"},"Кол-во:",-1)),ms={class:"admin-card__txt2 w-400"},vs={class:"grid grid-row gap-10 jc-s ai-c"},fs=o(()=>s("span",{class:"w-600 h6"},"Файл:",-1)),xs=["href"],js={class:"grid grid-row gap-10 jc-s ai-c"},bs=o(()=>s("span",{class:"w-600 h6"},"Контакт:",-1)),ks={class:"admin-card__txt2 w-400"},ys={class:"grid grid-row gap-10 jc-s ai-c"},Cs=o(()=>s("span",{class:"w-600 h6"},"TG:",-1)),Ds={class:"admin-card__txt2 w-400"},As={class:"grid grid-row gap-10 jc-s ai-c"},Ss=o(()=>s("span",{class:"w-600 h5 txt-gradient"},"Статус:",-1)),$s={class:"admin-card__txt2 w-600 h6"},Is={class:"admin-card__column grid grid-column gap-25 ac-s ji-s"},Vs={class:"admin-card__text w-200 grid grid-column gap-10"},Es=["onClick"],Ls=["onClick"],Ms={class:"admin-card__column grid grid-column gap-25 ac-s ji-s js-e"},Ts=o(()=>s("div",{class:"left-half-clipper"},[s("div",{class:"first50-bar"}),s("div",{class:"value-bar"})],-1)),Bs={__name:"AdminView",setup(d){let _=g([]),i=g([]);E();let p=g(!1),m=g(0);const h=()=>{let e=0;f.get(window.origin+"/api/order/").then(a=>{_.value=a.data.orders,_.value.forEach(t=>{let c=0;if(t.status==="Выполнено")c=100;else if(t.status==="Отклонено"||t.status==="На рассмотрении")c=0;else if(t.date_end){let j=100/((new Date(t.date_end)-new Date(t.date))/1e3/60/60);c=Math.ceil(Math.abs(j*((new Date(t.date_end)-new Date)/1e3/60/60)-100)),console.log(c),c>100&&(c=100),c<0&&(c=0)}i.value.push(c)}),document.querySelectorAll(".progress-circle").forEach(t=>{t.classList.add("p"+i.value[e]),i.value[e]>=50&&t.classList.add("over50"),e++})})},x=e=>{p.value=!0,document.body.style.overflowY="hidden",m.value=e},v=e=>{f.delete(window.origin+"/api/order/"+e).then(a=>{h()})},l=()=>{p.value=!1,document.body.style.overflowY=""};return f.get(window.origin+"/api/order/").then(e=>{_.value=e.data.orders,_.value.forEach(a=>{console.log(a.date_end);let t=0;if(a.status==="Выполнено")t=100;else if(a.status==="Отклонено"||a.status==="На рассмотрении")t=0;else if(a.date_end){console.log(new Date(a.date));let c=100/((new Date(a.date_end)-new Date(a.date))/1e3/60/60);t=Math.ceil(Math.abs(c*((new Date(a.date_end)-new Date)/1e3/60/60)-100)),t>100&&(t=100),t<0&&(t=0)}i.value.push(t)})}),L(()=>{M.init();let e=0;document.querySelectorAll(".progress-circle").forEach(a=>{a.classList.add("p"+i.value[e]),i.value[e]>=50&&a.classList.add("over50"),e++})}),(e,a)=>(u(),w(k,null,[s("section",Y,[s("div",G,[R,(u(!0),w(k,null,T(r(_),(t,c)=>(u(),w("div",{class:C([{admin__inner_red:t.status==="Отклонено",admin__inner_yellow:t.status==="На рассмотрении",admin__inner_green:t.status==="Выполнено"},"admin__inner grid grid-column ji-s ac-s gap-50 width-100"]),"data-aos":"fade-up"},[s("div",H,[s("div",J,[s("div",K,[s("h3",P,"Заказ #00"+n(c+1),1),s("div",Q,[s("span",X,[Z,s("span",ss,n(t.title),1)]),s("span",ts,[as,s("span",es,n(t.date.split("T")[0]),1)]),s("span",is,[cs,s("span",ns,n(t.date_end?t.date_end.split("T")[0]:"__.__.____"),1)]),s("span",os,[ds,s("span",ls,n(t.address),1)]),s("span",_s,[ps,s("span",rs,n(t.cost)+"Р.",1)])])]),s("div",hs,[s("div",us,[s("span",gs,[ws,s("span",ms,n(t.count),1)]),s("span",vs,[fs,s("a",{href:t.path,target:"_blank",class:"admin-card__txt2 w-400"},n(t.path.split("\\")[t.path.split("\\").length-1]),9,xs)]),s("span",js,[bs,s("span",ks,n(t.contact),1)]),U(),s("span",ys,[Cs,s("span",Ds,n(t.tg),1)]),s("span",As,[Ss,s("span",$s,n(t.status),1)])])]),s("div",Is,[s("div",Vs,[s("button",{onClick:j=>x(t.id),class:"btn-main"},n(t.status!=="Отклонено"?"Назначить дату":"Возобновить"),9,Es),t.status!=="Отклонено"?(u(),w("button",{key:0,onClick:j=>v(t.id),class:"btn-white"},"Отклонить",8,Ls)):y("",!0)])])]),s("div",Ms,[s("div",{class:C([{"progress-red":t.status==="Отклонено","progress-yellow":t.status==="На рассмотрении","progress-green":t.status==="Выполнено"},"progress-circle admin-card__progress admin"])},[s("span",null,n(r(i)[c]+"%"),1),Ts],2)])])],2))),256))])]),r(p)?(u(),B(F,{key:0,onClose:a[0]||(a[0]=t=>l()),onUpdate:a[1]||(a[1]=t=>h()),id:r(m)},null,8,["id"])):y("",!0)],64))}},qs=D(Bs,[["__scopeId","data-v-835e6310"]]);export{qs as default};