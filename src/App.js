import logo from './logo.svg';
import './App.css';
import CalendarHeader from './components/CalendarHeader/CalendarHeader';
import Sidebar from './components/Sidebar/Sidebar';
import Month from './components/Month/Month';
import { useContext, useEffect, useState } from 'react';
import { getMonth } from './util';
import GlobalContext from './context/GlobalContext';
import EventModal from './components/EventModal';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex, showEventModal } = useContext(GlobalContext)


  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])
  return (
    <>
      {showEventModal && <EventModal />}
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className='flex flex-1'>
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  );
}

export default App;
