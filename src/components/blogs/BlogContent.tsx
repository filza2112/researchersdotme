import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Image from 'next/image'
import type { BlogContentBlock, BlogContentProps } from './types'

export default function BlogContent({ blocks }: BlogContentProps) {
  return (
    <div>
      {blocks.map((block, index) => {
        const blockId = block.id || `content-${index}`
        const hasImage = (block as any).image
        
        return (
          <Box key={blockId} id={blockId} sx={{ mb: 3 }}>
            {/* Render content based on inbox flag */}
            {block.inbox === 1 ? (
              <Paper elevation={3} sx={{ p: 3, bgcolor: 'rgba(34, 197, 94, 0.05)', borderLeft: 3, borderColor: '#22c55e', mb: hasImage ? 2 : 0 }}>
                <div 
                  className="prose prose-green"
                  dangerouslySetInnerHTML={{ __html: block.html }} 
                />
              </Paper>
            ) : (
              <div 
                className="prose prose-lg max-w-none"
                style={{ marginBottom: hasImage ? '1rem' : '0' }}
                dangerouslySetInnerHTML={{ __html: block.html }} 
              />
            )}
            
            {/* Render image right after the paragraph if present */}
            {hasImage && (
              <Box sx={{ mt: 1, mb: 2, textAlign: 'center' }}>
                <Image
                  src={(block as any).image}
                  alt={(block as any).alt || ''}
                  width={800}
                  height={400}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px'
                  }}
                />
              </Box>
            )}
          </Box>
        )
      })}
    </div>
  )
}


