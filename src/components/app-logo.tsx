import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';
import { Flame } from 'lucide-react';

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-primary/20 p-2',
        props.className
      )}
    >
      <Flame className="text-primary" />
    </div>
  );
}
