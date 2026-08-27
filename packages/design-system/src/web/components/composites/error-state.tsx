import * as React from 'react';
import { cn } from '../../lib/utils.js';
import { Button } from '../ui/button.js';
import { AlertCircle } from 'lucide-react';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from '../ui/empty.js';

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = 'Something went wrong', 
  message, 
  onRetry,
  className,
  ...props 
}: ErrorStateProps) {
  return (
    <Empty className={cn("border-destructive/20 bg-destructive/5 text-destructive", className)} {...props}>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-destructive/10 text-destructive">
          <AlertCircle className="size-6" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription className="text-destructive/80">{message}</EmptyDescription>
      </EmptyHeader>
      
      {onRetry && (
        <EmptyContent>
          <Button variant="outline" onClick={onRetry} className="mt-2 border-destructive/20 hover:bg-destructive/10">
            Try again
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
