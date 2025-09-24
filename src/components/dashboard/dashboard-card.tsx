import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string;
  footer: string;
  icon: LucideIcon;
  className?: string;
  children?: React.ReactNode;
}

export function DashboardCard({ title, value, footer, icon: Icon, className, children }: DashboardCardProps) {
  return (
    <Card className={cn("bg-card/80 backdrop-blur-sm border-white/10", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
            <CardDescription>{title}</CardDescription>
            <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {value && <CardTitle className="text-3xl font-bold">{value}</CardTitle>}
        {children}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">{footer}</p>
      </CardFooter>
    </Card>
  );
}
