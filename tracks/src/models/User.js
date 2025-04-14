const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

// userSchema.methods.comparePassword = function(candidatePassword) {
//     const user = this;

//     return new Promise((resolve, reject) => {
//         bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
//             if (err) {
//                 return reject(err);
//             }

//             if (!isMatch) {
//                 return reject(false);
//             }
//             const role = user.role;
//             resolve(true);
//             console.log(role);
//         });
//     });
// };
userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;

    return new Promise((resolve, reject) => {
        console.log("Entered password:", candidatePassword); // Log entered password
        console.log("Stored password hash:", user.password); // Log stored password hash

        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return reject(err);
            }

            console.log("Password match result:", isMatch); // Log the result of comparison

            if (!isMatch) {
                return reject("Password mismatch");
            }

            resolve(true); // If passwords match, resolve as true
        });
    });
};




mongoose.model('User', userSchema);