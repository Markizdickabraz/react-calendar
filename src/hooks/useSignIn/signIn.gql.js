const signInMutation = (formData) => {
    return {
        query: `
            mutation GenerateCustomerToken($email: String!, $password: String!) {
                generateCustomerToken(email: $email, password: $password) {
                    token
                }
            }
        `,
        variables: {
            email: formData.email,
            password: formData.password,
        },
    };
};

export default signInMutation;
