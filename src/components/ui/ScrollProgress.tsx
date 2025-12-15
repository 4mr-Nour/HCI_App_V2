import { useEffect, useState } from 'react';

interface ScrollProgressProps {
  onProgressChange?: (progress: number) => void;
}

export function ScrollProgress({ onProgressChange }: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      // Prevent division by zero if windowHeight is 0 (though rare in this context)
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;

      setScrollProgress(Number(scroll));
      if (onProgressChange) {
        onProgressChange(Number(scroll));
      }
    }

    window.addEventListener('scroll', handleScroll);
    // Call once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [onProgressChange]);

  return (
    <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
      <div
        className="h-full bg-[#4A90E2] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );
}
