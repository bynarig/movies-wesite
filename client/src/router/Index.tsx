import {Route, Routes} from "react-router";
import Main from "@/pages/Main.tsx";
import SignUpPage from "@/pages/SignUp.tsx";
import SignInPage from "@/pages/SignIn.tsx";
import ForgotPasswordPage from "@/pages/ForgotPassword.tsx";
import ProfilePage from "@/pages/user/Profile.tsx";
import NotFoundPage from "@/pages/404.tsx";
import MoviePage from "@/pages/movie/Movie.tsx";

export default function RouterIndex() {
    return (
        <Routes>
            <Route index element={<Main/>}/>
            <Route path="signup" element={<SignUpPage/>}/>
            <Route path="signin" element={<SignInPage/>}/>
            <Route path="forgotpassword" element={<ForgotPasswordPage/>}/>
            <Route path="user">
                <Route path="profile" element={<ProfilePage/>}/>
            </Route>
            <Route path="movie/:movieId" element={<MoviePage/>}></Route>
            <Route path=":other" element={<NotFoundPage/>}/>
        </Routes>
    )
}