export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 bg-gradient-to-br from-primary via-secondary to-accent rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">F</span>
      </div>
      <span className="font-bold text-lg">Fluenzzy</span>
    </div>
  );
};
