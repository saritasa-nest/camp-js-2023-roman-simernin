import{r as l,u as p,a as F,s as h,b as x,j as o,d as f,L as j,B as w,e as L,l as C}from"./index-2cecd62c.js";import{c as b,a as t,A as S,u as A,T as m,b as E,o as k,n as v}from"./index.esm-c5944525.js";const y="_loginFormContainer_1jswo_1",N="_loginFormContainer__form_1jswo_6",P="_loginForm_1jswo_1",T="_loginForm__registrationLink_1jswo_16",s={loginFormContainer:y,loginFormContainer__form:N,loginForm:P,loginForm__registrationLink:T},q={email:"",password:""},B=b({email:t().required().email(),password:t().required().min(S.minPasswordLength)}),g=()=>{const e=p(),{isLoading:c,error:n}=F(h),{register:i,handleSubmit:_,formState:{errors:r}}=A({defaultValues:q,resolver:k(B)}),d=u=>{e(C(u))};l.useEffect(()=>()=>{e(x())},[]);const a=v();return o.jsx("div",{className:s.loginFormContainer,children:o.jsxs("form",{onSubmit:_(d),className:f(s.loginForm,s.loginFormContainer__form),children:[o.jsx(m,{label:"Email",error:r.email!==void 0,helperText:r.email?.message,...i(a("email"))}),o.jsx(m,{type:"password",label:"Password",error:r.password!==void 0,helperText:r.password?.message,...i(a("password"))}),o.jsx(j,{isLoading:c}),n!==null&&o.jsx(E,{severity:"error",children:n.message}),o.jsx(w,{type:"submit",children:"Sign in"}),o.jsx(L,{to:"/auth/registration",className:s.loginForm__registrationLink,children:"Sign out"})]})})};g.displayName="camp-login";const R=l.memo(g);export{R as LoginPage};
