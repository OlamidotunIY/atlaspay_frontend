import * as React from 'react';

export interface AuthSplitLayoutProps
{
  imageUrl?: string;
  children: React.ReactNode;
}

export function AuthSplitLayout({ imageUrl, children }: AuthSplitLayoutProps)
{
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left side: Branding (Hidden on mobile) */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#">
            <div className="flex items-center gap-2 font-medium text-lg">
              <div className="flex size-6 items-center justify-center rounded-sm overflow-hidden bg-primary">
                <img src="/icon.png" alt="Atlaspay Logo" className="w-full h-full object-cover" />
              </div>
              Atlaspay
            </div>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {children}
          </div>
        </div>
      </div>

      {/* Right side: Form Container */}
      <div className="relative hidden bg-muted lg:block">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt="Authentication Background"
          className="absolute inset-0 h-full w-full object-cover "
        />
      </div>
    </div>
  );
}
