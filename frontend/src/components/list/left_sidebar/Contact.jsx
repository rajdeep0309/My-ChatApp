import React from 'react'

function Contact() {
    const contactInfo = [
        {
        name: "Souradip Datta",
        active: false,
        socket_id: 1,
        },
        {
            name: "Rajdeep Ghosh",
            active: false,
            socket_id: 2,
        },
    ];
    const jsonContactInfo = JSON.stringify(contactInfo);

    return jsonContactInfo;
}

export default Contact
