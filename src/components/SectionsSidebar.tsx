import { UserIcon } from 'lucide-react';

const SECTIONS = ['News Analytics', 'Society Profiling', 'Policy Resonance', 'Communications Resonance'] as const;

const SectionsSidebar = () => {
  return (
    <aside className="min-h-[280px]">
      <div className="border-l border-neutral-800">
        <nav className="px-4 py-1">
          <ul className="space-y-3">
            {SECTIONS.map((section, index) => {
              const isActive = index === 0;

              return (
                <li key={section}>
                  <span
                    className={`block uppercase py-1 text-sm ${
                      isActive ? 'font-medium text-neutral-100' : 'text-neutral-400'
                    }`}
                  >
                    {section}
                  </span>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-10 px-4">
          <div className="text-neutral-400 text-sm">
            <div>Your trial ends in:</div>
            <div>3 days 14h 8m 24s</div>
          </div>

          <button
            type="button"
            className="mt-3 w-full bg-green-500/20 px-3 py-3 text-sm uppercase text-green-500 hover:bg-green-500/30"
          >
            Upgrade now
          </button>
        </div>

        <div className="flex items-center gap-2 px-4 mt-8">
          <div className="rounded-full bg-neutral-800 w-7 h-7 flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-neutral-100" />
          </div>
          <div className="text-sm text-neutral-100">Adam Zurek</div>
        </div>

        <div className="mt-4 border-t border-neutral-800 px-4 pt-2">
          <button type="button" className="text-sm text-neutral-400 hover:text-neutral-200 py-2">
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SectionsSidebar;
