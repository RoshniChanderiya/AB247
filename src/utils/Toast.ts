import toast from "react-hot-toast";

export const success = (message: string) => {
  toast.dismiss();
  toast.success(message, {
    duration: 4000,
    position: "top-center",
  });
};

export const error = (message: string) => {
  toast.dismiss();
  toast.error(message, {
    duration: 4000,
    position: "top-center",
  });
};

export const loading = (message: string) => {
  toast.dismiss();
  toast.loading(message, {
    duration: 4000,
    position: "top-center",
  });
};

const Message = {
  success,
  error,
  loading,
};

export default Message;
