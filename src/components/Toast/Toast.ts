import toast, { Toaster } from "react-hot-toast";

export { Toaster };

export const catToast = {
  success: (message: string) =>
    toast.success(message, {
      style: {
        background: "#1c1917",
        color: "#fafaf9",
        borderRadius: "16px",
        padding: "12px 16px",
        fontSize: "14px",
        fontWeight: "600",
        boxShadow: "0 16px 40px rgba(120,113,108,0.22)",
        border: "1px solid #44403c",
      },
      iconTheme: {
        primary: "#f59e0b",
        secondary: "#1c1917",
      },
      duration: 3000,
    }),

  error: (message: string) =>
    toast.error(message, {
      style: {
        background: "#1c1917",
        color: "#fafaf9",
        borderRadius: "16px",
        padding: "12px 16px",
        fontSize: "14px",
        fontWeight: "600",
        boxShadow: "0 16px 40px rgba(120,113,108,0.22)",
        border: "1px solid #44403c",
      },
      iconTheme: {
        primary: "#ef4444",
        secondary: "#1c1917",
      },
      duration: 4000,
    }),
};
