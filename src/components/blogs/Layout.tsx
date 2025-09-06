import Head from 'next/head'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import type { LayoutProps } from './types'

export default function Layout ({ children, title, description }: LayoutProps) {
  const pageTitle = title ? `${title} | YourSite` : 'YourSite'
  const pageDescription = description || 'YourSite default description'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppBar position="fixed" color="primary" enableColorOnDark>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            YourSite
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box component="main" sx={{ flexGrow: 1, py: 4, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Container sx={{ flexGrow: 1 }}>
          {children}
        </Container>
      </Box>
    </>
  )
}


