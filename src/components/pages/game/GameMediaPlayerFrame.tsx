export function GameMediaPlayerFrame({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="group relative z-0 overflow-hidden rounded-md bg-black shadow-md shadow-black/50">
      <header className="border-ludus-green-700 absolute top-0 right-0 left-0 z-10 overflow-hidden rounded-t-md border-x-1 border-t-1 transition-all group-hover:pointer-events-none group-hover:opacity-0">
        <div className="bg-black/75 px-4 py-2">
          <h4 className="font-ludus-poppins overflow-clip text-nowrap text-white md:text-xl">{title}</h4>
        </div>
      </header>
      <div className="border-ludus-green-700 relative aspect-video w-full overflow-hidden rounded-md border">
        {children}
      </div>
    </div>
  );
}
