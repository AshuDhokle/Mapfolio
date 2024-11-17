import Profiles from './Profiles'
import Map from './Map'
import { CoordinatesProvider } from '../../Context/coordinateContext'

const Home = () => {
  return (
    <div className='flex flex-row items-center'>
      <CoordinatesProvider>
      <Profiles/> 
      <Map/>
      </CoordinatesProvider>
      </div>
  )
}

export default Home