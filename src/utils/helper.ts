import toast from "react-hot-toast";

export const makeSuccessToast = (text: string) => {
  toast.success(text, {
    style: {
      borderRadius: "4px",
      background: "#333",
      color: "#fff",
    },
  });
};


export const makeWrongToast = (text: string) => {
  toast.success(text, {
    style: {
      borderRadius: "4px",
      background: "#da3434",
      color: "#fff",
    },
  });
};
