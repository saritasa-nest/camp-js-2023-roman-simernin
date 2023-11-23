import{r as p,u as h,a as d,s as x,b as w,d as _,j as e,L as b,B as j,e as y,g as N}from"./index-f44f07c0.js";import{c as P,a,A as v,u as A,T as o,n as i,b as E,o as S}from"./authentication-constants-1c0871ea.js";const m={"registration-form-container":"_registration-form-container_bt7oa_1","registration-form":"_registration-form_bt7oa_1","registration-form__login-link":"_registration-form__login-link_bt7oa_13"},L=P({firstName:a().required(),lastName:a().required(),email:a().required().email(),password:a().required().min(v.minPasswordLength),retypePassword:a().required().test("retype-password","Passwords do not match.",function(){const{password:s,retypePassword:n}=this.parent;return s===n})}),T=()=>{const s=h(),n=d(x),l=d(w),c={firstName:"",lastName:"",email:"",password:"",retypePassword:""},{register:t,handleSubmit:g,formState:{errors:r}}=A({defaultValues:c,resolver:S(L)}),u=f=>{s(N(f))};return p.useEffect(()=>()=>{s(_())},[s]),e.jsx("div",{className:m["registration-form-container"],children:e.jsxs("form",{onSubmit:g(u),className:m["registration-form"],children:[e.jsx(o,{label:"First name",error:r.firstName!==void 0,helperText:r.firstName?.message,...t(i("firstName"))}),e.jsx(o,{label:"Last name",error:r.lastName!==void 0,helperText:r.lastName?.message,...t(i("lastName"))}),e.jsx(o,{label:"Email",error:r.email!==void 0,helperText:r.email?.message,...t(i("email"))}),e.jsx(o,{type:"password",label:"Password",error:r.password!==void 0,helperText:r.password?.message,...t(i("password"))}),e.jsx(o,{type:"password",label:"Re-type password",error:r.retypePassword!==void 0,helperText:r.retypePassword?.message,...t(i("retypePassword"))}),e.jsx(b,{isLoading:n}),l!==null&&e.jsx(E,{severity:"error",children:l.message}),e.jsx(j,{type:"submit",children:"Sign out"}),e.jsx(y,{to:"/auth/login",className:m["registration-form__login-link"],children:"Sign in"})]})})},k=p.memo(T);export{k as RegistrationPage};