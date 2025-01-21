const changeTodoStatusMutation = () => {
    return `
        mutation changeStatusTask($taskId: String!, $status: String!) {
        changeStatusTask(taskId: $taskId, status: $status) {
            success
            message
        }
    }
        `
}
export default changeTodoStatusMutation;
