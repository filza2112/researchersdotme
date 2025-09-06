import Link from 'next/link'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import type { BlogCardProps } from './types'

function formatDateUTC (iso: string): string {
  const date = new Date(iso)
  const dd = String(date.getUTCDate()).padStart(2, '0')
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0')
  const yyyy = date.getUTCFullYear()
  return `${dd}/${mm}/${yyyy}`
}

export default function BlogCard ({ title, excerpt, date, slug }: BlogCardProps) {
  return (
    <Link href={`/blogs/${slug}`} style={{ textDecoration: 'none' }}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {excerpt}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              <time dateTime={date}>{formatDateUTC(date)}</time>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}


