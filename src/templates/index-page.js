import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import BlogHeadingSingle from "../components/blog/BlogHeadingSingle";
import BlogHeading from "../components/blog/BlogHeading";
import BlogRoll from "../components/blog/BlogRoll";

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => (
  <div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div
            className="columns is-multiline"
            style={{ borderBottom: "1px solid #ccc" }}
          >
            <div className="column is-6">
              <BlogHeadingSingle />
            </div>
            <div className="column is-6">
              <BlogHeading />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns is-multiline">
            <div className="column is-7 is-offset-1">
              <BlogRoll />
            </div>
            <div className="column is-4">
              <div
                className="card"
                style={{
                  position: "-webkit-sticky",
                  position: "sticky",
                  top: "0",
                  paddingTop: "50px",
                }}
              >
                <div className="card-content">
                  <iframe
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpondokprogrammer%2F&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=821647688302529"
                    width="100%"
                    height="300"
                    style={{ border: "none", overflow: "auto" }}
                    scrolling="no"
                    frameborder="0"
                    allowTransparency="true"
                    allow="encrypted-media"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// IndexPageTemplate.propTypes = {
// 	image: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
// 	title: PropTypes.string,
// 	heading: PropTypes.string,
// 	subheading: PropTypes.string,
// 	mainpitch: PropTypes.object,
// 	description: PropTypes.string,
// 	intro: PropTypes.shape({
// 		blurbs: PropTypes.array
// 	})
// };

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
