import { createContext, forwardRef, useContext, useId, useMemo } from 'react'
import { ResponsiveContainer, Tooltip } from 'recharts'
import { cn } from '../../lib/utils'

// Minimal, non-TS port of shadcn's chart primitives — just enough to drive
// recharts charts with a themed CSS-variable palette per data series.
const ChartContext = createContext(null)

function useChart() {
  const ctx = useContext(ChartContext)
  if (!ctx) throw new Error('useChart must be used within a <ChartContainer />')
  return ctx
}

export const ChartContainer = forwardRef(function ChartContainer(
  { id, className, children, config, ...props },
  ref
) {
  const uniqueId = useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  const colorConfig = useMemo(
    () => Object.entries(config || {}).filter(([, c]) => c.color),
    [config]
  )

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn('flex aspect-video justify-center text-xs', className)}
        {...props}
      >
        {colorConfig.length > 0 && (
          <style
            dangerouslySetInnerHTML={{
              __html: `[data-chart=${chartId}] { ${colorConfig
                .map(([key, c]) => `--color-${key}: ${c.color};`)
                .join(' ')} }`,
            }}
          />
        )}
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})

export const ChartTooltip = Tooltip

export const ChartTooltipContent = forwardRef(function ChartTooltipContent(
  { active, payload, className, label, indicator = 'dot', hideLabel = false },
  ref
) {
  const { config } = useChart()
  if (!active || !payload?.length) return null

  return (
    <div
      ref={ref}
      className={cn(
        'grid min-w-[8rem] gap-1.5 rounded-lg border border-white/10 bg-ink-900 px-2.5 py-1.5 text-xs shadow-xl',
        className
      )}
    >
      {!hideLabel && label != null && <div className="font-medium text-white">{label}</div>}
      <div className="grid gap-1.5">
        {payload.map((item) => {
          const key = item.dataKey || item.name
          const itemConfig = config?.[key]
          return (
            <div key={key} className="flex items-center gap-2">
              {indicator === 'dot' && (
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                  style={{ backgroundColor: item.color }}
                />
              )}
              <span className="text-white/60">{itemConfig?.label || key}</span>
              <span className="ml-auto font-mono font-medium text-white">
                {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
})
