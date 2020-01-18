import React, { useCallback, useState, useRef } from "react";

export default function ToDoList() {
	const [todoList, setTodoList] = useState([]);

	const inputValue = useRef(null);

	const onSubmitForm = useCallback(
		e => {
			e.preventDefault();
			const content = makeObj("content", inputValue.current.value);
			const priority = makeObj("priority", 0);
			const isFinish = makeObj("isFinish", false);

			if (!todoList.includes({ content: content })) {
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
	return (
		<>
			<header>
				<h1>ToDoList</h1>
			</header>
			<section id="container">
				<form action="#" onSubmit={onSubmitForm}>
					<input ref={inputValue} type="text" name="todo" id="todo" />
					<button type="submit">
						<i>submit</i>
					</button>
				</form>
				<section className="content">
					<h2>Your ToDo List is...</h2>
					{todoList &&
						todoList.map(item => {
							return (
								<ToDoListItem
									content={item.content}
									onClickPriority={onClickPriority}
									onClickDelete={onClickDelete}
								/>
							);
						})}
				</section>
			</section>
		</>
	);
}
function ToDoListItem({ content, onClickPriority, onClickDelete }) {
	return (
		<>
			<div className="content_item">
				<p>{content}</p>
				<nav>
					<button onClick={onClickPriority} data-content={content}>
						up priority
					</button>
					<button onClick={onClickDelete} data-content={content}>
						trash
					</button>
				</nav>
			</div>
		</>
	);
}

const makeObj = (key, value) => {
	return { [key]: value };
};
const clearValue = () => "";
