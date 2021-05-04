export default function Post(data) {

    const post = data.post;
    console.log(post)
    return (
        <div>
            <h1>{post.noticias.titulo}</h1>
            <h3>{post.noticias.corpo}</h3>
        </div>
    )

}

export async function getStaticProps(context) {

    const res = await fetch('http://localhost:8888/wordpress_site/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
                query MyQuery {
                    noticiaBy(slug: "${context.params.slug}") {
                        slug
                        noticias {
                            corpo
                            titulo
                        }
                    }
                }
            `,
        })
    })

    const json = await res.json()

    return {
        props: {
            post: json.data.noticiaBy,
        },
    }

}

export async function getStaticPaths() {

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
        `})
    })

    const json = await res.json()
    const posts = json.data.noticias.nodes;

    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }))

    return { paths, fallback: false }

}
