import { RouterProvider, createRoutesFromElements, Route, createBrowserRouter } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Create from "./pages/Create"
import BlogDetails from "./pages/BlogDetails"


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={ <Layout />} >
          <Route index element={ < Home />} />
          <Route path="/Create" element={ <Create /> } />
          <Route path="/BlogDetails" element={ <BlogDetails /> } />
      </Route>
    </>

    )
  )

  return (
      <RouterProvider router={router} />
  )
}

export default App
