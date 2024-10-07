const signUpMutation = (formData) => {
    return `
        mutation {
            createCustomer(
                input: {
                    firstname: "${formData.firstName}"
                    lastname: "${formData.lastName}"
                    email: "${formData.email}"
                    password: "${formData.password}"
                }
            ) {
                customer {
                    id
                    firstname
                    lastname
                    email
                }
            }
        }
    `;
};

export default signUpMutation;
