import "./App.css";
import Menu from "./Components/Menu";
import AddMeme from "./Components/AddMeme";
import GetAllMemes from "./Components/GetAllMemes";
import Footer from "./Components/Footer";

const App = () => {
  return (
      <div className="App">
        <Menu />
        <AddMeme />
        <GetAllMemes />
        <Footer />
      </div>
  )
}

export default App