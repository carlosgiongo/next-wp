export default function Post( data ){

    const post = data.post;

    return (
        <div>
            <h1>opa</h1>
        </div>
    )

}

export async function getStaticProps(context) {

    const res = await fetch('http://headlesswpnext.local/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query MyQuery {
                noticias {
                  nodes {
                    slug
                    link
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
        props: {
            post: json.data,
        },
    }

}

export async function getStaticPaths() {

    const res = await fetch('http://headlesswpnext.local/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query MyQuery {
                noticias {
                  nodes {
                    slug
                    link
                    uri
                    noticias {
                      corpoNoticia
                      tituloNoticia
                    }
                  }
                }
              }
        `})
    })

    const json = await res.json()
    const posts = json.data.noticias.nodes;

    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }))

    return { paths, fallback: false }

}