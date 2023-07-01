import store from './redux/store'
import { Provider } from 'react-redux'
import { RouterProvider, createRoutesFromElements, Route, createBrowserRouter } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Create from "./pages/Create"
import BlogDetails from "./pages/BlogDetails"
import CategoryBlogList from "./pages/CategoryBlogList"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"



function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={ <Layout />} >
          <Route index element={ < Home />} />
          <Route path="/Create" element={ <Create /> } />
          <Route path="/BlogDetails" element={ <BlogDetails /> } />
          <Route path="/CategoryBlogList" element={ <CategoryBlogList /> } />
          <Route path="/SignUp" element={ <SignUp /> } />
          <Route path="/Login" element={ <Login /> } />
      </Route>
    </>

    )
  )

  return (
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  )
}

export default App
