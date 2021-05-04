import Link from 'next/link'

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <h1>Olá, mundo!</h1>
      <ul key={posts.nodes[0].noticias.titulo}>
        <Link href={`/posts/${posts.nodes[0].slug}`}>
          <li>{posts.nodes[0].noticias.titulo}</li>
        </Link>
      </ul>
    </div>
  )
}

export async function getStaticProps() {

  const res = await fetch('http://localhost:8888/wordpress_site/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
      query MyQuery {
        noticias {
          nodes {
            slug
            noticias {
              corpo
              titulo
            }
          }
        }
      }
      `,
    })
  })

  const json = await res.json()

  return {
    props: {
      posts: json.data.noticias
    }
  }
}
