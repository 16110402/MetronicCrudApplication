// import './App.css';
// import {
//   BrowserRouter,
//   Routes,
//   Route
// } from "react-router-dom";

// const EmpRoutes = () => {
//   return (
//     <>
//     <Index />
//   <Employ />
//     <BrowserRouter>
//     <Routes>
//     <Route path="/update" element={<Update />}>
        
//     </Route>
//    </Routes>
//     </BrowserRouter>
//     </>
//   );
// }

// export {EmpRoutes};
/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

 import {FC} from 'react'
 import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
 import {PrivateRoutes} from './PrivateRoutes'
 import Index from '../components/Index';
 import {ErrorsPage} from '../modules/errors/ErrorsPage'
 import {Logout, AuthPage, useAuth} from '../modules/auth'
 import {App} from '../App'
 
 /**
  * Base URL of the website.
  *
  * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
  */
 const {PUBLIC_URL} = process.env
 
 const EmpRoutes: FC = () => {
   const {currentUser} = useAuth()
   return (
     <BrowserRouter basename={PUBLIC_URL}>
       <Routes>
         <Route element={<App />}>
           <Route path='error/*' element={<ErrorsPage />} />
           <Route path='logout' element={<Logout />} />
           {currentUser ? (
             <>
               <Route path='/*' element={<PrivateRoutes />} />
               <Route path="/" element={<Index />} />
             </>
           ) : (
             <>
               <Route path='auth/*' element={<AuthPage />} />
               <Route path='/' element={<Index />} />
             </>
           )}
         </Route>
       </Routes>
     </BrowserRouter>
   )
 }
 
 export {EmpRoutes}
 
