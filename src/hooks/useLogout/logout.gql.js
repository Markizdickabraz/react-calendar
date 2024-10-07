const logoutMutation = () => {
    return {
        query: `
            mutation {
              revokeCustomerToken {
                result
              }
            }`,
    }
}

export default logoutMutation;