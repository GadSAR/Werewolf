type LobbyGameProps = {
  previousPhase: () => void;
  nextPhase: () => void;
};

const LobbyGame = ({ previousPhase, nextPhase }: LobbyGameProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Phase 2</h1>
      <button
        onClick={previousPhase}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
      >
        Previous Phase
      </button>
    </div>
  );
};

export default LobbyGame;
