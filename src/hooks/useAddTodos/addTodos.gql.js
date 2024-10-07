const addTodoMutation = () => {
    return `
    mutation createTask($input: TaskInput!) {
      createTask(input: $input) {
        id
        title
        text
        date
        status
      }
    }
  `;
};

export default addTodoMutation;
