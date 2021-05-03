import Head from 'next/head'
import Image from 'next/image'

export default function Home({posts}) {
  console.log({posts});
  return (
    <div>
    <h1>Olá, mundo!</h1>
    {
      posts.nodes.map(post => {
        return(
          <ul key={post.uri}>
            <li>{post.noticias.tituloNoticia}</li>
          </ul>
        )  
      })
    }
    </div>
  )
}

export async function getStaticProps(){

  const res = await fetch('http://localhost/wordpress-site/graphql', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query: `
      query MyQuery {
        noticias {
          nodes {
            uri
            noticias {
              corpoNoticia
              tituloNoticia
            }
          }
        }
      }
      `,
    })  
  })

  const json = await res.json()

  return {
    props:{
      posts: json.data.noticias,
    }
  }
}
