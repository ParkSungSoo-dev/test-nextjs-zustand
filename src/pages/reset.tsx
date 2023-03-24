import useScoreStore from "@/store/useScoreStore";

const ResetPage = () => {
  const { getScore, resetScore } = useScoreStore();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>score: {getScore()}</div>
      <button type="button" style={{ width: "200px" }} onClick={resetScore}>
        초기화
      </button>
    </div>
  );
};

export default ResetPage;
