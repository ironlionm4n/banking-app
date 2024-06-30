"use client";
import CountUp from "react-countup";

const AnimatedCountUp = ({ balance }: { balance: number }) => {
  return (
    <div className="w-full">
      <CountUp
        end={balance}
        duration={2}
        separator=","
        prefix="$"
        decimals={2}
      />
    </div>
  );
};

export default AnimatedCountUp;
