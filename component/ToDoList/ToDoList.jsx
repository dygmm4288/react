import React, { useCallback, useState, useRef, memo, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTrash,
	faArrowUp,
	faCheckSquare,
	faCheckCircle,
	faEdit
} from "@fortawesome/free-solid-svg-icons";
import "./todolist.scss";

export default memo(function TodoList() {
	const [todoList, setTodoList] = useState([]);

	const inputValue = useRef(null);

	const onSubmitForm = useCallback(
		e => {
			e.preventDefault();
			const content = makeObj("content", inputValue.current.value);
			const priority = makeObj("priority", 0);
			const isDone = makeObj("isDone", false);
			if (
				content.content &&
				todoList.filter(item => item.content === content.content)
					.length === 0
			) {
				setTodoList([
					...todoList,
					{ ...content, ...priority, ...isDone }
				]);
			} else if (!content.content) {
				alert("내용을 입력해주세요");
			} else {
				alert("이미 등록된 체크 리스트");
			}
			inputValue.current.value = clearValue();
		},
		[todoList]
	);
	const onClickIcon = useCallback(
		e => {
			const content = e.currentTarget.dataset.content;
			const work = e.currentTarget.dataset.work;
			const isPriorityUp = e.currentTarget.dataset.up;
			switch (work) {
				case "priority": {
					isPriorityUp
						? setTodoList(
								todoList.map(item =>
									plusPriority(item)(content)
								)
						  )
						: setTodoList(
								todoList.map(item =>
									minusPriority(item)(content)
								)
						  );
					return;
				}
				case "delete": {
					setTodoList(
						todoList.filter(item => !compareContent(item, content))
					);
					return;
				}
				case "done": {
					setTodoList(todoList.map(item => checkDone(item)(content)));
					return;
				}
				default:
					return new Error("work is not valid");
			}
		},
		[todoList]
	);
	return (
		<>
			<header>
				<h1>ToDoList</h1>
			</header>
			<section id="container">
				<TodoForm onSubmitForm={onSubmitForm} inputRef={inputValue} />
				<section className="content">
					<h2>Your ToDo List is...</h2>
					{todoList &&
						todoList.map(item => {
							return (
								<TodoListItem
									key={item.content}
									item={item}
									onClickIcon={onClickIcon}
								/>
							);
						})}
				</section>
			</section>
		</>
	);
});
const TodoListItem = memo(({ item, onClickIcon }) => {
	const { content, isDone, priority } = item;
	const [prevPriority, setPrevPriority] = useState(0);
	const [classPriority, setClassPriority] = useState("");
	if (priority !== prevPriority) {
		setPrevPriority(priority);
		if (priority > 5) {
			setClassPriority("high");
		} else if (priority > 3) {
			setClassPriority("middle");
		}
	}

	return (
		<>
			<div className={`content_item ${classPriority}`}>
				<FontAwesomeBtn
					onClick={onClickIcon}
					work={"done"}
					icon={faCheckSquare}
					content={content}
					size={"lg"}
				/>
				<p className={`content_pargraph ${isDone ? "done" : null}`}>
					{content}
				</p>
				<FontAwesomeBtn
					onClick={onClickIcon}
					work={"priority"}
					icon={faArrowUp}
					content={content}
					isUp={false}
					rotation={180}
					size={"lg"}
				/>
				<FontAwesomeBtn
					onClick={onClickIcon}
					work={"priority"}
					icon={faArrowUp}
					content={content}
					isUp={true}
					size={"lg"}
				/>
				<FontAwesomeBtn
					onClick={onClickIcon}
					work={"delete"}
					icon={faTrash}
					content={content}
					size={"lg"}
				/>
			</div>
		</>
	);
});
const TodoForm = memo(({ onSubmitForm, inputRef }) => {
	return (
		<>
			<form action="#" onSubmit={onSubmitForm}>
				<label htmlFor="todo">
					<FontAwesomeIcon icon={faEdit} />
				</label>
				<input
					ref={inputRef}
					type="text"
					name="todo"
					id="todo"
					placeholder="Enter your what to do!"
					maxLength={20}
				/>
				<FontAwesomeBtn
					btnType={"submit"}
					size={"2x"}
					icon={faCheckCircle}
				/>
			</form>
		</>
	);
});
const FontAwesomeBtn = memo(({ onClick, ...props }) => {
	const { work, isUp, content, icon, rotation, btnType, size } = props;
	return (
		<>
			<button
				type={btnType || "text"}
				data-work={work}
				onClick={onClick}
				data-up={isUp}
				data-content={content}>
				<FontAwesomeIcon
					size={size || "lg"}
					icon={icon}
					rotation={rotation || null}
				/>
			</button>
		</>
	);
});

const makeObj = (key, value) => {
	return { [key]: value };
};
const clearValue = () => "";
const compareContent = (item, content) =>
	item.content === (content.content || content);
const checkDone = item => {
	return content => {
		if (compareContent(item, content)) item.isDone = !item.isDone;
		return item;
	};
};
const plusPriority = item => {
	return content => {
		if (compareContent(item, content)) {
			item.priority += 1;
		}
		return item;
	};
};
const minusPriority = item => {
	return content => {
		if (compareContent(item, content)) item.priority -= 1;
		return item;
	};
};
