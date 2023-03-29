import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import TestComp from "@/component/TestComp";
import useFunctionStore from "@/store/useFunctionStore";
import useScoreStore from "@/store/useScoreStore";

const Home = () => {
  const { score, increaseScore } = useScoreStore();
  const { setFunction } = useFunctionStore();
  const [numberForInDecrement, setNumberForInDecrement] = useState<number>(0);
  const [log, setLog] = useState<string>();

  const handleInDecrementClick = (value: number) => {
    increaseScore(value);
    setNumberForInDecrement(0);
  };

  const handleSetFunctionClick = () => {
    const dateTime = new Date();
    setFunction(() => {
      const logNew = `${dateTime}, score, ${score}`;
      setLog(logNew);
      console.log(dateTime, "score", score);
    });
  };

  return (
    <>
      <Head>
        <title>Test Zustand</title>
        <meta name="description" content="Test Zustand application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>score: {score}</h2>
          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            Number for increment:
            <input
              name="numberForInDecrement"
              type="number"
              value={numberForInDecrement}
              style={{ width: "200px" }}
              onChange={(e) => setNumberForInDecrement(+e.currentTarget.value)}
              onWheel={(e) => e.currentTarget.blur()}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <button
              name="decreaseNumberBtn"
              type="button"
              style={{ width: "200px" }}
              onClick={() => {
                handleInDecrementClick(numberForInDecrement * -1);
              }}>
              감소하기
            </button>
            <button
              name="increaseNumberBtn"
              type="button"
              style={{ width: "200px" }}
              onClick={() => {
                handleInDecrementClick(numberForInDecrement);
              }}>
              증가하기
            </button>
          </div>
          <Link href="/reset">초기화 페이지로 이동</Link>
          <button name="setFunctionButton" type="button" style={{ width: "200px" }} onClick={handleSetFunctionClick}>
            Function 설정
          </button>
          <TestComp />
          {log}
        </div>
      </main>
    </>
  );
};

export default Home;
