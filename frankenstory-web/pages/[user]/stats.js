import Header from '../../components/Head'
import FriendStats from '../../components/Stats'

const people = [
    { name: 'Mercu',
      stars: 6575
    },
    {
      name: 'Amiga',
      stars: 4342 
    },
    {
      name: 'Tú',
      stars: 3350
    },
    {
      name: 'Amigo',
      stars: 575
    }
]

const info = {
  stars: 3350,
  coins: 1750,
  name: 'Mr. Patinete'
}

export default function Stats() {
  return (
    <>
      <Header data={info}/>
      <div class='background'>
        <FriendStats data={people}/>
      </div>
    </>
  )
}
