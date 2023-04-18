import { User} from "../model/User.js";


export const login = async (req, res) => {
  try {
    const { id } = req.body;

    user = await User.create({
             id
    });

    console.log(user);


    res.status(200).json({ success: true, message: "User created", user });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/*

export const register = async (req, res) => { 

  try {
    console.log("register");
    //const {  name, surname } = req.body;

    //console.log(name);
   // console.log(surname);

    const newUser = new User({
      name: req.body.name,
      surname: req.body.email,
   });

   newUser.save();

    res.status(200).json({ success: true, message: "User created", newUser });
    

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

*/