import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { HomePage } from "./component";

function App() {
  return (
    <ChakraProvider>
      <HomePage />
    </ChakraProvider>
  );
}

export default App;
