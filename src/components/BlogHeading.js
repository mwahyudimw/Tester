import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage';

import '../components/all.sass';


class BlogHeading extends React.Component {
	render() {
		const { data } = this.props;
		const { edges: posts } = data.allMarkdownRemark;

		return (
			<div className="columns">
				<div className="column is-7">
					<div class="card">
						<div class="card-image">
							<figure class="image is-4by3">
								<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
							</figure>
						</div>
						<div class="card-content">
							<div class="media">
								<div className="media-content">
								<div class="content">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.{' '}
								<a>@bulmaio</a>.
								<a href="#">#css</a> <a href="#">#responsive</a>
								<br />
								<time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
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
							</div>

							
						</div>
					</div>
				</div>
				<div className="colums">
					{posts &&
						posts.map(({ node: post }) => (
							<div className="column is-12" key={post.id}>
								<article className="media articleBlog">
									<figure className="media-left">
										{post.frontmatter.featuredimage ? (
											<div className="featured-thumbnail">
												<PreviewCompatibleImage
													imageInfo={{
														image: post.frontmatter.featuredimage,
														alt: `featured image thumbnail for post ${post.frontmatter
															.title}`
													}}
												/>
											</div>
										) : null}
									</figure>
									<div className="media-content">
										<div className="content">
											<p>
												<Link className="title has-text-dark is-size-5" to={post.fields.slug}>
													{post.frontmatter.title}
												</Link>
												<p>{post.frontmatter.description}</p>
												<p>{post.frontmatter.date}</p>
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
						))}
				</div>
			</div>
		);
	}
}

BlogHeading.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array
		})
	})
};

export default () => (
	<StaticQuery
		query={graphql`
			query BlogHeadingQuery {
				allMarkdownRemark(
					sort: { order: DESC, fields: [frontmatter___date] }
					filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
				) {
					edges {
						node {
							excerpt(pruneLength: 400)
							id
							fields {
								slug
							}
							frontmatter {
								title
								templateKey
								date(formatString: "MMMM DD, YYYY")
								description
								featuredpost
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
		`}
		render={(data, count) => <BlogHeading data={data} count={count} />}
	/>
);
