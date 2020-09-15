import React from 'react';
import IconSearch from '../img/search.svg';

import './support.css';

const SearchBlog = () => {
	return (
		<div>
			<form>
				<input className="inputSearch" type="text" name="search" placeholder="Cari artikel ..." />
			</form>
		</div>
	);
};

export default SearchBlog;
