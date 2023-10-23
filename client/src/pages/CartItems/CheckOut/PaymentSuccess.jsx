import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./success.css";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/UserContext";

const PaymentSuccess = () => {
  const [recycleConfetti, setRecycleConfetti] = useState(true);
  const { setCartItemCount } = useAuthContext();

  useEffect(() => {
    setRecycleConfetti(true);
    setCartItemCount(0);
    const timer = setTimeout(() => {
      setRecycleConfetti(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={150}
        recycle={recycleConfetti}
      />
      <div className="successWrapper">
        <div className="mainSuccessMsg">Payment Successful</div>
        <div className="SecondSuccessMsg">Your Order Will arrive soon.</div>
        <div className="thirdSuccessMsg">Thanks For the Purchase.</div>
        <div className="logo">
          <RiVerifiedBadgeFill />
        </div>
        <Link to={"/"} className="directME">
          Back To HomePage
        </Link>
      </div>
    </div>
  );
};
export default PaymentSuccess;
