import React, { useEffect, useState } from 'react';
import { Pause, PlayArrow, Edit, Delete, CheckBoxOutlineBlank, Save } from '@material-ui/icons';
import './index.css';
import { covertMsToTime, covertTimeToSecond } from '../../../utils/coverTime';
import { IconButton, Input } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { db } from '../../../firebase';
import { deleteTodo, editTodo } from '../../../store/actions/todo';
import { connect } from 'react-redux';

const schema = yup.object().shape({
	title: yup.string().required(),
	days: yup.number().integer().min(0),
	hours: yup.number().integer().max(23).min(0),
	minutes: yup.number().integer().max(60).min(0),
	seconds: yup.number().integer().max(60).min(0),
});

const Index = ({
	dId,
	title,
	duration,
	remaining,
	todo: { isSuccess },
	onEditTodo,
	onDeleteTodo,
}) => {
	const { register, handleSubmit, errors, control } = useForm({
		resolver: yupResolver(schema),
	});
	const [time, setTime] = useState(remaining ? remaining : 0);
	const [timePercent, setTimePercent] = useState(
		remaining ? 100 - (remaining / duration) * 100 : 0
	);
	const [isDoing, setIsDoing] = useState(false);
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		// if (time === 0) {
		// 	setIsDoing(false);
		// 	return;
		// }

		let tick;
		console.log(time);
		if (isDoing) {
			tick = setInterval(() => {
				if (time === 0) {
					setIsDoing(false);
					return function cleanup() {
						clearInterval(tick);
					};
				}
				setTime(prevState => prevState - 1000);
				setTimePercent(prevState => (prevState += (1000 / duration) * 100));
			}, 1000);
		}

		return function cleanup() {
			clearInterval(tick);
		};
	}, [setTime, isDoing]);

	// useEffect(() => {
	// 	let tick;
	// 	if (isDoing) {
	// 		tick = setInterval(() => {
	// 			console.log(timePercent);
	// 		}, 1000);
	// 	}

	// 	return function cleanup() {
	// 		clearInterval(tick);
	// 	};
	// });

	useEffect(() => {
		if (isSuccess) {
			setEditing(false);
		}
	}, [isSuccess]);

	const startDoing = () => {
		setIsDoing(true);
	};

	const pauseDoing = () => {
		setIsDoing(false);
		onEditTodo({ dId, updatedFields: { remaining: time } });
	};

	const saveSubmit = async data => {
		console.log('SAVE DATA', data);
		const remaining = covertTimeToSecond(data.days, data.hours, data.minutes, data.seconds);
		const updatedFields = { title: data.title, remaining };
		onEditTodo({ dId, updatedFields });
	};

	return (
		<div
			className='todoItem'
			style={{
				background: `linear-gradient(to right, rgb(253, 120, 255) ${timePercent}%,#fff ${timePercent}%)`,
			}}
		>
			<div className='todoItem--left'>
				{!editing ? (
					<>
						<CheckBoxOutlineBlank />
						<p>{title}</p>
					</>
				) : (
					<Controller
						name='title'
						control={control}
						defaultValue={title}
						render={props => (
							<Input
								className='materialUIInput'
								// defaultValue={title}
								onChange={props.onChange}
								value={props.value}
							/>
						)}
					/>
				)}
			</div>

			<div className='todoItem--right'>
				<div className='timeDuration'>
					{!editing && covertMsToTime(time)[0] > 0 ? (
						<p>{covertMsToTime(time)[0]} Days</p>
					) : (
						editing && (
							<>
								<span>Days</span>
								<input
									type='number'
									name='days'
									ref={register}
									defaultValue={covertMsToTime(time)[0]}
								/>
							</>
						)
					)}
					{!editing && covertMsToTime(time)[1] > 0 ? (
						<p>{covertMsToTime(time)[1]} Hours</p>
					) : (
						editing && (
							<>
								<span>Hours</span>
								<input
									type='number'
									name='hours'
									ref={register}
									defaultValue={covertMsToTime(time)[1]}
								/>
							</>
						)
					)}
					{!editing ? (
						<p>{covertMsToTime(time)[2]} Minutes</p>
					) : (
						<>
							<span>Minutes</span>
							<input
								type='number'
								name='minutes'
								ref={register}
								defaultValue={covertMsToTime(time)[2]}
							/>
						</>
					)}
					{!editing ? (
						<p>{covertMsToTime(time)[3]} Seconds</p>
					) : (
						<>
							<span>Seconds</span>
							<input
								type='number'
								name='seconds'
								ref={register}
								defaultValue={covertMsToTime(time)[3]}
							/>
						</>
					)}
				</div>
				{!editing ? (
					<>
						{isDoing ? (
							<IconButton onClick={pauseDoing}>
								<Pause />
							</IconButton>
						) : (
							<IconButton onClick={startDoing}>
								<PlayArrow />
							</IconButton>
						)}
						<IconButton onClick={() => setEditing(true)}>
							<Edit />
						</IconButton>
						<IconButton onClick={() => onDeleteTodo(dId)}>
							<Delete />
						</IconButton>
					</>
				) : (
					<Save onClick={handleSubmit(saveSubmit)} />
				)}
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	todo: state.todo,
	auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
	onEditTodo: fields => dispatch(editTodo(fields)),
	onDeleteTodo: dId => dispatch(deleteTodo(dId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
