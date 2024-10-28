import { RoomCard } from "@/components/RoomCard"
import { getAllRooms } from "./actions/getAllRooms"
import { Heading } from "@/components/Heading"

const Home = async () => {
  const rooms = await getAllRooms()
  
  return (
    <>
      <Heading title='Available Rooms' />

      {rooms.length > 0 ? (
        rooms.map(room => (<RoomCard 
          room={room} 
          key={room.$id}
        />))
      ) : (
        <p>No rooms available</p>
      )}
    </>
  )
}

export default Home
