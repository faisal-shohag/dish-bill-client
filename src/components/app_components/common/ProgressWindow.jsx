import PropTypes from 'prop-types';

const ProgressWindow = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-svh">
        <img
          className="h-[100px] w-[100px] animate-ping"
          src="https://i.postimg.cc/dV1YsWV2/image.png"
        />
        <div className="font-bold text-2xl mt-2">Dish Bill Management System</div>
        <div>Please wait...</div>
      </div>
    </div>
  );
};

ProgressWindow.propTypes = {
  progressbar: PropTypes.node,
};

export default ProgressWindow;