import {User} from './models';
import {Product} from './models';
import {connectToDb} from './utils';

export const fetchUsers = async (q, page) => {
	// console.log(q);
	const regex = new RegExp(q, 'i');

	const ITEM_PER_PAGE = 2;

	try {
		connectToDb();
		const count = await User.find({username: {$regex: regex}}).countDocuments();
		const users = await User.find({username: {$regex: regex}})
			.limit(ITEM_PER_PAGE)
			.skip(ITEM_PER_PAGE * (page - 1));
		return {count, users};
	} catch (err) {
		console.log(err);
		throw new Error('Failed to fetch users');
	}
};

export const fetchUser = async (id) => {
	// console.log(id);
	try {
		connectToDb();
		const user = await User.findById(id);
		return user;
	} catch (err) {
		console.log(err);
		throw new Error('Failed to fetch user');
	}
};

export const fetchProducts = async (q, page) => {
	// console.log(q);
	const regex = new RegExp(q, 'i');

	const ITEM_PER_PAGE = 2;

	try {
		connectToDb();
		const count = await Product.find({title: {$regex: regex}}).countDocuments();
		const products = await Product.find({title: {$regex: regex}})
			.limit(ITEM_PER_PAGE)
			.skip(ITEM_PER_PAGE * (page - 1));
		return {count, products};
	} catch (err) {
		console.log(err);
		throw new Error('Failed to fetch products');
	}
};

export const fetchProduct = async (id) => {
	try {
		connectToDb();
		const product = await Product.findById(id);
		return product;
	} catch (err) {
		console.log(err);
		throw new Error('Failed to fetch product');
	}
};
