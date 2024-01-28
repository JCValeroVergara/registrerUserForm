import { Routes, Route } from 'react-router-dom';

import backgroundImage from './assets/bg.jpg';
import RegistrerBasicInfo from './components/FormSteep_01';
import RegistrerLocationInfo from './components/FormSteep_02';
import RegistrerFamilyInfo from './components/FormSteep_03';


function App() {
  return (
    <div
      className="flex flex-col w-full h-screen justify-between overflow-y-auto dark:bg-slate-600"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="flex flex-col w-full h-screen justify-between overflow-y-auto bg-white dark:bg-gray-800">
        <article className="flex flex-col w-full items-center justify-center dark:text-white">
          <Routes>
            <Route path="/" element={<RegistrerBasicInfo />} />
            <Route path="/steep_02" element={<RegistrerLocationInfo />} />
            <Route path="/steep_03" element={<RegistrerFamilyInfo />} />
          </Routes>
        </article>
      </div>
    </div>
  );
}

export default App;
