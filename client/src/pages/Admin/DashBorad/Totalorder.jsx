import CountUp from "react-countup";

const Totalorder = ({ totalRevenue, totalPercent, barStyle, percentage }) => {
  const startValue = totalRevenue * 0.9;
  return (
    <div className="totalRevenue">
      <div className="totalNumCont">
        <div className="totalNum">
          <span>Total-Orders</span>
          {/* <span className="NumberTot">{totalRevenue}</span> */}
          <CountUp
            className="NumberTot"
            start={startValue}
            end={totalRevenue}
            duration={2.5}
            separator=","
            prefix="$"
          />
        </div>
        <div className="thisMonth">This Month</div>
      </div>
      <div className="progressBarCont">
        <div className="totalPercent" style={totalPercent}>
          <div className="progress-bar" style={barStyle}></div>
        </div>
        <span>{percentage.toFixed(2)}%</span>
      </div>
    </div>
  );
};
export default Totalorder;
