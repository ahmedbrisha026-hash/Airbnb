export function ViewHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="sticky top-0 z-20 -mx-4 mb-5 border-b border-border bg-background/90 px-4 pt-5 pb-4 backdrop-blur-xl">
      <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
      {subtitle && (
        <p className="mt-1 text-sm text-muted-foreground nums-tabular">
          {subtitle}
        </p>
      )}
    </div>
  )
}
