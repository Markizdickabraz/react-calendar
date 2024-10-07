import React from "react";
import useLogout from "../../hooks/useLogout/useLogout";

const Logout = () => {
    const { fetchLogout } = useLogout();

    const handleLogout = () => {
        fetchLogout();
    };

    return (
        <div>
            <button className='absolute top-20 left-6' type="button" onClick={handleLogout}>
                X
            </button>
        </div>
    );
};

export default Logout;
