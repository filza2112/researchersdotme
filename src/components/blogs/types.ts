export type InboxFlag = 0 | 1;

export type ISODateString = string;

export interface Block {
  value: string; // Markdown string
  inbox?: InboxFlag; // default 0 when missing
  id?: string;
  image?: string | null;
  alt?: string | null;
  toc?: string; // explicit TOC label for this block
}

export interface Blog {
  slug: string;
  title: string;
  date: ISODateString;
  excerpt: string;
  image?: string; // path under /public for hero image
  content: Block[];
}

// Component-specific types
export type TocItem = {
  id: string
  title: string
}

export type TocProps = {
  items: TocItem[]
}

export type BlogCardProps = {
  title: string
  excerpt: string
  date: string
  slug: string
}

export type BlogContentBlock = {
  html: string
  inbox?: InboxFlag
  id?: string
}

export type BlogContentProps = {
  blocks: BlogContentBlock[]
}

export type BlogListProps = {
  blogs: Blog[]
}

export type LayoutProps = {
  children: React.ReactNode
  title?: string
  description?: string
}


