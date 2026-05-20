import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Destinations from './components/Destinations.jsx';
import Quiz from './components/Quiz.jsx';
import Reservation from './components/Reservation.jsx';
import Footer from './components/Footer.jsx';
import Chatbot from './components/Chatbot.jsx';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Destinations />
        <Quiz />
        <Reservation />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
