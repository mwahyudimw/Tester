import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import BlogHeading from '../components/BlogHeading';
import BlogRoll from '../components/BlogRoll';

export const IndexPageTemplate = ({ image, title, heading, subheading, mainpitch, description, intro }) => (
	<div>
		<section className="section section--gradient">
			<div className="container">
				<div className="section">
					<div className="columns is-multiline">
						<div className="column is-12"> 
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
							<div class="card">
								<div class="card-content">
									<div class="media">
										<div class="media-left">
											<figure class="image is-48x48">
												<img
													src="https://bulma.io/images/placeholders/96x96.png"
													alt="Placeholder image"
												/>
											</figure>
										</div>
										<div class="media-content">
											<p class="title is-4">John Smith</p>
											<p class="subtitle is-6">@johnsmith</p>
										</div>
									</div>

									<div class="content">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis
										mauris. <a>@bulmaio</a>.
										<a href="#">#css</a> <a href="#">#responsive</a>
										<br />
										<time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
);

IndexPageTemplate.propTypes = {
	image: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
	title: PropTypes.string,
	heading: PropTypes.string,
	subheading: PropTypes.string,
	mainpitch: PropTypes.object,
	description: PropTypes.string,
	intro: PropTypes.shape({
		blurbs: PropTypes.array
	})
};

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
			frontmatter: PropTypes.object
		})
	})
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
