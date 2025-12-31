import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";


function App() {
  return (
  
  <> <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <AppRoutes /></>)
}

export default App;
