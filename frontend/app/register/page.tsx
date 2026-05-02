"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
signInWithPopup
} from "firebase/auth";

import {
auth,
provider
} from "@/app/lib/firebase";

export default function RegisterPage(){

const router = useRouter();

const [formData,setFormData]=useState({
name:"",
email:"",
phone:"",
password:""
});

const [loading,setLoading]=useState(false);


const handleChange=(
e:ChangeEvent<HTMLInputElement>
)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};



const handleSubmit=async(
e:FormEvent<HTMLFormElement>
)=>{
e.preventDefault();

setLoading(true);

try{

const res=await fetch(
"http://localhost:5000/api/auth/register",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(formData)
}
);

const data=await res.json();

if(res.ok){

alert("Account created successfully ✅");

/* save login immediately after signup */
localStorage.setItem(
"user",
JSON.stringify(data.user)
);

if(data.token){
localStorage.setItem(
"token",
data.token
);
}

router.push("/profile");

}else{
alert(data.message);
}

}catch(error){
console.log(error);
alert("Server error");
}

setLoading(false);

};

const handleGoogleSignup = async () => {

try{

const result = await signInWithPopup(
auth,
provider
);

const user = result.user;

const googleUser = {
name:user.displayName,
email:user.email
};

localStorage.setItem(
"user",
JSON.stringify(googleUser)
);

/*
Optional:
send to backend too
*/

router.push("/profile");

}catch(error){
console.log(error);
alert("Google sign in failed");
}

};

return(

<div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center px-6 py-20">

<div className="grid lg:grid-cols-2 max-w-6xl w-full rounded-[40px] overflow-hidden shadow-2xl bg-white">


{/* LEFT */}
<div className="bg-black text-white p-16 flex flex-col justify-center">

<p className="uppercase tracking-[4px] text-sm mb-6">
Create Account
</p>

<h1 className="text-6xl font-bold leading-tight mb-8">
Start Your
Skin Journey
</h1>

<p className="text-gray-300 leading-8 mb-10">
Book appointments, track treatments
and manage consultations in one place.
</p>


<div className="space-y-6">

<div className="border border-white/20 rounded-3xl p-6">
Personalized Care Plans
</div>

<div className="border border-white/20 rounded-3xl p-6">
Online Appointments
</div>

<div className="border border-white/20 rounded-3xl p-6">
Progress Tracking
</div>

</div>

</div>




{/* RIGHT */}
<div className="p-16">

<div className="mb-12">
<h2 className="text-5xl font-bold mb-4">
Sign Up
</h2>

<p className="text-gray-500">
Create your patient account
</p>
</div>



<form
className="space-y-6"
onSubmit={handleSubmit}
>

<input
type="text"
name="name"
placeholder="Full Name"
className="w-full p-5 border rounded-2xl"
onChange={handleChange}
required
/>

<input
type="email"
name="email"
placeholder="Email"
className="w-full p-5 border rounded-2xl"
onChange={handleChange}
required
/>

<input
type="tel"
name="phone"
placeholder="Phone"
className="w-full p-5 border rounded-2xl"
onChange={handleChange}
/>

<input
type="password"
name="password"
placeholder="Password"
className="w-full p-5 border rounded-2xl"
onChange={handleChange}
required
/>


<label className="flex gap-3 text-sm">
<input type="checkbox" required />
I agree to Terms & Privacy Policy
</label>



<button
type="submit"
disabled={loading}
className="w-full bg-black text-white py-5 rounded-full text-lg"
>
{loading ? "Creating..." : "Create Account"}
</button>


<button
type="button"
onClick={handleGoogleSignup}
className="w-full border py-5 rounded-full"
>
Sign up with Google
</button>

</form>



<p className="text-center mt-10 text-gray-500">
Already have an account?{" "}
<Link
href="/login"
className="font-semibold text-black"
>
Login
</Link>
</p>

</div>


</div>

</div>

)

}