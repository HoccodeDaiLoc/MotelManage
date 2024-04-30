import Home from "../Pages/Home";
import LoginForm from "../Pages/LoginForm";
import Profiles from"../Pages/Profiles";
import SignUp from "../Pages/SignUp";
// import Upload from "../Pages/Upload";
//for guess 
const publicRoutes=[
    {path:"/",component:Home},
    {path:"/LoginForm",component:LoginForm},
    {path:"/Profiles",component:Profiles},
    {path:"/SignUp",component:SignUp}
   // {path:"/Upload",component:Upload, layout:null}
]
//have account ; dont have =>
const privateRoutes=[
    
]

export{
    publicRoutes,
    privateRoutes
}