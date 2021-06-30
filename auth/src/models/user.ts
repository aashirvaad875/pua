import mongoose from 'mongoose';
import { Password } from '../services/password';

//and interface that describe the properties 
//that are required to create a new User
interface UserAttrs{
    email: string,
    password: string
    is_deleted: boolean,
    is_profile_completed: boolean,
    type: string
}

//that a User Model has
interface UserModel extends mongoose.Model<UserDoc>{
    [x: string]: any;
    build(attrs: UserAttrs): UserDoc;
}

//that a User Document has
interface UserDoc extends mongoose.Document{
    first_name: string;
    last_name: string;
    username: string;
    gender: string;
    email: string;
    password: string;
    language: string;
    image: string;
    is_profile_completed: boolean;
    is_deleted: boolean;
    type: string;
    created_at:string;
    updated_at:string;
}

const userSchema = new mongoose.Schema({
    
    first_name:{
        type: String,
    },
    last_name:{
        type: String,     
    },

    username:{
        type: String,
    },
    gender:{
        type: String,
    },
    email: {
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    language:{
        type: String,
    },

    image:{
        type: String,
    },

    is_profile_completed:{
        type: Boolean,
        required: true
    },
    is_deleted:{
        type: Boolean,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    created_at    : { type: Date }, 
    updated_at    : { type: Date }
},{
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id
            // ret.user_type = ret.type === "USER" ? "4" : ret.type === "INSTRUCTOR" ? "3" : ret.type === "BOTH" ? "2" : "1" ;
            delete ret.password;
            delete ret.type;
            delete ret.__v
            delete ret._id
        }
       
    }
}

);

userSchema.pre('save',async function(done){
   if(this.isModified('password')){
       const hashed = await Password.toHash(this.get('password'));
       this.set('password',hashed);
   }

   const now = new Date();
   this.set('updated_at',now);
   if ( !this.get('created_at')) {
      this.set('created_at',now);
   }

   done();
})

userSchema.statics.build = (attrs: UserAttrs)=>{
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export {User};
