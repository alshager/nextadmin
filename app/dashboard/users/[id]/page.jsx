import Image from 'next/image';
import styles from '../../../ui/dashboard/users/singleUser/singleUser.module.css';
import {fetchUser} from '@/app/lib/data';
import {updateUser} from '@/app/lib/action';

const SingleUserPage = async ({params}) => {
	const {id} = params;
	const user = await fetchUser(id);

	const renderSelectOption = (value, condition) => (
		<option value={value} selected={condition}>
			{value ? 'Yes' : 'No'}
		</option>
	);

	return (
		<div className={styles.container}>
			<div className={styles.infoContainer}>
				<div className={styles.imgContainer}>
					<Image src={user.img || '/noavatar.png'} alt='User Image' fill />
				</div>
				<p>{user.username}</p>
			</div>

			<div className={styles.formContainer}>
				<form action={updateUser} className={styles.form}>
					<input type='hidden' name='id' value={user.id} />

					<div className={styles.inputGroup}>
						<label>Username</label>
						<input type='text' name='username' defaultValue={user.username} />
					</div>

					<div className={styles.inputGroup}>
						<label>Email</label>
						<input type='email' name='email' defaultValue={user.email} />
					</div>

					<div className={styles.inputGroup}>
						<label>Password</label>
						<input type='password' name='password' />
					</div>

					<div className={styles.inputGroup}>
						<label>Phone</label>
						<input type='text' name='phone' defaultValue={user.phone} />
					</div>

					<div className={styles.inputGroup}>
						<label>Address</label>
						<textarea name='address' defaultValue={user.address} />
					</div>

					<div className={styles.inputGroup}>
						<label>Is Admin?</label>
						<select name='isAdmin' id='isAdmin'>
							{renderSelectOption(true, user.isAdmin)}
							{renderSelectOption(false, !user.isAdmin)}
						</select>
					</div>

					<div className={styles.inputGroup}>
						<label>Is Active?</label>
						<select name='isActive' id='isActive'>
							{renderSelectOption(true, user.isActive)}
							{renderSelectOption(false, !user.isActive)}
						</select>
					</div>

					<button type='submit'>Update</button>
				</form>
			</div>
		</div>
	);
};

export default SingleUserPage;
