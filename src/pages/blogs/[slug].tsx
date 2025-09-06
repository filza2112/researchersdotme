import Head from 'next/head'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Image from 'next/image'
import Box from '@mui/material/Box'
import { markdownToHtml } from '@/components/blogs/markdownToHtml'
import BlogContent from '@/components/blogs/BlogContent'
import Toc from '@/components/blogs/Toc'
import type { Blog, Block, TocItem } from '@/components/blogs/types'

type BlockWithHtml = Block & { html: string }

type BlogPageProps = {
  blog: Omit<Blog, 'content'> & { content: BlockWithHtml[] }
  tocItems: TocItem[]
}

export default function BlogPage({ blog, tocItems }: BlogPageProps) {
  const ogImage = blog.content.find((b) => b.image)?.image || undefined

  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.excerpt} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:type" content="article" />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || ''}/blogs/${blog.slug}`} />
      </Head>
      
      <Box sx={{ backgroundImage: 'linear-gradient(135deg, rgb(17, 153, 142), rgb(56, 239, 125))', py: { xs: 4, md: 6 } }}>
        <Container>
          <Box sx={{ position: 'relative', minHeight: { xs: 220, md: 'auto' } }}>
            {/* Mobile background image overlay */}
            {blog.image && (
              <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'absolute', inset: 0, zIndex: 0, opacity: 0.2 }}>
                <Image src={blog.image} alt={blog.title} fill style={{ objectFit: 'cover' }} priority />
              </Box>
            )}
            <Grid container spacing={4} alignItems="center" sx={{ color: '#ffffff', position: 'relative', zIndex: 1 }}>
              <Grid item xs={12} md={blog.image ? 7 : 12} sx={{ px: { xs: 2, md: 0 } }}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                  {blog.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  <time dateTime={blog.date}>
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </Typography>
              </Grid>
              {blog.image && (
                <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={600}
                    height={600}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 12 }}
                    priority
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </Container>
      </Box>
      
      <Container sx={{ py: 4 }}>
        <Typography variant="h6" sx={{ mb: 4 }}>
          {blog.excerpt}
        </Typography>
        
        <Grid container spacing={4}>
          {/* TOC on the left */}
          <Grid item xs={12} md={3}>
            <Box sx={{ position: 'sticky', top: '2rem' }}>
              <Toc items={tocItems} />
            </Box>
          </Grid>
          
          {/* Blog content on the right */}
          <Grid item xs={12} md={9}>
            <Box component="article">
              <BlogContent blocks={blog.content} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs: Blog[] = (await import('../../../data/blogs.json')).default as unknown as Blog[]
  return {
    paths: blogs.map((b) => ({ params: { slug: b.slug } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async (context) => {
  const slug = context.params?.slug as string
  const blogs: Blog[] = (await import('../../../data/blogs.json')).default as unknown as Blog[]

  const blog = blogs.find((b) => b.slug === slug)
  if (!blog) {
    return { notFound: true }
  }

  // Generate TOC items from the toc field in content blocks
  const tocItems: TocItem[] = blog.content
    .filter(block => block.toc) // Only blocks with toc field
    .map((block, index) => ({
      id: `section-${index}`,
      title: block.toc!
    }))

  // Convert markdown to HTML and add section IDs
  const contentWithHtml: BlockWithHtml[] = await Promise.all(
    blog.content.map(async (block: Block, index: number) => ({
      ...block,
      id: block.toc ? `section-${blog.content.filter(b => b.toc).indexOf(block)}` : undefined,
      html: await markdownToHtml(block.value || ''),
      alt: block.alt ?? ''
    }))
  )

  return {
    props: {
      blog: { ...blog, content: contentWithHtml },
      tocItems
    }
  }
}


