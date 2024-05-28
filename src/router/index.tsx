import { createBrowserRouter } from "react-router-dom";
import Home from '@/pages/Home'
import Detail from '@/pages/Details'

const router = createBrowserRouter([
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'/detail',
        element:<Detail/>
    }
])

export default router