import * as React from 'react';
import { cn } from '../../lib/utils.js';
import { Label } from './label.js';

const FieldGroup = React.forwardRef<HTMLFieldSetElement, React.FieldsetHTMLAttributes<HTMLFieldSetElement>>(
  ({ className, ...props }, ref) => (
    <fieldset ref={ref} className={cn('grid gap-6 border-0 p-0 m-0', className)} {...props} />
  )
);
FieldGroup.displayName = 'FieldGroup';

const Field = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('grid gap-2', className)} {...props} />
  )
);
Field.displayName = 'Field';

const FieldLabel = React.forwardRef<React.ElementRef<typeof Label>, React.ComponentPropsWithoutRef<typeof Label>>(
  ({ className, ...props }, ref) => (
    <Label ref={ref} className={cn(className)} {...props} />
  )
);
FieldLabel.displayName = 'FieldLabel';

const FieldDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
);
FieldDescription.displayName = 'FieldDescription';

const FieldSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border', className)} {...props}>
      <span className="relative z-10 bg-background px-2 text-muted-foreground">
        {children}
      </span>
    </div>
  )
);
FieldSeparator.displayName = 'FieldSeparator';

export { FieldGroup, Field, FieldLabel, FieldDescription, FieldSeparator };
