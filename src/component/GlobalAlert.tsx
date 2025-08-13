import Alert from "@mui/material/Alert"
import { useAuth } from "../context/AuthContext"

export default function GlobalAlert(){
  const {showMessage, message } = useAuth()

  if(!showMessage || !message) return

  return(
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50">
      <Alert severity={message?.success ? "success" : "error"}>
        {message?.message}
      </Alert>
    </div>
  )
}