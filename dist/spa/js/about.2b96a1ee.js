"use strict";(globalThis["webpackChunkdostr"]=globalThis["webpackChunkdostr"]||[]).push([[443],{84747:(e,t,s)=>{s.r(t),s.d(t,{default:()=>T});var o=s(59835),a=s(86970);const i={class:"flex row justify-start",style:{gap:"1rem","font-family":"'Spotnik'"}},n={class:"gt-sm"},l={style:{"margin-top":"-10px"},class:"gt-sm"},r={style:{"margin-top":"-8px","margin-left":"5%"},class:"lt-md"},d={style:{"margin-top":"5px"}},h={key:0},u={key:0,class:"row justify-center q-py-sm"};function c(e,t,s,c,p,f){const m=(0,o.up)("q-select"),b=(0,o.up)("BaseHeader"),v=(0,o.up)("BaseButtonLoadMore"),g=(0,o.up)("BasePostThread"),w=(0,o.up)("q-spinner-orbit"),y=(0,o.up)("q-page"),k=(0,o.Q2)("intersection");return(0,o.wg)(),(0,o.j4)(y,{style:{"margin-top":"15px"}},{default:(0,o.w5)((()=>[(0,o.Wm)(b,{style:{"margin-left":"30px"},separator:!1},{default:(0,o.w5)((()=>[(0,o._)("div",i,[(0,o._)("div",n,(0,a.zw)(e.$t("dostr")),1),(0,o._)("div",l,[(0,o.Wm)(m,{borderless:"",modelValue:e.feedName,"onUpdate:modelValue":t[0]||(t[0]=t=>e.feedName=t),options:e.options,"option-value":"value","option-label":"description","emit-value":"","map-input":"","option-disable":"inactive","popup-content-class":"spotnik"},null,8,["modelValue","options"])]),(0,o._)("div",r,[(0,o.Wm)(m,{borderless:"",modelValue:e.feedName,"onUpdate:modelValue":t[1]||(t[1]=t=>e.feedName=t),options:e.options,"option-value":"value","option-label":"description",label:"feed","bottom-slots":"","emit-value":"","map-input":"","option-disable":"inactive","popup-content-class":"spotnik","popup-content-style":"font-size: 12px;"},null,8,["modelValue","options"])])])])),_:1}),(0,o._)("div",d,[e.unreadFeed.length?((0,o.wg)(),(0,o.j4)(v,{key:0,"loading-more":e.loadingUnread,label:"load ".toUpperCase()+e.unreadFeed.length+" unread".toUpperCase(),onClick:e.loadUnread},null,8,["loading-more","label","onClick"])):(0,o.kq)("",!0)]),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.items,((t,s)=>((0,o.wg)(),(0,o.iD)("div",{key:s},[(0,o.Wm)(g,{events:t,class:"full-width","fetch-root-reply":"",onAddEvent:e.processEvent},null,8,["events","onAddEvent"]),s===e.items.length-6?(0,o.wy)(((0,o.wg)(),(0,o.iD)("div",h,null,512)),[[k,e.handleIntersectionObserver]]):(0,o.kq)("",!0)])))),128)),e.loadingMore?((0,o.wg)(),(0,o.iD)("div",u,[(0,o.Wm)(w,{color:"accent",size:"md"})])):(0,o.kq)("",!0)])),_:1})}s(46727);var p=s(18933),f=s(14473),m=s(22330),b=s(34136),v=s(25496),g=s(31020);const w={title:"Dostr - Feed",meta:{description:{name:"description",content:"Ethereum-flavoured Nostr"},keywords:{name:"keywords",content:"nostr dostr decentralized social media siwe siwx"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"}}},y=(0,o.aZ)({name:"Feed",mixins:[p.Z,(0,g.Z)(w)],components:{BaseButtonLoadMore:v.Z},watch:{feedName(e,t){e!==t&&(this.stop(),this.loadMore())}},data(){return{options:[{value:"follows",description:"FOLLOWS"},{value:"global",description:"GLOBAL"},{value:"bots",description:"BOTS",icon:"donut_small"},{value:"ai",description:"AI",inactive:!0}],feed:[],unreadFeed:[],feedSet:new Set,bots:[],botTracker:"29f63b70d8961835b14062b195fc7d84fa810560b36dde0749e4bc084f0f8952",loadingMore:!0,loadingUnread:!1,feedName:"follows",since:Math.round(Date.now()/1e3),until:Math.round(Date.now()/1e3),lastLoaded:Math.round(Date.now()/1e3),refreshInterval:null}},computed:{items(){return this.feed}},async mounted(){0===this.$store.state.follows.length&&(this.feedName="global"),this.loadMore()},async beforeUnmount(){this.stop()},methods:{async loadMore(){this.loadingMore=!0;let e=Object.keys(this.$store.state.relays).length?Object.keys(this.$store.state.relays):Object.keys(this.$store.state.defaultRelays),t=[],s={relays:e,until:this.until+300,limit:100};"follows"===this.feedName?s.authors=this.$store.state.follows:"bots"===this.feedName&&(s.authors=this.bots);let o=await(0,b.GG)(s);if(o)for(let a of o)this.processEvent(a,t);this.feed=this.feed.concat(t),this.refreshInterval||(this.refreshInterval=setInterval((async()=>{let t={relays:e,since:this.since,limit:100};"follows"===this.feedName?t.authors=this.$store.state.follows:"bots"===this.feedName&&(t.authors=this.bots);let s=await(0,b.GG)(t);if(s)for(let e of s)this.processEvent(e);this.since=Math.round(Date.now()/1e3),this.bots.length||(this.bots=await this.getFollows(this.botTracker)),this.loadingMore&&(this.loadingMore=!1)}),1e4))},stop(){this.refreshInterval&&clearInterval(this.refreshInterval),this.feed=[],this.unreadFeed=[],this.feedSet=new Set,this.since=Math.round(Date.now()/1e3),this.until=Math.round(Date.now()/1e3),this.lastLoaded=Math.round(Date.now()/1e3),this.refreshInterval=null},loadUnread(){this.loadingUnread=!0,setTimeout((()=>{this.feed=this.unreadFeed.concat(this.feed),this.unreadFeed=[],this.lastLoaded=Math.round(Date.now()/1e3),this.loadingUnread=!1}),100)},processEvent(e,t=this.feed,s=this.unreadFeed){if(!(0,m.nf)(e))return;if(this.feedSet.has(e.id))return;let o;this.feedSet.add(e.id),this.interpolateEventMentions(e),this.useProfile(e.pubkey),this.until>e.created_at&&(this.until=e.created_at),o=e.pubkey===this.$store.state.keys.pub?t:e.created_at>this.lastLoaded?s:t,"global"===this.feedName&&(this.isBot(e)||this.isAI(e))||(0,f.c)(o,JSON.parse(JSON.stringify(e)),"feed",e.pubkey!==this.$store.state.keys.pub)},async getFollows(e){let t=await(0,b.sf)(e);if(!t?.length)return[];let s=t[0];return s.tags.filter((([e,t])=>"p"===e&&t)).map((([e,t])=>t))},useProfile(e){this.$store.dispatch("useProfile",{pubkey:e})},isBot(e){return!!this.bots.includes(e.pubkey)||!!e.content.includes("https://www.minds.com/newsfeed/")},isAI(e){return"5c10ed0678805156d39ef1ef6d46110fe1e7e590ae04986ccf48ba1299cb53e2"===e.pubkey||e.tags.findIndex((([e,t])=>"p"===e&&"5c10ed0678805156d39ef1ef6d46110fe1e7e590ae04986ccf48ba1299cb53e2"===t))>=0},handleIntersectionObserver(e){this.loadingMore||e.isIntersecting&&this.loadMore()}}});var k=s(11639),M=s(69885),I=s(86870),N=s(4581),S=s(10786),D=s(47817),F=s(70900),Z=s(22857),_=s(79205),O=s(69984),U=s.n(O);const x=(0,k.Z)(y,[["render",c],["__scopeId","data-v-76643af8"]]),T=x;U()(y,"components",{QPage:M.Z,QInfiniteScroll:I.Z,QSelect:N.Z,QSpinnerOrbit:S.Z,QTabs:D.Z,QTab:F.Z,QIcon:Z.Z}),U()(y,"directives",{Intersection:_.Z})}}]);