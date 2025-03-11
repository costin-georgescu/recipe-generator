import Skeleton from './Skeleton';

const LoadingSkeleton = () => {
  return (
    <div className="w-full animate-fade-in space-y-6 transition-all duration-700 ease-in-out">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
