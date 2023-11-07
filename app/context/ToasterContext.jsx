

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ToasterContext;
