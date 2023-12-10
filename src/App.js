
import './App.css';
import {  Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import SignUp from './components/SignUp';

function App() {
  const appRouter=createBrowserRouter([
    {
      path:"/home/*",
      element:<Home/>,
      children:[
        {
          path:"*",
          element:<Projects/>
        },
        {
          path:"auth",
          element:<SignUp/>
        },
        
      ]
    },
    {
      path:"*",
      element:<Navigate to={"/home"} />
    }
  ])
  return (
   <div className='w-screen h-screen flex items-start justify-start overflow-hidden'>
      <RouterProvider router={appRouter} />
   </div>
  );
}

export default App;
