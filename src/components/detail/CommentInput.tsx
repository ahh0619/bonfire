import * as React from 'react';

import { cn } from '@/lib/utils';

const CommentInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full rounded-xl border border-input bg-transparent my-4 px-3 py-7 leading-6 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-2xl file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
CommentInput.displayName = 'Input';

export { CommentInput };
