type LobbySettingsProps = {
  previousPhase: () => void;
  nextPhase: () => void;
};

const LobbySettings = ({ previousPhase, nextPhase }: LobbySettingsProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Phase 1</h1>
      <section className="flex flex-row items-center justify-center gap-4">
        <button
          onClick={previousPhase}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        >
          Previous Phase
        </button>
        <button
          onClick={nextPhase}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        >
          Next Phase
        </button>
      </section>
    </div>
  );
};

export default LobbySettings;
