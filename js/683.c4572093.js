"use strict";(globalThis["webpackChunkdostr"]=globalThis["webpackChunkdostr"]||[]).push([[683],{767:(t,i,e)=>{e.r(i),e.d(i,{default:()=>N});var o=e(59835),s=e(86970);const a=(0,o._)("div",{class:"bottom-border"},null,-1);function n(t,i,e,n,c,r){const h=(0,o.up)("BaseHeader"),d=(0,o.up)("BasePost"),l=(0,o.up)("BaseButtonLoadMore"),f=(0,o.up)("q-page");return(0,o.wg)(),(0,o.j4)(f,null,{default:(0,o.w5)((()=>[(0,o.Wm)(h,{class:"spotnik"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,s.zw)(t.$t("notifications")),1)])),_:1}),(0,o._)("div",null,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(c.notifications,(i=>((0,o.wg)(),(0,o.iD)("div",{key:i.id},[(0,o.Wm)(d,{event:i,highlighted:t.$store.state.lastNotificationRead<i.created_at},null,8,["event","highlighted"]),a])))),128)),(0,o.Wm)(l,{"loading-more":c.loadingMore,"reached-end":c.reachedEnd,onClick:r.loadMore},null,8,["loading-more","reached-end","onClick"])])])),_:1})}var c=e(18933),r=e(26041),h=e(34136),d=e(31020),l=e(75094);const f={title:"Dostr - notifications",meta:{description:{name:"description",content:"Nostr notifications on Dostr"},keywords:{name:"keywords",content:"nostr decentralized social media"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"}}},u={name:"Notifications",mixins:[c.Z,(0,d.Z)(f)],components:{BaseButtonLoadMore:l.Z},data(){return{notifications:[],notificationsSet:new Set,reachedEnd:!1,unsubscribe:null,reading:!1,loadingMore:!0}},mounted(){this.start()},activated(){this.$store.state.unreadNotifications&&this.loadNew(),this.highlightUnreadNotifications()},deactivated(){this.$store.commit("haveReadNotifications")},beforeUnmount(){this.unsubscribe&&this.unsubscribe()},methods:{async start(){this.loadingMore=!0,this.loadMore(),this.unsubscribe=this.$store.subscribe((({type:t,payload:i},e)=>{switch(t){case"setUnreadNotifications":this.loadNew();break}})),this.highlightUnreadNotifications(),this.loadingMore=!1},async loadMore(){let t;t=this.notifications.length?this.notifications[this.notifications.length-1].created_at-1:Math.round(Date.now()/1e3);let i=await(0,h.t_)(this.$store.state.keys.pub,50,t);await this.processNotifications(i),this.highlightUnreadNotifications(),this.loadingMore=!1},async loadNew(t=40){let i=await(0,h.t_)(this.$store.state.keys.pub,t);await this.processNotifications(i)},processNotifications(t){let i=[];for(let e=0;e<t.length;e++){let i=t[e];this.notificationsSet.has(i.id)||(this.notificationsSet.add(i.id),this.interpolateEventMentions(i),(0,r.aR)(this.notifications,i,((t,i)=>t.created_at<i.created_at)),this.useProfile(i.pubkey))}return i},highlightUnreadNotifications(){this.notifications.length>0&&this.notifications[0].created_at>this.$store.state.lastNotificationRead&&setTimeout((()=>{this.$store.commit("haveReadNotifications")}),3e3*this.notifications.filter((t=>t.created_at>this.$store.state.lastNotificationRead)).length)},addNotificationEvent(t){if(0===this.notifications.length)return void this.notifications.push(t);if(this.notifications[this.notifications.length-1].created_at>=t.created_at)return void this.notifications.push(t);if(this.notifications[0].created_at<=t.created_at)return void this.notifications.unshift(t);let i=this.notifications.findIndex(((i,e,o)=>i.created_at<=t.created_at&&(0===e||o[e-1].created_at>=t.created_at)));i>=0?this.notifications.splice(i,0,t):this.notifications.push(t)},useProfile(t){this.$store.dispatch("useProfile",{pubkey:t})}}};var g=e(11639),p=e(69885),m=e(69984),b=e.n(m);const w=(0,g.Z)(u,[["render",n]]),N=w;b()(u,"components",{QPage:p.Z})}}]);