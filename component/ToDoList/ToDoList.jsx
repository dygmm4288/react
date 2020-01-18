import React, { useCallback, useState, useRef, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTrash,
	faArrowUp,
	faCheckSquare,
	faCheckCircle,
	faEdit
} from "@fortawesome/free-solid-svg-icons";
import { createNoSubstitutionTemplateLiteral } from "typescript";

export default memo(function TodoList() {
	const [todoList, setTodoList] = useState([]);

	const inputValue = useRef(null);

	const onSubmitForm = useCallback(
		e => {
			e.preventDefault();
			const content = makeObj("content", inputValue.current.value);
			const priority = makeObj("priority", 0);
			const isFinish = makeObj("isFinish", false);
			if (
				todoList.filter(item => item.content === content.content)
					.length === 0
			) {
				setTodoList([
					...todoList,
					{ ...content, ...priority, ...isFinish }
				]);
			} else {
				alert("이미 등록된 체크 리스트");
			}
			inputValue.current.value = clearValue();
		},
		[todoList]
	);
	const onClickPriority = useCallback(
		e => {
			const content = e.currentTarget.getAttribute("data-content");
			setTodoList(
				todoList.map(item => {
					if (item.content === content) item.priority += 1;
					return item;
				})
			);
		},
		[todoList]
	);
	const onClickDelete = useCallback(
		e => {
			const content = e.currentTarget.getAttribute("data-content");
			setTodoList(todoList.filter(item => item.content !== content));
		},
		[todoList]
	);
	const onClickFinish = useCallback(
		e => {
			const content = e.currentTarget.getAttribute("data-content");
			setTodoList(
				todoList.map(item => {
					if (item.content === content) item.isFinish = true;
					return item;
				})
			);
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
									item={item}
									onClickPriority={onClickPriority}
									onClickDelete={onClickDelete}
									onClickFinish={onClickFinish}
								/>
							);
						})}
				</section>
			</section>
		</>
	);
});
function TodoListItem({ item, onClickPriority, onClickDelete, onClickFinish }) {
	const { content, isFinish } = item;

	return (
		<>
			<div className="content_item">
				{isFinish ? (
					<p className="content_pargraph finish">{content}</p>
				) : (
					<p className="content_pargraph">{content}</p>
				)}
				<nav>
					<button onClick={onClickFinish} data-content={content}>
						<FontAwesomeIcon icon={faCheckSquare} />
					</button>
					<button
						onClick={onClickPriority}
						data-content={content}
						data-up={true}>
						<FontAwesomeIcon icon={faArrowUp} rotation={180} />
					</button>
					<button
						onClick={onClickPriority}
						data-content={content}
						data-up={false}>
						<FontAwesomeIcon icon={faArrowUp} />
					</button>
					<button onClick={onClickDelete} data-content={content}>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</nav>
			</div>
		</>
	);
}
function TodoForm({ onSubmitForm, inputRef }) {
	return (
		<>
			<form action="#" onSubmit={onSubmitForm}>
				<label htmlFor="todo">
					<FontAwesomeIcon icon={faEdit} />
				</label>
				<input ref={inputRef} type="text" name="todo" id="todo" />
				<button type="submit">
					<FontAwesomeIcon icon={faCheckCircle} />
				</button>
			</form>
		</>
	);
}

const makeObj = (key, value) => {
	return { [key]: value };
};
const clearValue = () => "";
