import React from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import { GoCalendar } from "react-icons/go";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Layout from "../components/Layout";

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const postLinks = posts.map((post) => (
      <div className="column" key={post.node.id}>
        <article className="media articleBlog">
          <Link to={post.node.fields.slug}>
            <figure className="media-left">
              {post.node.frontmatter.featuredimage ? (
                <div className="articleImageBlog">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: post.node.frontmatter.featuredimage,
                      alt: `featured image thumbnail for post node.${post.node.frontmatter.title}`,
                    }}
                  />
                </div>
              ) : null}
            </figure>
          </Link>
          <div className="media-content">
            <div className="content">
              <p className="articleTextContent">
                <Link
                  className="title has-text-dark is-size-5"
                  to={post.node.fields.slug}
                >
                  {post.node.frontmatter.title}
                </Link>
                <p>{post.node.frontmatter.description}</p>
                <div style={{ display: "flex" }}>
                  <GoCalendar size={20} />

                  <p style={{ marginLeft: 10 }}>{post.node.frontmatter.date}</p>
                </div>
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-left">
                <a className="level-item">
                  <span className="icon is-small">
                    <i className="fas fa-reply" />
                  </span>
                </a>
                <a className="level-item">
                  <span className="icon is-small">
                    <i className="fas fa-retweet" />
                  </span>
                </a>
                <a className="level-item">
                  <span className="icon is-small">
                    <i className="fas fa-heart" />
                  </span>
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    ));
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with “${tag}”`;

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tag} | ${title}`} />
          <div className="container content">
            <div className="columns">
              <div
                className="column is-10 is-offset-1"
                style={{ marginBottom: "6rem" }}
              >
                <h3 className="title is-size-4 is-bold-light has-text-centered">
                  {tagHeader}
                </h3>
                <ul className="taglist">{postLinks}</ul>
                <p className="has-text-centered">
                  <Link
                    style={{ color: "#000", textDecoration: "underline" }}
                    to="/tags/"
                  >
                    Browse all tags
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            description
            date(formatString: "MMMM DD, YYYY")
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 120, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
