

import Logo from './components/Logo';
import Navigation from './components/Navigation';
import Header from './components/Header';
import IntroTextArea from './components/IntroTextArea';
import Box from './components/Box';
import Footer from './components/Footer';

const HomePage = () => {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <Logo />
        <Navigation />
      </div>
      <Header />
      <IntroTextArea />
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px 0' }}>
        <Box boxNumber={1} />
        <Box boxNumber={2} />
        <Box boxNumber={3} />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
