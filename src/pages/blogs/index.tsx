import Head from 'next/head'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import BlogList from '@/components/blogs/BlogList'
import type { Blog } from '@/components/blogs/types'

type BlogsPageProps = {
  blogs: Blog[]
}

export default function BlogsPage ({ blogs }: BlogsPageProps) {
  return (
    <>
      <Head>
        <title>Blogs</title>
        <meta name="description" content="Latest articles and updates." />
      </Head>
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Blogs
        </Typography>
        <BlogList blogs={blogs} />
      </Container>
    </>
  )
}

export async function getStaticProps () {
  // Import JSON at build time
  const blogs: Blog[] = (await import('../../../data/blogs.json')).default as unknown as Blog[]

  return {
    props: {
      blogs
    }
  }
}


