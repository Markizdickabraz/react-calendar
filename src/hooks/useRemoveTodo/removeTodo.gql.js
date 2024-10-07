const deleteTodoMutation = () => {
    return `
        mutation deleteTask($taskId: Int!) {
        deleteTask(taskId: $taskId) {
            success
            message
        }
    }
        `
}
export default deleteTodoMutation;