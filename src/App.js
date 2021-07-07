import ListToday from "./components/Overview/ListToday";
import ListMedia from "./components/SocialMedia/ListMedia";
import "./App.css";
import { Stack} from "@chakra-ui/react";
function App() {
  return (
    <Stack spacing={5}>
      <Stack align="center">
      <ListMedia />
      <ListToday />
      </Stack>
    </Stack>
  );
}

export default App;
