"use strict";(globalThis["webpackChunkdostr"]=globalThis["webpackChunkdostr"]||[]).push([[717],{43717:(e,s,t)=>{t.r(s),t.d(s,{default:()=>O});var a=t(59835),i=t(86970),n=t(61957);const o={class:"flex row no-wrap justify-start",style:{gap:"1rem"}},r={class:"spotnik"},l={key:0,class:"flex row justify-center items-start q-my-md"},c={class:"col q-pl-md q-pr-auto flex row"},u={class:"no-padding text-right sf-mono"},h={key:0,class:"m-8 text-base"},p=(0,a.Uk)(" Start a chat by clicking "),d=(0,a.Uk)(" icon on someone's profile page or user card. ");function g(e,s,t,g,m,k){const b=(0,a.up)("q-btn"),y=(0,a.up)("BaseHeader"),w=(0,a.up)("q-spinner-orbit"),f=(0,a.up)("BaseUserCard"),q=(0,a.up)("q-badge"),M=(0,a.up)("q-item"),C=(0,a.up)("q-list"),x=(0,a.up)("q-icon"),$=(0,a.up)("q-page"),v=(0,a.Q2)("ripple");return(0,a.wg)(),(0,a.j4)($,null,{default:(0,a.w5)((()=>[(0,a.Wm)(y,null,{default:(0,a.w5)((()=>[(0,a._)("div",o,[(0,a._)("span",r,(0,i.zw)(e.$t("inbox")),1),e.$store.getters.unreadChats?((0,a.wg)(),(0,a.j4)(b,{key:0,label:"Mark all as Read",onClick:(0,n.iM)(k.markAllAsRead,["stop"]),color:"info",outline:"",dense:""},null,8,["onClick"])):(0,a.kq)("",!0)])])),_:1}),(0,a.Wm)(C,{class:"q-py-sm q-pr-sm q-gutter-sm"},{default:(0,a.w5)((()=>[m.loading?((0,a.wg)(),(0,a.iD)("div",l,[(0,a.Wm)(w,{color:"accent",size:"md"})])):(0,a.kq)("",!0),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(m.chats,(s=>(0,a.wy)(((0,a.wg)(),(0,a.j4)(M,{key:s.peer,clickable:"",class:"flex row no-padding no-margin justify-between items-center q-gutter-xs",onClickCapture:(0,n.iM)((t=>e.$router.push({name:"messages",params:{pubkey:e.hexToBech32(s.peer,"npub")}})),["stop"])},{default:(0,a.w5)((()=>[(0,a._)("div",c,[s.peer?((0,a.wg)(),(0,a.j4)(f,{key:0,pubkey:s.peer,"action-buttons":!1,class:"col",clickable:!1,"show-following":!0},null,8,["pubkey"])):(0,a.kq)("",!0),e.$store.state.unreadMessages[s.peer]?((0,a.wg)(),(0,a.j4)(q,{key:1,color:"warning",outline:"",class:"text-bold q-my-auto"},{default:(0,a.w5)((()=>[(0,a.Uk)((0,i.zw)(e.$store.state.unreadMessages[s.peer]),1)])),_:2},1024)):(0,a.kq)("",!0)]),(0,a._)("label",u,(0,i.zw)(e.niceDateUTC(s.lastMessage)),1)])),_:2},1032,["onClickCapture"])),[[v]]))),128))])),_:1}),m.loading||m.chats.length?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",h,[(0,a._)("p",null,[p,(0,a.Wm)(x,{unelevated:"",color:"primary",name:"mail_lock",size:"md"}),d])]))])),_:1})}var m=t(34136),k=t(18933),b=t(31020);const y={title:"Dostr - Inbox",meta:{description:{name:"description",content:"Dostr Direct Message Inbox"},keywords:{name:"keywords",content:"nostr dostr decentralized social media siwe siwx"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"}}},w={name:"Inbox",mixins:[k.Z,(0,b.Z)(y)],data(){return{chats:[],loading:!0,sub:{}}},computed:{allChatsNeverRead(){return 0===Object.keys(this.$store.state.lastMessageRead).length}},async mounted(){this.start()},beforeUnmount(){this.stop()},methods:{async start(){this.loading=!0;let e=Object.keys(this.$store.state.relays).length?Object.keys(this.$store.state.relays):Object.keys(this.$store.state.defaultRelays);this.getChats(),this.sub.streamMainIncomingMessages=await(0,m.u$)({authors:[this.$store.state.keys.pub],relays:e,limit:1e3},null,(()=>{this.getChats(),this.loading=!1})),this.sub.streamMainOutgoingMessages=await(0,m.pe)({authors:[this.$store.state.keys.pub],relays:e,limit:1e3},null,(()=>{this.getChats(),this.loading=!1}))},stop(){this.sub.streamMainIncomingMessages&&this.sub.streamMainIncomingMessages.cancel(),this.sub.streamMainOutgoingMessages&&this.sub.streamMainOutgoingMessages.cancel()},async getChats(){this.chats=await(0,m.mw)(this.$store.state.keys.pub),this.chats.forEach((({peer:e})=>this.useProfile(e))),this.allChatsNeverRead&&this.chats.forEach((({peer:e})=>this.$store.commit("haveReadMessage",e)))},markAllAsRead(){this.chats.forEach((e=>{this.$store.commit("haveReadMessage",e.peer)}))},useProfile(e){this.$store.dispatch("useProfile",{pubkey:e})}}};var f=t(11639),q=t(69885),M=t(24455),C=t(13246),x=t(10786),$=t(490),v=t(20990),j=t(22857),Z=t(51136),_=t(69984),R=t.n(_);const I=(0,f.Z)(w,[["render",g]]),O=I;R()(w,"components",{QPage:q.Z,QBtn:M.Z,QList:C.Z,QSpinnerOrbit:x.Z,QItem:$.Z,QBadge:v.Z,QIcon:j.Z}),R()(w,"directives",{Ripple:Z.Z})}}]);