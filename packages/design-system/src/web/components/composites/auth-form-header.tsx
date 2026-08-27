import * as React from 'react';
import { cn } from '../../lib/utils.js';

export interface AuthFormHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
}

export function AuthFormHeader({ title, subtitle, className, ...props }: AuthFormHeaderProps) {
  return (
    <div className={cn('flex flex-col items-center gap-1 text-center', className)} {...props}>
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && (
        <p className="text-sm text-balance text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
