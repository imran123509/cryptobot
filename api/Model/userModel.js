const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
      name: {
         type: String,
         required: [true, "please tell us your name"]
      },

      email: {
        type: String,
        required: [true, "please provide your email"],
        unique: true,
        lowercase: true
      },
      membershipType: {
         type : String,
         lowercase: true,
         default: "notMember"
      },
      role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
      },
      password: {
        type: String,
        required: [true, "please provide your password"],
      },
      passwordConfirm: {
        type: String,
        required: [true, "please provide your password"],
        validate:{
             validator: function(e){
                 return e===this.password
             },
             message: "passwords are not the same"
        }
      }
});



userSchema.pre("save",  async function (next){
        if(!this.isModified("password")){
             return next()
        }

        this.password=await bcrypt.hash(this.password, 12)

        this.passwordConfirm=undefined
        next();
})

userSchema.pre("save", function(next){
      if(!this.isModified("password") || this.isNew) return next()

        this.passwordChangeAt= Date.now()-1000;
        next()
});

userSchema.pre(/^find/, function(next){
      this.find({active: {$ne: false}});
      next();
})

userSchema.methods.correctPassword= async function(candidatePassword, userPassword) {
        return bcrypt.compare(candidatePassword, userPassword)
}


userSchema.methods.passwordChangeAfter=function(JWTTimestamp){
      if(this.passwordChangeAt){
          const changeTimestamp=parseInt(
            this.passwordChangeAt.getTime()/1000,
            10
          );


          return JWTTimestamp< changeTimestamp;
      }

      return false;

}

const User=mongoose.model("User", userSchema);

module.exports=User
