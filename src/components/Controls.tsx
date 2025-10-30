import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
} from "lucide-react";

interface ControlsProps {
  totalSteps: number;
  currentStepIndex: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onStepChange: (val: number) => void;
}

export const Controls = ({
  totalSteps,
  currentStepIndex,
  isPlaying,
  onPlayPause,
  onStepChange,
}: ControlsProps) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-surface border-t border-slate-700 p-6 pb-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        {/* Slider */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-gray-400">START</span>
          <input
            type="range"
            min="0"
            max={totalSteps > 0 ? totalSteps - 1 : 0}
            value={currentStepIndex}
            onChange={(e) => onStepChange(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-blue-400"
          />
          <span className="text-xs font-mono text-gray-400">END</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-center items-center gap-6">
          <button
            onClick={() => onStepChange(0)}
            className="p-2 hover:bg-white/10 rounded-full transition"
          >
            <SkipBack size={20} />
          </button>
          <button
            onClick={() => onStepChange(Math.max(0, currentStepIndex - 1))}
            className="p-2 hover:bg-white/10 rounded-full transition"
          >
            <Rewind size={24} />
          </button>

          <button
            onClick={onPlayPause}
            className="p-4 bg-primary hover:bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/20 transition transform hover:scale-105"
          >
            {isPlaying ? (
              <Pause fill="currentColor" />
            ) : (
              <Play fill="currentColor" />
            )}
          </button>

          <button
            onClick={() =>
              onStepChange(Math.min(totalSteps - 1, currentStepIndex + 1))
            }
            className="p-2 hover:bg-white/10 rounded-full transition"
          >
            <FastForward size={24} />
          </button>
          <button
            onClick={() => onStepChange(totalSteps - 1)}
            className="p-2 hover:bg-white/10 rounded-full transition"
          >
            <SkipForward size={20} />
          </button>
        </div>

        <div className="text-center font-mono text-sm text-gray-400">
          Step:{" "}
          <span className="text-white font-bold">{currentStepIndex + 1}</span> /{" "}
          {totalSteps}
        </div>
      </div>
    </div>
  );
};
