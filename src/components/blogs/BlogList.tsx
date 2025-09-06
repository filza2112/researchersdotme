import Grid from '@mui/material/Grid'
import type { Blog, BlogListProps } from './types'
import BlogCard from './BlogCard'

export default function BlogList ({ blogs }: BlogListProps) {
  return (
    <Grid container spacing={3}>
      {blogs.map((blog) => (
        <Grid item key={blog.slug} xs={12} sm={6} md={4}>
          <BlogCard
          
            title={blog.title}
            excerpt={blog.excerpt}
            date={blog.date}
            slug={blog.slug}
          />
        </Grid>
      ))}
    </Grid>
  )
}


