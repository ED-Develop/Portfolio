(this["webpackJsonpreact-lessons-1"]=this["webpackJsonpreact-lessons-1"]||[]).push([[3],{323:function(a,e,t){a.exports={dialogs:"Dialogs_dialogs__iEN4h",container:"Dialogs_container__1qpD4"}},324:function(a,e,t){a.exports={item:"Dialog_item__17C2k",dialog:"Dialog_dialog__2wMtV",name:"Dialog_name__3hZlG",content:"Dialog_content__297SS",active:"Dialog_active__SsA9O"}},325:function(a,e,t){a.exports={items:"DialogsItems_items__1MA5Y"}},326:function(a,e,t){a.exports={avatar:"MyMessages_avatar__i7zEP",message:"MyMessages_message__3Puh2",content:"MyMessages_content__K6mGl",info:"MyMessages_info__5fUMs",date:"MyMessages_date__2juz5",name:"MyMessages_name__22-vq"}},327:function(a,e,t){a.exports={messages:"Messages_messages__3FSwq"}},328:function(a,e,t){a.exports={avatar:"YourMessages_avatar__2sMDF",message:"YourMessages_message__2FRCv",content:"YourMessages_content__1KaNN",info:"YourMessages_info__194S3",date:"YourMessages_date__M_B-P",name:"YourMessages_name__8T4oH"}},329:function(a,e,t){a.exports={input:"Input_input__Ti6SE"}},337:function(a,e,t){"use strict";t.r(e);var s=t(0),n=t.n(s),l=t(140),m=t(59),r=t(323),c=t.n(r),i=t(324),o=t.n(i),g=t(10),d=function(a){return n.a.createElement("div",{className:o.a.item},n.a.createElement(g.b,{to:"/messages/"+a.id,activeClassName:o.a.active},n.a.createElement("div",{className:o.a.dialog},n.a.createElement("div",null,n.a.createElement("img",{src:a.avatar,alt:"avatar"})),n.a.createElement("div",{className:o.a.content},n.a.createElement("span",{className:o.a.name},a.name),n.a.createElement("span",null,a.date),n.a.createElement("p",null,a.message)))))},u=t(325),_=t.n(u),v=function(a){var e=a.dialogsData.map((function(a){return n.a.createElement(d,{key:a.id,id:a.id,name:a.name,date:a.date,message:a.lastMessage,avatar:a.avatar})}));return n.a.createElement("div",{className:_.a.items},e)},E=t(326),p=t.n(E),f=t(40),M=t.n(f),N=function(a){return n.a.createElement("div",{className:p.a.message},n.a.createElement("div",{className:p.a.content},n.a.createElement("div",{className:p.a.info},n.a.createElement("span",{className:p.a.name},a.login),n.a.createElement("span",{className:p.a.date},a.date)),n.a.createElement("p",null,a.message)),n.a.createElement("img",{className:p.a.avatar,src:a.avatar||M.a,alt:"avatar"}))},D=t(327),b=t.n(D),h=t(328),x=t.n(h),y=function(a){return n.a.createElement("div",{className:x.a.message},n.a.createElement("img",{className:x.a.avatar,src:"https://img.novosti-n.org/upload/ukraine/131388.jpg",alt:"avatar"}),n.a.createElement("div",{className:x.a.content},n.a.createElement("div",{className:x.a.info},n.a.createElement("span",{className:x.a.name},a.name),n.a.createElement("span",{className:x.a.date},a.date)),n.a.createElement("p",null,a.message)))},S=t(329),I=t.n(S),j=t(99),k=t(100),T=t(19),Y=t(49),O=Object(Y.b)(50),P=Object(k.a)({form:"message"})((function(a){var e=a.handleSubmit;return n.a.createElement("form",{onSubmit:e},n.a.createElement(j.a,{castomClassName:"top",component:T.b,validate:[O],placeholder:"Type your message...",name:"messageText"}),n.a.createElement("button",null,"Send"))})),w=function(a){var e=a.addMessage,t=a.userId,s=a.avatar,l=a.login;return n.a.createElement("div",{className:I.a.input},n.a.createElement("img",{src:s||M.a,alt:"avatar"}),n.a.createElement(P,{onSubmit:function(a){e(a.messageText,t,l)}}))},C=function(a){var e=a.messagesData,t=a.avatar,s=a.addMessage,l=a.userId,m=a.login,r=e.map((function(a){return a.userId==l?n.a.createElement(N,{key:a.id,date:a.date,message:a.message,avatar:t,login:m}):n.a.createElement(y,{key:a.id,date:a.date,message:a.message,name:a.user,avatar:a.avatar})}));return n.a.createElement("div",null,n.a.createElement("div",{className:b.a.messages},r),n.a.createElement(w,{login:m,avatar:t,userId:l,addMessage:s}))},q=t(109),F=function(a){var e=a.dialogsData,t=Object(m.a)(a,["dialogsData"]);return n.a.createElement("div",{className:c.a.dialogs},n.a.createElement(q.a,{placeholder:"Search dialog"}),n.a.createElement("div",{className:c.a.container},n.a.createElement(v,{dialogsData:e}),n.a.createElement(C,t)))},V=t(9),z=t(141),A=t(8);e.default=Object(A.d)(Object(V.b)((function(a){return{messagesData:a.dialogsPage.messagesData,dialogsData:a.dialogsPage.dialogsData,messageTextValue:a.dialogsPage.messageTextValue,avatar:a.auth.photos.small,userId:a.auth.userId,login:a.auth.login}}),{addMessage:l.a}),z.a)(F)}}]);
//# sourceMappingURL=3.c676d3ff.chunk.js.map