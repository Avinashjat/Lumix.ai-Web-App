import {Route , Routes } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import BlogTitle from "./pages/BlogTitle"
import Community from "./pages/Community"
import DashBoard from "./pages/DashBoard"
import GenerateImage from "./pages/GenerateImage"
import RemoveObject from "./pages/RemoveObject"
import RemoveBackGroud from "./pages/RemoveBackGroud"
import ReviewResume from "./pages/ReviewResume"
import WriteArtical from "./pages/WriteArtical"
import SmoothScroll from "./components/SmoothScoll"
import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"


function App() {

  const {getToken}  = useAuth();

  useEffect(()=>{
       getToken().then((token)=>{
         console.log(token)
       });
  },[]);

return (
    <>

    <SmoothScroll />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Parent Route */}
        <Route path="/ai" element={<Layout />}>
          {/* Default child route (when visiting /ai) */}
          <Route index element={<DashBoard />} />

          {/* Nested child routes (relative paths) */}
          <Route path="blog-titles" element={<BlogTitle />} />
          <Route path="community" element={<Community />} />
          <Route path="generate-images" element={<GenerateImage />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="remove-background" element={<RemoveBackGroud />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="write-article" element={<WriteArtical />} />
        </Route>
      </Routes>     
    </>
  )
}

export default App
