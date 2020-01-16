import React, { useCallback, useState, useRef } from "react";
const makeObj = (key, value) => {
	return { [key]: value };
};
const clearValue = () => "";
export default function ToDoList() {
	const [todoLists, setTodoLists] = useState([]);

	const inputValue = useRef(null);
	const onSubmitForm = useCallback(
		e => {
			e.preventDefault();
			const content = makeObj("content", inputValue.current.value);
			const priority = makeObj("priority", 0);

			if (!todoLists.includes({ content: content })) {
				setTodoLists([...todoLists, { ...content, ...priority }]);
			} else {
				alert("이미 등록된 체크 리스트");
			}
			inputValue.current.value = clearValue();
		},
		[todoLists]
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
					{todoLists &&
						todoLists.map(({ content, priority }) => (
							<ToDoListItem
								content={content}
								priority={priority}
								key={content}
							/>
						))}
				</section>
			</section>
		</>
	);
}
function ToDoListItem({ content, priority }) {
	const onClickPriority = useCallback(() => {
		console.log("onclick priority");
	});
	const onClickTrash = useCallback(() => {
		console.log("onclicktrash");
	});
	return (
		<>
			<div className="content_item">
				<p>{content}</p>
				<nav>
					<a href="#" onClick={onClickPriority}>
						up priority
					</a>
					<a href="#" onClick={onClickTrash}>
						trash
					</a>
				</nav>
			</div>
		</>
	);
}
