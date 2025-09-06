import { useEffect, useMemo, useState } from 'react'
import type { TocItem, TocProps } from './types'

export default function Toc({ items }: TocProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id || null)
  const [hasScrolled, setHasScrolled] = useState(false)

  const observer = useMemo(() =>
    typeof window !== 'undefined'
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveId(entry.target.id)
              }
            })
          },
          { 
            rootMargin: '-20% 0px -70% 0px', 
            threshold: [0, 0.25, 0.5, 0.75, 1] 
          }
        )
      : null,
    []
  )

  // Handle smooth scrolling when clicking TOC links
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      })
      setActiveId(id)
    }
  }

  // Trigger slide-in animation on first scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !hasScrolled) {
        setHasScrolled(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasScrolled])

  useEffect(() => {
    if (!observer) return
    const elements = items.map((i) => document.getElementById(i.id)).filter(Boolean) as Element[]
    elements.forEach((el) => observer.observe(el))
    return () => elements.forEach((el) => observer.unobserve(el))
  }, [items, observer])

  if (!items.length) return null

  return (
    <nav
      aria-label="Table of contents"
      className={`toc-container ${hasScrolled ? 'toc-slide-in' : ''}`}
    >
      <ul className="toc-list">
        {items.map((item, index) => (
          <li key={item.id} className="toc-list-item">
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`toc-link ${activeId === item.id ? 'toc-link-active' : ''}`}
              style={{ '--animation-delay': `${index * 50}ms` } as React.CSSProperties}
            >
              <span className="toc-indicator"></span>
              <span className="toc-text">{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}


