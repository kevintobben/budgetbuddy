import React from "react"
import PageHeader from "./PageHeader"

interface PageLayoutProps {
  title: string
  children: React.ReactNode
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <div className="p-8 max-w-screen-xl mx-auto space-y-6">
      <PageHeader title={title} />
      <div>{children}</div>
    </div>
  )
}

export default PageLayout
