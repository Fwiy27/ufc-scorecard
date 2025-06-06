import Spinner from "../../components/Loading/Spinner";

import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <Spinner />
    </div>
  );
};

export default LoadingScreen;
