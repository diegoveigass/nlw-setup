import * as Progress from '@radix-ui/react-progress'

interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <Progress.Root
      className="relative h-3 rounded-xl bg-zinc-700 w-full mt-4 overflow-hidden"
      value={progress}
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: 'translateZ(0)',
      }}
    >
      <Progress.Indicator
        className="h-3 rounded-xl bg-violet-600 transition-all"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  )
}
