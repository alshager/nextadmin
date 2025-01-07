import Image from 'next/image';
import styles from '@/app/ui/dashboard/products/singleProduct/singleProduct.module.css';
import {fetchProduct} from '@/app/lib/data';
import {updateProduct} from '@/app/lib/action';

const SingleProductPage = async ({params}) => {
	const {id} = params;
	const product = await fetchProduct(id);

	const renderSelectOption = (value, label) => (
		<option value={value}>{label}</option>
	);

	return (
		<div className={styles.container}>
			<div className={styles.infoContainer}>
				<div className={styles.imgContainer}>
					<Image src={product.img || '/noproduct.jpg'} alt='Product Image' fill />
				</div>
				<h2>{product.title}</h2>
			</div>

			<div className={styles.formContainer}>
				<form action={updateProduct} className={styles.form}>
					<input type='hidden' name='id' value={product.id} />

					<div className={styles.inputGroup}>
						<label>Title</label>
						<input type='text' name='title' defaultValue={product.title} />
					</div>

					<div className={styles.inputGroup}>
						<label>Price</label>
						<input type='number' name='price' defaultValue={product.price} />
					</div>

					<div className={styles.inputGroup}>
						<label>Stock</label>
						<input type='number' name='stock' defaultValue={product.stock} />
					</div>

					<div className={styles.inputGroup}>
						<label>Color</label>
						<input type='text' name='color' defaultValue={product.color || 'Color'} />
					</div>

					<div className={styles.inputGroup}>
						<label>Size</label>
						<textarea name='size' defaultValue={product.size || 'Size'} />
					</div>

					<div className={styles.inputGroup}>
						<label>Category</label>
						<select name='cat' id='cat' defaultValue={product.cat}>
							{renderSelectOption('kitchen', 'Kitchen')}
							{renderSelectOption('computers', 'Computers')}
						</select>
					</div>

					<div className={styles.inputGroup}>
						<label>Description</label>
						<textarea name='desc' id='desc' rows='10' defaultValue={product.desc} />
					</div>

					<button type='submit'>Update</button>
				</form>
			</div>
		</div>
	);
};

export default SingleProductPage;
