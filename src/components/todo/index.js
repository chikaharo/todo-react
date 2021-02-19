import React, { useEffect, useState } from 'react';
import TodoItem from './todoItem/index';
import TimeDuration from '../../utils/TimeDuration';
import './index.css';
import { Button, FormGroup, makeStyles } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { loadPageCreate, loadTodos, startAddTodo } from '../../store/actions/todo';
import { covertTimeToSecond } from '../../utils/coverTime';
import { db } from '../../firebase';

const schema = yup.object().shape({
	title: yup.string().required(),
	days: yup.number().integer().min(0),
	hours: yup.number().integer().max(23).min(0),
	minutes: yup.number().integer().max(60).min(0),
	seconds: yup.number().integer().max(60).min(0),
});

const Index = ({
	auth: { user },
	todo: { isSuccess, todos },
	onAddTodo,
	onLoadPage,
	onLoadTodo,
}) => {
	const { register, handleSubmit, watch, errors, control } = useForm({
		resolver: yupResolver(schema),
	});
	const [search, setSearch] = useState('');
	const [openModal, setOpenModal] = useState(false);

	const filteredTodos = todos.filter(t => {
		return t.title.toLowerCase().includes(search.toLowerCase());
	});

	const onSearch = e => {
		console.log(e.target.value);
		setSearch(e.target.value);
	};

	const handleOpenModal = () => {
		onLoadPage();
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const onSubmit = async data => {
		const duration = covertTimeToSecond(data.days, data.hours, data.minutes, data.seconds);
		await onAddTodo(data.title, duration, user.uid);
	};

	useEffect(() => {
		if (user?.uid) {
			onLoadTodo();
		}
	}, [user]);

	useEffect(() => {
		console.log('isFinished', isSuccess);
		if (isSuccess === true) {
			handleCloseModal();
		}
	}, [onSubmit]);

	return (
		<div className='todo'>
			<div className='todo__header'>
				<h1>My Todo List</h1>
			</div>
			<div className='todo__container'>
				{!openModal ? (
					<>
						<div className='todo__searchBar'>
							<input
								type='text'
								placeholder='Search a task name'
								onChange={onSearch}
							/>
						</div>
						<div className='todo__list'>
							{todos &&
								filteredTodos.map(todo => (
									<TodoItem
										key={todo.id}
										title={todo.title}
										duration={todo.duration}
										remaining={todo.remaining}
										dId={todo.dId}
									/>
								))}
						</div>
						<div className='todo__buttonCont'>
							<Button color='primary' variant='contained' onClick={handleOpenModal}>
								Add Todo
							</Button>
						</div>
					</>
				) : (
					<form onSubmit={handleSubmit(onSubmit)} className='todoCreate__form'>
						<>
							<dl className='formRow'>
								<dt>
									<label>Title</label>
								</dt>
								<dd>
									<Controller
										name='title'
										control={control}
										defaultValue=''
										// className='materialUIInput'
										render={props => (
											<Input
												className='materialUIInput'
												placeholder='Enter your todo title'
												onChange={props.onChange}
												value={props.value}
											/>
										)}
									/>
								</dd>
							</dl>
							<dl className='formRow'>
								<dt>
									<label>Time Duration</label>
								</dt>
								<dd>
									<div className='formSmall__container'>
										<div className='formSmall'>
											<label>Days</label>
											<input
												type='number'
												name='days'
												ref={register}
												defaultValue={0}
											/>
										</div>
										<div className='formSmall'>
											<label>Hours</label>
											<input
												type='number'
												name='hours'
												ref={register}
												defaultValue={0}
											/>
										</div>
										<div className='formSmall'>
											<label>Minutes</label>
											<input
												type='number'
												name='minutes'
												ref={register}
												defaultValue={0}
											/>
										</div>
										<div className='formSmall'>
											<label>Seconds</label>
											<input
												type='number'
												name='seconds'
												ref={register}
												defaultValue={0}
											/>
										</div>
									</div>
								</dd>
							</dl>
							<div className='errorMessage'>
								<p>
									{errors.title?.message ||
										errors.days?.message ||
										errors.hours?.message ||
										errors.minutes?.message ||
										errors.seconds?.message}
								</p>
							</div>
						</>
						<div className='formButton__container'>
							<Button variant='contained' color='primary' type='submit'>
								Save
							</Button>
							<Button
								variant='contained'
								color='secondary'
								onClick={handleCloseModal}
							>
								Cancel
							</Button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	todo: state.todo,
	auth: state.auth,
});

const mapDispatchToProps = dispatch => {
	return {
		onAddTodo: (title, duration, createdBy) =>
			dispatch(startAddTodo(title, duration, createdBy)),
		onLoadPage: () => dispatch(loadPageCreate()),
		onLoadTodo: () => dispatch(loadTodos()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
