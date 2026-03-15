import { Spinner } from "@/components/ui/spinner";

const LoadingScreen = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex items-center gap-4">
          <Spinner className="size-8" />
          <span className="text-lg font-medium">Loading ...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
