
import './App.css';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import SignUp from './components/SignUp';
import { Provider } from 'react-redux';
import { store } from './redux/appStore';
import Newproject from './components/Newproject';


function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/home/*",
      element: <Home />,
      children: [
        {
          path: "*",
          element: <Projects />
        },
        {
          path: "auth",
          element: <SignUp />
        },

      ]
    },
    {
      path:"/newProject",
      element:<Newproject/>
    },
    {
      path: "*",
      element: <Navigate to={"/home"} />
    }
  ])

  return (
    <Provider store={store}>
      <div className='w-screen h-screen flex items-start justify-start overflow-hidden'>
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
