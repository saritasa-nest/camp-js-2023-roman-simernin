import{c as t,r as n,j as s,u as d,a as c,f as i}from"./index-f44f07c0.js";const p=t(e=>e.genres.genres,e=>e),m=t(e=>e.genres.isLoading,e=>e),l="_card_1rf1o_1",h={card:l},x=({genre:e})=>s.jsxs("div",{className:h.card,children:[s.jsx("h2",{children:e.name}),s.jsxs("span",{children:["Id - ",e.id]})]}),g=n.memo(x),j=()=>{const e=d(),a=c(p),o=c(m);return n.useEffect(()=>{e(i())},[e]),o?s.jsx("div",{children:"Loading"}):s.jsxs(s.Fragment,{children:[s.jsx("h1",{children:"Genres"}),a.map(r=>s.jsx(g,{genre:r},r.id))]})},f=n.memo(j);export{f as GenresPage};
