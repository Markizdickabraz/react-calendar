const getTodosQuery = `
    query {
        getCustomerTodos {
            id
            title
            text
            date
            status
        }
    }
`;

export default getTodosQuery;
