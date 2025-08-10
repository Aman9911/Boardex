import { AlertCircle } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/20">
            <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
        </div>        
        <h1 className="text-3xl font-bold tracking-tight">
          Something went wrong
        </h1>        
        <p className="text-muted-foreground">
          We couldn’t process your request. Please try again later.
        </p>        
      </div>
    </div>
  );
}
