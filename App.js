import MainContainer from "./screens/MainContainer"
import Provider from "./context/Provider"

export default function App() {
  return (
    <Provider>
      <MainContainer />
    </Provider>
  )

}