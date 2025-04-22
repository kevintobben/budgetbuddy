import React from "react"

interface PageHeaderProps {
  title?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <h1 className="text-2xl font-bold mb-6">
      Overzicht {title}
    </h1>
  )
}

export default PageHeader
