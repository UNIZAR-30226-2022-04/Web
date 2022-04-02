import Layout from '../../components/Layout'

export default function Settings({info}) {
    return(
        <Layout data={info}>
            
        </Layout>
    )
}

export async function getStaticPaths () {
    return {
        paths:[],
        fallback:'blocking'
    }
}

export async function getStaticProps ({params}) {
    const user = params.user
    const info = {
      username: user,
      result: "success", 
      picture: "",
      stars: 3350,
      coins: 1750,
      bestFour: [
        { username: 'Mercu',
          stars: 6575
        },
        {
          username: 'Amiga',
          stars: 4342 
        },
        {
          username: 'Tú',
          stars: 3350
        },
        {
          username: 'Amigo',
          stars: 575
        }
      ]
    }
  
    return {
      props: { info }
    }
  }