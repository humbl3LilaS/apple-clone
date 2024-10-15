import Hero from "./components/Hero";
import HighLights from "./components/HighLights";
import NavBar from "./components/NavBar";

function App() {
	return (
		<div className="bg-black">
			<NavBar />
			<Hero />
			<HighLights />
		</div>
	);
}

export default App;
