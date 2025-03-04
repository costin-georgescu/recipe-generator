const Skeleton = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-warmstone-200/30 shadow-sm hover:shadow-md transition-all duration-300 h-full w-full min-h-[400px] min-w-full animate-pulse">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-5 h-5 rounded-full bg-emerald-200"></div>
        <div className="h-5 w-24 bg-emerald-100 rounded"></div>
      </div>
      <div className="mt-4 space-y-3">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 pb-2 border-b border-warmstone-200/30 last:border-b-0 animate-pulse"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="w-5 h-5 flex-shrink-0 rounded-full bg-emerald-200 flex items-center justify-center"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-100 rounded w-full"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Skeleton;
