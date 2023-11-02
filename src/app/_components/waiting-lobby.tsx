type WaitingLobbyProps = {
  previousPhase: () => void;
  nextPhase: () => void;
};

const WaitingLobby = ({ previousPhase, nextPhase }: WaitingLobbyProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Phase 0</h1>
      <button
        onClick={nextPhase}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
      >
        Next Phase
      </button>
    </div>
  );
};

export default WaitingLobby;
