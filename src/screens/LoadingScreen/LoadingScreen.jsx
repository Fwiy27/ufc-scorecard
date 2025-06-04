import Spinner from "../../components/LoadingSpinner/Spinner";

import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <Spinner />
    </div>
  );
};

export default LoadingScreen;
