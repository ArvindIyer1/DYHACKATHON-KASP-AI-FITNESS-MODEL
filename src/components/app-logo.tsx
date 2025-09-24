import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      className={cn("w-8 h-8", props.className)}
    >
      <title>Synergy Life Logo</title>
      <path d="M17.5 9.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      <path d="M17.5 9.5h-4.5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4.5" />
      <path d="M6.5 9.5h4.5a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H6.5" />
    </svg>
  );
}
