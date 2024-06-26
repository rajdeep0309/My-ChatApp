function Contact() {
    const contactInfo = [
        {
            name: "Sohal Koley",
            active: true,
            socket_id: 1,
            profile_picture: "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=600",
            location:"Kolkata, India",
            contact_no: "123456789",
        },
        {
            name: "Souradip Datta",
            active: true,
            socket_id: 2,
            profile_picture: "https://images.pexels.com/photos/20155725/pexels-photo-20155725/free-photo-of-young-woman-in-a-cosplay-of-an-anime-character.png?auto=compress&cs=tinysrgb&w=600",
            location:"Kolkata, India",
            contact_no: "7980004130",
            email:"souradipdatta2002@gmail.com"
        },
        {
            name: "Rajdeep Ghosh",
            active: false,
            socket_id: 3,
            profile_picture: "https://dragonball.guru/wp-content/uploads/2021/03/goku-profile-e1616173641804-400x400.png",
            contact_no:"9330806599",
            email:"rajdeep3.9ghosh@gmail.com"
        }
    ];
    return  { contactInfo } ;
}

export default Contact;
