(this["webpackJsonpfrontmentor-socialdashboard"]=this["webpackJsonpfrontmentor-socialdashboard"]||[]).push([[0],{24:function(e){e.exports=JSON.parse('[{"id":0,"social":"facebook","nick":"@nathanf","num":1987,"type":"F O L L O W E R S","count":1000,"red":[{"title":"Page views","num":87,"rating":3},{"title":"LikesF","num":52,"rating":-2}]},{"id":1,"social":"twitter","nick":"@nathanf","num":1044,"type":"F O L L O W E R S","count":99,"red":[{"title":"Retweets","num":117,"rating":303},{"title":"LikesT","num":507,"rating":553}]},{"id":2,"social":"instagram","nick":"@realnathanf","num":11000,"type":"F O L L O W E R S","count":1000,"red":[{"title":"LikesI","num":5462,"rating":2257},{"title":"Profile Views","num":52000,"rating":1375}]},{"id":3,"social":"youtube","nick":"Nathan F","num":8239,"type":"S U B S C R I B E R S","count":-144,"red":[{"title":"LikesY","num":107,"rating":-19},{"title":"Total Views","num":1407,"rating":-12}]}]')},76:function(e,t,i){},82:function(e,t,i){},83:function(e,t,i){"use strict";i.r(t);i(1);var n=i(63),a=i.n(n),c=(i(76),i(24)),s=i(85),r=i(91),o=i(92),j=i(100),g=i(99),l=i(94),d=i(95),b=i(96),u=i(101),x=i(2),m={"Page views":"images/icon-facebook.svg",LikesF:"images/icon-facebook.svg",Retweets:"images/icon-twitter.svg ",LikesT:"images/icon-twitter.svg ",LikesY:"images/icon-youtube.svg","Total Views":"images/icon-youtube.svg","Profile Views":"images/icon-instagram.svg",LikesI:"images/icon-instagram.svg"};var O=function(){var e=Object(s.b)().colorMode;return Object(x.jsxs)(r.a,{w:"70%",maxW:"1400px",children:[Object(x.jsx)(o.a,{m:5,children:"Overview - Today"}),Object(x.jsx)(j.a,{minChildWidth:"250px",spacingX:"40px",spacingY:"20px",children:c.map((function(t){return t.red.map((function(t){return Object(x.jsx)(r.a,{borderRadius:"5",bg:"dark"===e?"gray.700":"gray.100",children:Object(x.jsxs)(g.a,{p:5,children:[Object(x.jsxs)(l.a,{align:"center",children:[Object(x.jsx)(d.a,{children:t.title.slice(0,-1)}),Object(x.jsx)(b.a,{}),Object(x.jsx)(u.a,{src:m[t.title],p:5})]}),Object(x.jsxs)(l.a,{align:"baseline",children:[Object(x.jsx)(o.a,{children:(i=t.num,i>1e4?i=i/10/10/10+"K":i/=1,i)}),Object(x.jsx)(b.a,{}),Object(x.jsx)(u.a,{src:t.rating>0?"images/icon-up.svg":"images/icon-down.svg",p:2,mt:-2}),Object(x.jsxs)(d.a,{color:t.rating>0?"green":"red",children:[t.rating>0?t.rating:-1*t.rating,"%"]})]})]})},t.title);var i}))}))})]})},h={facebook:"images/icon-facebook.svg",twitter:"images/icon-twitter.svg ",youtube:"images/icon-youtube.svg",instagram:"images/icon-instagram.svg"},p={facebook:"facebook.700",twitter:"twitter.700",youtube:"red.700",instagram:"orange.300"};var v=function(){var e=Object(s.b)().colorMode;return Object(x.jsx)(r.a,{w:"70%",maxW:"1400px",children:Object(x.jsx)(j.a,{minChildWidth:"250px",spacingX:"40px",spacingY:"20px",children:c.map((function(t){return Object(x.jsx)(r.a,{borderRadius:"5",bg:"dark"===e?"gray.700":"gray.100",borderTopWidth:3,borderColor:p[t.social],children:Object(x.jsxs)(g.a,{spacing:5,p:5,children:[Object(x.jsxs)(g.a,{justifyContent:"center",direction:"row",spacing:2,align:"center",children:[Object(x.jsx)(u.a,{src:h[t.social],p:2}),Object(x.jsx)(d.a,{children:t.nick})]}),Object(x.jsxs)(g.a,{align:"center",children:[Object(x.jsx)(o.a,{size:"4xl",children:(i=t.num,i>1e4?i=i/10/10/10+"K":i/=1,i)}),Object(x.jsx)(d.a,{children:t.type})]}),Object(x.jsxs)(g.a,{justifyContent:"center",direction:"row",spacing:1,align:"center",children:[Object(x.jsx)(u.a,{src:t.count>0?"images/icon-up.svg":"images/icon-down.svg",p:2}),Object(x.jsxs)(d.a,{color:t.count>0?"green":"red",children:[t.count>0?t.count:-1*t.count," Today"]})]})]})},t.id);var i}))})})},f=i(97);var w=function(){var e=c.map((function(e){return e.num})),t=0;e.forEach((function(e){t+=e}));var i=Object(s.b)().toggleColorMode;return Object(x.jsx)(r.a,{w:"70%",maxW:"1400px",children:Object(x.jsxs)(l.a,{p:10,children:[Object(x.jsxs)(g.a,{children:[Object(x.jsx)(o.a,{children:"Social Media Dashboard"}),Object(x.jsxs)(d.a,{children:["Total Followers: ",t]})]}),Object(x.jsx)(b.a,{}),Object(x.jsx)(f.a,{colorScheme:"teal",onChange:i,size:"lg"})]})})};i(82);var k=function(){return Object(x.jsx)(g.a,{spacing:5,children:Object(x.jsxs)(g.a,{align:"center",children:[Object(x.jsx)(w,{}),Object(x.jsx)(v,{}),Object(x.jsx)(O,{})]})})},y=i(98);a.a.render(Object(x.jsx)(y.a,{children:Object(x.jsx)(k,{})}),document.getElementById("root"))}},[[83,1,2]]]);
//# sourceMappingURL=main.e6549a51.chunk.js.map