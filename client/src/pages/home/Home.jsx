import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center py-24">
      <h1 className="text-white text-center font-bold text-5xl">
        Let&apos;s start banking with PH PayGo
      </h1>

      {user ? (
        <div className="flex items-center justify-center gap-6 mt-10">
          <Link
            to="send-money"
            className="w-[150px] text-center bg-gradient-to-bl from-violet-500 to-fuchsia-500 rounded-3xl px-6 py-2 text-white font-medium transition duration-300 hover:opacity-80"
          >
            Send Money
          </Link>

          <Link
            to="cash-out"
            className="w-[150px] text-center bg-gradient-to-bl from-violet-500 to-fuchsia-500 rounded-3xl px-6 py-2 text-white font-medium transition duration-300 hover:opacity-80"
          >
            Cash Out
          </Link>
        </div>
      ) : (
        <Link
          to="register"
          className="flex items-center justify-center w-[150px] bg-gradient-to-bl from-violet-500 to-fuchsia-500 rounded-3xl px-6 py-2 text-white font-medium mt-10 transition duration-300 hover:opacity-80"
        >
          Join Us
        </Link>
      )}
    </div>
  );
};

export default Home;
