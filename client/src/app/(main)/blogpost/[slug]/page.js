import React from 'react'
import BlogDetails from '@/Components/shared/blogDetails'
import { cards } from '../../../../../data/Data'
 

const page = async ({ params }) => {
    const { slug } = await params
   const arr = cards.filter((el)=> el.id == slug)
  
   const [obj] = arr
    
    return (
        <div>
            <BlogDetails obj={obj} />
        </div>
    )
}

export default page