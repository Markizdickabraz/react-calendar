const deleteTodoMutation = () => {
    return `
        mutation deleteTask($taskId: String!) {
        deleteTask(taskId: $taskId) {
            success
            message
        }
    }
        `
}
export default deleteTodoMutation;