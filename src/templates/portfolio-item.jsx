import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import SiteMetadata from "../components/SiteMetadata"
import Button from "../components/Button"
import Cards from "../components/Cards"
import Carousel from "../components/Carousel"
import Newsletter from "../components/Newsletter"
import Layout from "../layouts/Layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

export default props => {
  const {
    childContentfulPortfolioDescriptionRichTextNode,
    gallery,
    name,
    related,
    summary,
    thumbnail,
    url,
  } = props.data.item

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { title, file } = node.data.target.fields
        // console.log(title['en-US'], file['en-US'].url)
        return (
          <img className="py-8" src={file["en-US"].url} alt={title["en-US"]} />
        )
        // return <CustomComponent title={title} description={description} />
      },
      [BLOCKS.UL_LIST]: (node, children) => {
        //console.log(node)
        return <ul className="list-disc list-outside pl-4">{children}</ul>
      },
    },
  }
  return (
    <Layout>
      <SiteMetadata
        title={name}
        description={summary}
        image={thumbnail.localFile.publicURL}
      />
      <div className="bg-gray-0 py-12 lg:py-16">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-3/3 pb-8">
              {gallery && gallery.length === 1 && (
                <Img
                  fluid={gallery[0].localFile.childImageSharp.fluid}
                  alt={name}
                />
              )}
              {gallery && gallery.length > 1 && <Carousel images={gallery} />}
            </div>
            <div className="w-full lg:w-3/3 dark:bg-gray-500">
              <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-1">
                {name}
              </h1>
              <h2 className="text-xl leading-tight font-semibold tracking-tight text-primary dark:text-white sm:text-2xl">
                {summary}
              </h2>

              {childContentfulPortfolioDescriptionRichTextNode && (
                <div className="my-4 text-base text-gray-700 dark:text-white whitespace-pre-line">
                  {documentToReactComponents(
                    childContentfulPortfolioDescriptionRichTextNode.json,
                    options
                  )}
                </div>
              )}

              {url && (
                <div className="mt-8">
                  <Button href={url}>More info</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {related && (
        <div className="bg-gray-100 dark:bg-dm-500 py-12 lg:py-16">
          <div className="container">
            <h2 className="text-3xl sm:text-4xl leading-tight font-extrabold tracking-tight text-gray-900 dark:text-white mb-8">
              You may also like
            </h2>
          </div>
          <Cards items={related} hideLastItemOnMobile={true} />
        </div>
      )}
      <Newsletter />
    </Layout>
  )
}

export const query = graphql`
  query PortfolioItemQUery($slug: String!) {
    item: contentfulPortfolio(slug: { eq: $slug }) {
      childContentfulPortfolioDescriptionRichTextNode {
        json
      }
      gallery {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 960, quality: 85) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        title
      }
      name
      related {
        ...PortfolioCard
      }
      summary
      thumbnail {
        localFile {
          publicURL
        }
      }
      url
    }
  }
`
