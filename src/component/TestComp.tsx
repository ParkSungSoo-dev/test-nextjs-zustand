import useFunctionStore from "@/store/useFunctionStore";

const TestComp = () => {
  const { func, clearFunction } = useFunctionStore();
  const handleInvokeFunctionClick = () => {
    func?.();
  };

  const handleClearFunctionClick = () => {
    clearFunction();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button name="invokeFunction" type="button" style={{ width: "200px" }} onClick={handleInvokeFunctionClick}>
        Function 실행
      </button>
      <button name="clearFunction" type="button" style={{ width: "200px" }} onClick={handleClearFunctionClick}>
        Function Clear
      </button>
    </div>
  );
};

export default TestComp;
